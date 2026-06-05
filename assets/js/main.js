document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive Terminal Typing Simulation
  const terminalLines = [
    { type: 'cmd', text: 'sneha --profile' },
    { type: 'output', text: '{\n  "name": "Sneha Gupta",\n  "role": ["Full Stack Developer", "Graphic Designer"],\n  "skills": ["Laravel", "Flutter", "Firebase", "Java", "Python"],\n  "hobbies": ["debugging_logic", "compiling_books", "exploring_web"],\n  "status": "ready_to_build"\n}' },
    { type: 'cmd', text: 'sneha --skills --active' },
    { type: 'output', text: '🔥 PHP-Laravel (85%)\n📱 Flutter & Dart (80%)\n🐍 Python & ML (75%)\n☕ Java (70%)' },
    { type: 'cmd', text: 'clear' }
  ];

  const terminalBody = document.getElementById('terminal-body');
  
  if (terminalBody) {
    terminalBody.innerHTML = ''; // Clear fallback content
    runTerminalSimulation();
  }

  async function runTerminalSimulation() {
    let index = 0;
    while (index < terminalLines.length) {
      const line = terminalLines[index];
      
      if (line.text === 'clear') {
        await sleep(1500);
        terminalBody.innerHTML = '';
        index = 0; // Loop forever
        continue;
      }
      
      const lineEl = document.createElement('div');
      lineEl.className = 'terminal-line';
      
      if (line.type === 'cmd') {
        const promptEl = document.createElement('span');
        promptEl.className = 'prompt';
        promptEl.textContent = 'sneha@desktop:~$ ';
        lineEl.appendChild(promptEl);
        
        const cmdTextEl = document.createElement('span');
        cmdTextEl.className = 'cmd';
        lineEl.appendChild(cmdTextEl);
        
        terminalBody.appendChild(lineEl);
        
        // Type the command character by character
        await typeText(cmdTextEl, line.text);
      } else if (line.type === 'output') {
        const outputEl = document.createElement('pre');
        outputEl.className = 'terminal-output';
        outputEl.style.whiteSpace = 'pre-wrap';
        outputEl.style.fontFamily = 'inherit';
        lineEl.appendChild(outputEl);
        
        terminalBody.appendChild(lineEl);
        
        // Output appears line by line
        const outputLines = line.text.split('\n');
        for (let oLine of outputLines) {
          outputEl.textContent += oLine + '\n';
          await sleep(120);
        }
      }
      
      // Auto scroll to bottom
      terminalBody.scrollTop = terminalBody.scrollHeight;
      await sleep(1000);
      index++;
    }
  }

  function typeText(element, text) {
    return new Promise((resolve) => {
      let charIndex = 0;
      // Append a blinking cursor span
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      element.parentNode.appendChild(cursor);
      
      const interval = setInterval(() => {
        if (charIndex < text.length) {
          element.textContent += text.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(interval);
          cursor.remove(); // Remove cursor when typing completes
          resolve();
        }
      }, 60);
    });
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 2. Cursor Glow Track Interaction for Glassmorphic Cards
  const cards = document.querySelectorAll('.project-card, .skills-bento-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // 3. Scroll Reveal Effect (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-el');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // 4. Mobile Burger Navigation Menu
  const navToggle = document.getElementById('nav-toggle');
  const navPillContainer = document.getElementById('nav-pill-container');

  if (navToggle && navPillContainer) {
    navToggle.addEventListener('click', () => {
      const isVisible = navPillContainer.classList.contains('mobile-visible');
      if (isVisible) {
        navPillContainer.classList.remove('mobile-visible');
        navToggle.innerHTML = '&#9776;'; // Hamburger
      } else {
        navPillContainer.classList.add('mobile-visible');
        navToggle.innerHTML = '&times;'; // Cross
      }
    });

    // Close mobile menu on clicking any navigation link
    const links = navPillContainer.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navPillContainer.classList.remove('mobile-visible');
          navToggle.innerHTML = '&#9776;';
        }
      });
    });
  }
});
