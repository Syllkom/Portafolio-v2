document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.getElementById('preloader')
  const progressFill = document.querySelector('.progress-fill')
  const progressText = document.querySelector('.progress-text')
  const brandLetters = document.querySelectorAll('.letter')
  
  let progress = 0
  const duration = 5000
  const interval = 30
  const increment = (interval / duration) * 100
  
  function updateProgress() {
    if (progress >= 100) {
      progressText.textContent = '100%'
      progressText.classList.add('completed')
      
      setTimeout(() => {
        preloader.classList.add('hide')
        
        document.body.classList.add('loaded')
        
        setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader)
          }
        }, 500)
      }, 400)
      
      return
    }
    
    progress += increment
    if (progress > 100) progress = 100
    
    progressFill.style.width = `${progress}%`
    progressText.textContent = `${Math.round(progress)}%`
    
    let nextInterval = interval
    if (progress < 30) {
      nextInterval = interval * 0.8
    } else if (progress > 80) {
      nextInterval = interval * 1.5
    }
    
    setTimeout(updateProgress, nextInterval)
  }
  
  setTimeout(() => {
    updateProgress()
    
    brandLetters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add('glow')
      }, 1000 + (index * 100))
    })
  }, 800)
})