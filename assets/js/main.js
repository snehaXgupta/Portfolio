document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Projects Data Store for Interactive Modal
  const projectsData = {
    'fraudlens': {
      title: 'FraudLens | Fake Review Detection System',
      category: 'AI & Natural Language Processing',
      icon: 'fa-solid fa-shield-halved',
      desc: 'An AI-powered fake review detection system engineered to detect fraudulent and deceitful e-commerce customer feedback. The system extracts text features, analyzes sentiment discrepancies, and applies machine learning classification algorithms to safeguard marketplace credibility.',
      stack: ['Python', 'NLP', 'Scikit-learn', 'NLTK', 'Flask', 'MySQL', 'BeautifulSoup', 'Chart.js'],
      highlights: [
        'Trained and evaluated supervised ML classification pipelines to distinguish authentic reviews from synthetic/spam patterns.',
        'Engineered custom NLP feature extractors incorporating TF-IDF, n-grams, sentiment polarity, and lexical diversity metrics.',
        'Integrated automated web scraping crawlers (BeautifulSoup) for live product review retrieval and evaluation.',
        'Built a clean Flask REST API backed by MySQL for persistent logging and verification telemetry.'
      ],
      github: 'https://github.com/snehaXgupta/FraudLens'
    },
    'manager-agent': {
      title: 'Manager Agent | AI Workforce & Analytics Suite',
      category: 'Full-Stack & LLM Analytics Integration',
      icon: 'fa-solid fa-robot',
      desc: 'A comprehensive workforce and operations management platform built with PHP Laravel and enhanced with local AI-driven analytics using Ollama and Meta\'s Llama 3.1 model. Facilitates automated task allocation, productivity analysis, and enterprise database synchronization.',
      stack: ['PHP', 'Laravel', 'MySQL', 'Oracle Database', 'PL/SQL', 'Ollama', 'Llama 3.1', 'Bootstrap', 'AJAX', 'jQuery'],
      highlights: [
        'Engineered an end-to-end Laravel application covering requirements analysis, relational schema design, and modular MVC architecture.',
        'Integrated local Ollama inference with Llama 3.1 for intelligent workforce reporting and automated summary generation.',
        'Migrated core application schema to Oracle Database and developed custom PL/SQL stored procedures and triggers for optimized reporting logic.',
        'Implemented responsive AJAX/jQuery UI components for real-time workload monitoring without page refreshes.',
        'Deployed live production instance on Render cloud platform for real-time access and testing.'
      ],
      github: 'https://github.com/snehaXgupta/manager-agent',
      live: 'https://manager-agent-gedj.onrender.com/'
    },
    'prahari': {
      title: 'Prahari | Secure Transit & Inventory Sentinel',
      category: 'Production Full-Stack Web Application',
      icon: 'fa-solid fa-map-location-dot',
      desc: 'A production-grade journey tracking and inventory management platform developed at Simpel Techlabs. Features robust Role-Based Access Control (RBAC), multi-role security checkpoints, and real-time SMS notification gateways for mission-critical operations.',
      stack: ['PHP', 'Laravel', 'MySQL', 'Leaflet JS', 'REST APIs', 'SMS Gateway', 'Bootstrap', 'RBAC Security'],
      highlights: [
        'Built and deployed end-to-end full-stack modules with secure authentication and granular role-based permissions.',
        'Integrated live transit telemetry, map visualization using Leaflet JS, and real-time coordinate logging.',
        'Connected transactional SMS notification gateways for instant delivery alerts and incident notifications.',
        'Optimized backend SQL queries and indexing, significantly reducing response latency under multi-tenant load.'
      ],
      github: 'https://github.com/snehaXgupta/prahari-01'
    },
    'anantadrive': {
      title: 'AnantaDrive | Web Hosting & Cloud Services Platform',
      category: 'Cloud Services & Payments Infrastructure',
      icon: 'fa-solid fa-cloud',
      desc: 'Contributed to AnantaDrive at Codevirus Security, developing responsive user experiences and cloud resource provisioning dashboards. Integrated automated checkout systems with Razorpay and streamlined API communication.',
      stack: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'Razorpay API', 'RESTful Services', 'JavaScript'],
      highlights: [
        'Developed fluid, mobile-first frontend interfaces with React.js and Tailwind CSS for cloud hosting management.',
        'Integrated Razorpay payment gateway workflows for seamless recurring subscription checkouts.',
        'Improved data load times and frontend rendering speed by 18% through optimized API payloads and caching.',
        'Constructed reusable component hierarchies adhering to modern design tokens and UI accessibility standards.'
      ],
      github: null
    },
    'bookwise': {
      title: 'BookWise | Digital Catalog & Recommendation Portal',
      category: 'Web Application & Algorithms',
      icon: 'fa-solid fa-book-open',
      desc: 'A full-stack book discovery and personalized cataloging platform that helps readers track their reading velocity, rate volumes, and discover new literary works through custom recommendation logic.',
      stack: ['TypeScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
      highlights: [
        'Engineered full-stack TypeScript services with React frontend and Express/MongoDB backend.',
        'Designed personal shelf statistics algorithms tracking reading speeds, genres, and milestones.',
        'Integrated secure JWT user authentication and profile management.',
        'Implemented responsive search filtering with debounce mechanics over MongoDB collections.'
      ],
      github: 'https://github.com/snehaXgupta/Book-Wise'
    },
    'acsg': {
      title: 'Automated Class Schedule Generator',
      category: 'Constraint Logic & Timetable Algorithms',
      icon: 'fa-solid fa-calendar-days',
      desc: 'An algorithmic timetable compiler that eliminates scheduling conflicts for academic institutions. Uses constraint satisfaction rules to balance faculty workloads, room availability, and student period allocations automatically.',
      stack: ['TypeScript', 'JavaScript (ES6)', 'HTML5', 'CSS Grid', 'Constraint Resolution Algorithms'],
      highlights: [
        'Implemented collision-free backtracking and constraint logic to generate balanced semester schedules.',
        'Created an interactive grid interface enabling instructors to dynamically swap or lock specific period slots.',
        'Designed export modules for instant printing and JSON schedule serialization.',
        'Optimized solver performance to handle complex multi-department scheduling constraints in milliseconds.'
      ],
      github: 'https://github.com/snehaXgupta/Automated-Class-Schedule-Generator'
    }
  };

  // 2. Project Modal Interaction Logic
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalIcon = document.getElementById('modal-icon');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalStack = document.getElementById('modal-stack');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalGithubLink = document.getElementById('modal-github-link');
  const modalLiveLink = document.getElementById('modal-live-link');

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    // Populate Modal Content
    modalIcon.innerHTML = `<i class="${project.icon}"></i>`;
    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;

    // Populate Tech Badges
    modalStack.innerHTML = '';
    project.stack.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'modal-tag-pill';
      tag.textContent = tech;
      modalStack.appendChild(tag);
    });

    // Populate Highlights
    modalHighlights.innerHTML = '';
    project.highlights.forEach(highlight => {
      const li = document.createElement('li');
      li.textContent = highlight;
      modalHighlights.appendChild(li);
    });

    // Populate GitHub Link if available
    if (modalGithubLink) {
      if (project.github) {
        modalGithubLink.href = project.github;
        modalGithubLink.style.display = 'inline-flex';
      } else {
        modalGithubLink.style.display = 'none';
      }
    }

    // Populate Live Link if available
    if (modalLiveLink) {
      if (project.live) {
        modalLiveLink.href = project.live;
        modalLiveLink.style.display = 'inline-flex';
      } else {
        modalLiveLink.style.display = 'none';
      }
    }

    // Open Modal
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeProjectModal() {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach Click Handlers to All Project Cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    const projectId = card.getAttribute('data-project-id');
    
    card.addEventListener('click', (e) => {
      // If user clicked directly on git or live link buttons, let the link open normally
      if (e.target.closest('.git-btn') || e.target.closest('.live-btn')) return;
      openProjectModal(projectId);
    });

    // Keyboard Accessibility (Enter or Space to open)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(projectId);
      }
    });
  });

  // Close handlers
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);

  // Close on backdrop click (outside container)
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalBackdrop && modalBackdrop.classList.contains('open')) closeProjectModal();
      if (awsGalleryBackdrop && awsGalleryBackdrop.classList.contains('open')) closeAwsGalleryModal();
    }
  });

  // 3. AWS Cloud Captain Event Gallery Modal Logic
  const awsLeadershipCard = document.getElementById('aws-leadership-card');
  const awsGalleryBackdrop = document.getElementById('aws-gallery-modal-backdrop');
  const awsGalleryCloseBtn = document.getElementById('aws-gallery-close-btn');
  const awsGalleryDismissBtn = document.getElementById('aws-gallery-dismiss-btn');

  function openAwsGalleryModal() {
    if (!awsGalleryBackdrop) return;
    awsGalleryBackdrop.classList.add('open');
    awsGalleryBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeAwsGalleryModal() {
    if (!awsGalleryBackdrop) return;
    awsGalleryBackdrop.classList.remove('open');
    awsGalleryBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (awsLeadershipCard) {
    awsLeadershipCard.addEventListener('click', openAwsGalleryModal);
    awsLeadershipCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openAwsGalleryModal();
      }
    });
  }

  if (awsGalleryCloseBtn) awsGalleryCloseBtn.addEventListener('click', closeAwsGalleryModal);
  if (awsGalleryDismissBtn) awsGalleryDismissBtn.addEventListener('click', closeAwsGalleryModal);

  if (awsGalleryBackdrop) {
    awsGalleryBackdrop.addEventListener('click', (e) => {
      if (e.target === awsGalleryBackdrop) {
        closeAwsGalleryModal();
      }
    });
  }

  // 4. Scroll Reveal Effect (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-el');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });


  // 5. Mobile Burger Navigation Menu
  const navToggle = document.getElementById('nav-toggle');
  const navPillContainer = document.getElementById('nav-pill-container');

  if (navToggle && navPillContainer) {
    navToggle.addEventListener('click', () => {
      const isVisible = navPillContainer.classList.contains('mobile-visible');
      if (isVisible) {
        navPillContainer.classList.remove('mobile-visible');
        navToggle.innerHTML = '&#9776;';
      } else {
        navPillContainer.classList.add('mobile-visible');
        navToggle.innerHTML = '&times;';
      }
    });

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

  // 6. Simpel Experience Card Minimal Arrow Toggle
  const simpelToggleBtn = document.getElementById('simpel-toggle-btn');
  const simpelMoreContent = document.getElementById('simpel-more-content');

  if (simpelToggleBtn && simpelMoreContent) {
    simpelToggleBtn.addEventListener('click', () => {
      const isExpanded = simpelMoreContent.classList.toggle('expanded');
      simpelToggleBtn.classList.toggle('expanded', isExpanded);
      simpelToggleBtn.setAttribute('aria-expanded', isExpanded);
      simpelToggleBtn.setAttribute('title', isExpanded ? 'Show less' : 'View more details');
    });
  }

});
