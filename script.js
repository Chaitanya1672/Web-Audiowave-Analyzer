const input  = document.querySelector('input')
const audioElem = document.querySelector('audio')
const canvas = document.querySelector('canvas')

const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight - 120

input.addEventListener('change', (e)=>{
  const file = input.files[0]
  console.log(file)
  if (!file) return;
  audioElem.src = URL.createObjectURL(file)
  audioElem.play()
  
  //audio processing
  // 1. create audio context
  // 2. create audio source
  // 3. create audio effects (in our case, we'll analyse)
  // 4. create audio destination
  
  // Audio context processing graph or simple modular route 
  const audioContext = new AudioContext()
  
  const audioSource = audioContext.createMediaElementSource(audioElem)
  const analyser = audioContext.createAnalyser()
  
  //destination mode
  audioSource.connect(analyser) // Hardware speaker
  
  analyser.connect(audioContext.destination)
  
  analyser.fftSize = 512; //determinse count of soundbar
  const bufferDataLength = analyser.frequencyBinCount
  const bufferDataArray =  new Uint8Array(bufferDataLength)
  const soundBarWidth = canvas.width / bufferDataLength
  let x = 0
  
  function drawAndAnimateSoundBar () {
    x = 0
    context.clearRect(0, 0, canvas.width, canvas.height)
    
    analyser.getByteFrequencyData(bufferDataArray)
    bufferDataArray.forEach((dataValue)=>{
      const soundBarHeight = dataValue;
      
      const red = (soundBarHeight * 2) % 150;
      const green = (soundBarHeight * 5) % 200;
      const blue = (soundBarHeight * 7) % 120;

      context.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      context.fillRect(x, canvas.height - soundBarHeight, soundBarWidth, soundBarHeight)
      x += soundBarWidth
    })
    if( !audioElem.ended ) requestAnimationFrame(drawAndAnimateSoundBar)
  }
  
  drawAndAnimateSoundBar()
})