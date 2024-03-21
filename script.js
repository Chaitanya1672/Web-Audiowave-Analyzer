const input  = document.querySelector('input')
const audioElem = document.querySelector('audio')


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
})