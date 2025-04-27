/**
 * © 2025 Syllkom. All rights reserved.
 */

function initThemeToggle() {
  if (!document.querySelector('.theme-toggle')) {
    const themeToggle = document.createElement('button')
    themeToggle.className = 'theme-toggle'
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    document.body.appendChild(themeToggle)
  }
  
  const themeToggle = document.querySelector('.theme-toggle')
  

  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode')
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else if (savedTheme === null && !prefersDark) {
    document.body.classList.add('light-mode')
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  }
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode')
    
    if (document.body.classList.contains('light-mode')) {
      localStorage.setItem('theme', 'light')
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    } else {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    }
    
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease'
    setTimeout(() => {
      document.documentElement.style.transition = ''
    }, 500)
  })
}

function enhanceAnimations() {
  const projectCards = document.querySelectorAll('.project-card')
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`
  })
  
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach((tag, index) => {
    tag.style.transitionDelay = `${index * 0.05}s`
    tag.classList.add('fade-in')
  })
  
  const buttons = document.querySelectorAll('.btn')
  buttons.forEach(button => {
    button.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-3px)'
    })
    
    button.addEventListener('mouseout', function() {
      this.style.transform = ''
    })
  })
  
  const sectionTitles = document.querySelectorAll('.section-title')
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideInLeft 0.8s ease forwards'
      }
    })
  }, { threshold: 0.1 })
  
  sectionTitles.forEach(title => {
    observer.observe(title)
  })
}

document.addEventListener('DOMContentLoaded', function() {
  
  initThemeToggle()
  enhanceAnimations()
})
