/**
 * © 2025 Syllkom. All rights reserved.
 */

document.addEventListener('DOMContentLoaded', function() {
  initNavigation()
  initScrollAnimations()
  initCodeViewer()
  initContactForm()
  initTypeEffect()
})

function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle')
  const navLinks = document.querySelector('.nav-links')
  const navItems = document.querySelectorAll('.nav-links a')
  const header = document.querySelector('header')

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active')
      menuToggle.querySelector('i').classList.toggle('fa-bars')
      menuToggle.querySelector('i').classList.toggle('fa-times')
    })
  }

  navItems.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active')
        menuToggle.querySelector('i').classList.add('fa-bars')
        menuToggle.querySelector('i').classList.remove('fa-times')
      }
      
      const targetId = link.getAttribute('href')
      const targetSection = document.querySelector(targetId)
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - header.offsetHeight
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    })
  })

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)'
      header.style.height = '70px'
    } else {
      header.style.boxShadow = 'none'
      header.style.height = '80px'
    }
    
    updateActiveNavLink()
  })
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section')
  const navLinks = document.querySelectorAll('.nav-links a')
  const scrollPosition = window.scrollY + 100
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100
    const sectionBottom = sectionTop + section.offsetHeight
    const sectionId = section.getAttribute('id')
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active')
        }
      })
    }
  })
}

function initScrollAnimations() {
  const fadeElements = document.querySelectorAll('.fade-in')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, {
    threshold: 0.1
  })
  
  fadeElements.forEach(element => {
    observer.observe(element)
  })
}

function initCodeViewer() {
  const codeViewButtons = document.querySelectorAll('.view-code-btn')
  const codeViewer = document.querySelector('.code-viewer')
  const closeViewer = document.querySelector('.close-viewer')
  const codeTitle = document.querySelector('.code-title span')
  const codeBlock = document.querySelector('.code-block')
  const downloadBtn = document.querySelector('.download-code')
  
  if (!codeViewer) return
  
  codeViewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.dataset.project
      const projectTitle = button.dataset.title
      const codeType = button.dataset.codetype
      
      fetchProjectCode(projectId, codeType)
        .then(code => {
          codeTitle.textContent = projectTitle
          
          codeBlock.innerHTML = ''
          codeBlock.textContent = code
          highlightCode(codeBlock, codeType)
          
          downloadBtn.setAttribute('data-filename', `${projectId}.${getFileExtension(codeType)}`)
          downloadBtn.setAttribute('data-content', code)
          
          codeViewer.classList.add('active')
          document.body.style.overflow = 'hidden'
        })
        .catch(error => {
          console.error('Error loading code:', error)
        })
    })
  })
  
  if (closeViewer) {
    closeViewer.addEventListener('click', () => {
      codeViewer.classList.remove('active')
      document.body.style.overflow = ''
    })
  }
  
  codeViewer.addEventListener('click', (e) => {
    if (e.target === codeViewer) {
      codeViewer.classList.remove('active')
      document.body.style.overflow = ''
    }
  })
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const filename = downloadBtn.dataset.filename
      const content = downloadBtn.dataset.content
      
      downloadFile(filename, content)
    })
  }
}

function fetchProjectCode(projectId, codeType) {
  // This would normally be an AJAX request to get the code
  // For demo purposes, we'll return sample code based on the type
  
  return new Promise((resolve) => {
    setTimeout(() => {
      let sampleCode = ''
      
      switch (codeType) {
        case 'html':
          sampleCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Syllkom - ${projectId}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <div class="container">
      <h1>Project: ${projectId}</h1>
      <p>This is a sample HTML file for ${projectId}</p>
    </div>
  </header>
  
  <main>
    <section class="hero">
      <div class="container">
        <h2>Welcome to ${projectId}</h2>
        <p>This is a demonstration of the project.</p>
      </div>
    </section>
  </main>
  
  <script src="script.js"></script>
</body>
</html>`
          break
          
        case 'css':
          sampleCode = `/* Styles for ${projectId} */
:root {
  --primary-color: #6366f1;
  --dark-bg: #0a0e1a;
  --text-color: #f3f4f6;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--dark-bg);
  color: var(--text-color);
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

header {
  padding: 2rem 0;
  text-align: center;
}

.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(rgba(10, 14, 26, 0.8), rgba(10, 14, 26, 0.9)), url('bg.jpg');
  background-size: cover;
  background-position: center;
}`
          break
          
        case 'js':
          sampleCode = `import path from "path";

// libreria
import { connection } from './libreria/index/conn.main.js';
import { ForkManager } from './libreria/fun.p.makeFork.js';
import { formatLog } from './libreria/index/logger.main.js';

let _connection = await connection();
const modulePath = path.resolve('./scripts/index.js')

async function startMain() {
    const mainBot = new ForkManager(modulePath, {
        execArgv: ['--max-old-space-size=512'],
        cwd: path.dirname('./'),
        //silent: true,
        env: {
            dataConfig: { subBot: false, },
            connOptions: { ..._connection }
        }
    })

    mainBot.event.set('message', async (m) => {
        let message = m.content || {}
        let data = message.data || {}
        let sender = m.sender || {}

        // event
        switch (message.event) {
            case 'pairing:qr-code': {
                console.log('qr code:');
                console.log(data.qrCodeText);
            } break;

            case 'pairing:pin-code': {
                console.log('pin code:');
                console.log(data.formattedCode);
            } break;
        }

        // type
        switch (message.type) {
            case 'connection:open': {
                console.log('Connection open:', { sender, data: message.data });
            } break;

            case 'connection:close': {
                console.log('Connection close:', { sender, data: message.data });
            } break;

            case 'console:log': {
                console.log(formatLog(message.data))
            } break;
        }
    });

    mainBot.event.set('exit', async ({ code, signal }) => {
        console.log({ code, signal });
        await new Promise(resolve =>
            setTimeout(resolve, 2000));
        await mainBot.start();
    });

    mainBot.event.set('error', (e) => {
        console.error('Error:', e)
    });

    await mainBot.start()
}

startMain()
`
          break
          
        case 'json':
          sampleCode = `{
  "name": "HorekuOs",
  "version": "1.2.3",
  "description": "Simple bot",
  "type": "module",
  "main": "Syll's.js",
  "scripts": {
    "start": "node index.js",
    "build": "npm install && node index.js"
  },
  "author": "Syllkom",
  "dependencies": {
    "@adiwajshing/keyed-db": "^0.2.4",
    "@bochilteam/scraper-sosmed": "^1.0.5",
    "@google/generative-ai": "^0.21.0",
    "@bochilteam/scraper": "^4.2.4",
    "@hapi/boom": "^10.0.1",
    "@whiskeysockets/baileys": "npm:baileys@6.7.7",
    "aptoide-scraper": "github:DIEGO-OFC/dv-aptoide-scraper",
    "acorn": "^8.14.0",
    "axios": "^1.6.2",
    "chalk": "^5.3.0",
    "cheerio": "1.0.0-rc.12",
    "chokidar": "^4.0.1",
    "express": "^4.19.2",
    "ffmpeg-static": "^5.2.0",
    "file-type": "^18.7.0",
    "fluent-ffmpeg": "^2.1.3",
    "form-data": "4.0.0",
    "g-i-s": "^2.1.6",
    "google-it": "^1.6.4",
    "got": "^14.4.3",
    "human-readable": "^0.2.1",
    "jimp": "^0.16.1",
    "joi": "^17.13.3",
    "lodash": "^4.17.21",
    "lowdb": "^7.0.1",
    "moment-timezone": "^0.5.43",
    "natural": "^6.12.0",
    "node-cache": "5.1.2",
    "node-fetch": "^3.3.2",
    "node-gtts": "^2.0.2",
    "node-webpmux": "^3.1.9",
    "pino": "9.1.0",
    "qrcode": "^1.5.3",
    "qrcode-terminal": "^0.12.0",
    "readline": "^1.3.0",
    "sharp": "^0.32.5",
    "puppeteer": "^24.4.0",
    "tar": "^7.4.3",
    "ws": "^8.18.0",
    "yargs": "^17.7.2",
    "btch-downloader": "^2.8.4",
    "megajs": "^1.1.3",
    "acrcloud": "^1.4.0",
    "youtube-sr": "^4.3.11",
    "yt-search": "^2.10.4",
    "zod": "^3.24.2"
  }
}
`
          break
          
          
        default:
          sampleCode = `// Sample code for ${projectId}
// This is a placeholder for the ${codeType} code.`
      }
      
      resolve(sampleCode)
    }, 500)
  })
}

function getFileExtension(codeType) {
  const extensions = {
    'html': 'html',
    'css': 'css',
    'js': 'js',
    'json': 'json',
    'py': 'py'
  };
  
  return extensions[codeType] || 'txt'
}

function highlightCode(element, codeType) {
  
  const code = element.textContent
  let highlighted = code
  
  switch (codeType) {
    case 'html':
      highlighted = code
        .replace(/(&lt;[\/]?[a-z][a-z0-9]*(?:\s+[a-z0-9\-_]+(?:=(?:".*?"|'.*?'))?)*\s*[\/]?&gt;)/g, '<span class="hljs-tag">$1</span>')
        .replace(/("[^"]*")/g, '<span class="hljs-string">$1</span>');
      break
    
    case 'css':
      highlighted = code
        .replace(/([a-z\-]+)(\s*:)/g, '<span class="hljs-property">$1</span>$2')
        .replace(/(#[a-fA-F0-9]{3,6})/g, '<span class="hljs-number">$1</span>')
        .replace(/(@[a-z\-]+)/g, '<span class="hljs-keyword">$1</span>');
      break
      
    case 'js':
    case 'json':
      highlighted = code
        .replace(/\b(function|const|let|var|if|else|return|for|while|class|import|export|from|async|await)\b/g, '<span class="hljs-keyword">$1</span>')
        .replace(/("[^"]*")/g, '<span class="hljs-string">$1</span>')
        .replace(/(\d+)/g, '<span class="hljs-number">$1</span>')
        .replace(/(\/\/.*)/g, '<span class="hljs-comment">$1</span>');
      break;
      
    case 'py':
      highlighted = code
        .replace(/\b(def|class|import|from|if|else|return|for|while|try|except|with|as)\b/g, '<span class="hljs-keyword">$1</span>')
        .replace(/("[^"]*")/g, '<span class="hljs-string">$1</span>')
        .replace(/(\d+)/g, '<span class="hljs-number">$1</span>')
        .replace(/(#.*)/g, '<span class="hljs-comment">$1</span>');
      break
  }
  
  element.innerHTML = highlighted
}

function downloadFile(filename, content) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
  element.setAttribute('download', filename)
  
  element.style.display = 'none'
  document.body.appendChild(element)
  
  element.click()
  
  document.body.removeChild(element)
}

function initContactForm() {
  const contactForm = document.querySelector('.contact-form form')
    
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault()
        
        const name = document.getElementById('name').value.trim()
        const email = document.getElementById('email').value.trim()
        const subject = document.getElementById('subject').value.trim()
        const message = document.getElementById('message').value.trim()
        
        const whatsappMessage = `Hola, soy *${name}.*\n- Asunto: ${subject}\n- Email: ${email}\n*Mensaje:* ${message}`
        
        const encodedMessage = encodeURIComponent(whatsappMessage)
        
        const whatsappLink = `https://wa.me/573113825327?text=${encodedMessage}`
        window.open(whatsappLink, '_blank')
    })
  
  contactForm.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', () => {
      const errorMsg = input.parentElement.querySelector('.error-message')
      if (errorMsg) {
        errorMsg.remove()
      }
      input.classList.remove('invalid')
    })
  })
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

function markInvalid(input, message) {
  input.classList.add('invalid')
  
  const existingError = input.parentElement.querySelector('.error-message')
  if (existingError) {
    existingError.remove()
  }
  
  const errorMessage = document.createElement('div')
  errorMessage.className = 'error-message'
  errorMessage.textContent = message
  input.parentElement.appendChild(errorMessage)
}

function markValid(input) {
  input.classList.remove('invalid')
  
  const existingError = input.parentElement.querySelector('.error-message')
  if (existingError) {
    existingError.remove()
  }
}

function initTypeEffect() {
  const element = document.querySelector('.type-effect')
  if (!element) return
  
  const texts = JSON.parse(element.getAttribute('data-texts') || '["Developer", "Designer", "Creator"]')
  let textIndex = 0
  let charIndex = 0
  let isDeleting = false
  let typingSpeed = 150
  
  const type = () => {
    const currentText = texts[textIndex]
    
    if (isDeleting) {
      element.textContent = currentText.substring(0, charIndex - 1)
      charIndex--;
      typingSpeed = 80
    } else {
      element.textContent = currentText.substring(0, charIndex + 1)
      charIndex++;
      typingSpeed = 150
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 1500
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500
    }
    
    setTimeout(type, typingSpeed)
  }
  
  setTimeout(type, 1000)
}

function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn')
  const projectCards = document.querySelectorAll('.project-card')
  
  if (!filterButtons.length || !projectCards.length) return
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'))
      button.classList.add('active')
      
      const filter = button.dataset.filter
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = ''
          setTimeout(() => {
            card.style.opacity = '1'
            card.style.transform = 'translateY(0)'
          }, 100)
        } else {
          card.style.opacity = '0'
          card.style.transform = 'translateY(20px)'
          setTimeout(() => {
            card.style.display = 'none'
          }, 300)
        }
      })
    })
  })
}

document.addEventListener('DOMContentLoaded', initProjectFilters)
