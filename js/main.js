document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // Loader Management
  // ----------------------------
  const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 500);
    }
  };

  // Hide loader after 2s or when everything is loaded
  window.addEventListener('load', hideLoader);
  setTimeout(hideLoader, 2000);

  // ----------------------------
  // Navigation Management
  // ----------------------------
  const nav = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // Sticky navigation on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // Smooth scrolling for all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ----------------------------
  // Spline Viewer Management
  // ----------------------------
  const splineViewer = document.querySelector('spline-viewer');
  if (splineViewer) {
    splineViewer.style.pointerEvents = 'none';
    
    splineViewer.addEventListener('mouseover', () => {
      splineViewer.style.pointerEvents = 'auto';
    });
    
    splineViewer.addEventListener('mouseout', () => {
      splineViewer.style.pointerEvents = 'none';
    });
  }

  // ----------------------------
  // Tab System
  // ----------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding content
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // ----------------------------
  // Portfolio Filter
  // ----------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      const filter = button.getAttribute('data-filter');
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.classList.add('show');
          item.style.display = 'block';
        } else {
          item.classList.remove('show');
          item.style.display = 'none';
        }
      });
    });
  });

  // ----------------------------
  // Modal System
  // ----------------------------
  const projectModal = document.getElementById('project-modal');
  const modalClose = document.querySelector('.modal-close');
  const portfolioLinks = document.querySelectorAll('.portfolio-link');

  // Open modal
  portfolioLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = link.getAttribute('data-project');
      
      // Here you would typically fetch project data or use existing data
      // For now we'll just show a placeholder
      const modalBody = projectModal.querySelector('.modal-body');
      modalBody.innerHTML = `
        <h2>${link.closest('.portfolio-overlay').querySelector('h3').textContent}</h2>
        <p>${link.closest('.portfolio-overlay').querySelector('p').textContent}</p>
        <p>Détails du projet à venir...</p>
      `;
      
      projectModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  modalClose.addEventListener('click', () => {
    projectModal.classList.remove('show');
    document.body.style.overflow = 'auto';
  });

  // Close when clicking outside content
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });

  // ----------------------------
  // Back to Top Button
  // ----------------------------
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  // ----------------------------
  // Form Handling
  // ----------------------------
  const contactForm = document.querySelector('.contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Message envoyé avec succès! Je vous répondrai dès que possible.');
      contactForm.reset();
    });
  }

  // ----------------------------
  // Intersection Observer for Animations
  // ----------------------------
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section, .skill-card, .timeline-item, .portfolio-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(element => {
      observer.observe(element);
    });
  };

  animateOnScroll();

  // ----------------------------
  // Progress Bars Animation
  // ----------------------------
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-progress') || bar.style.width;
      bar.style.width = '0';
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          bar.style.width = width;
          observer.unobserve(bar);
        }
      });
      
      observer.observe(bar);
    });
  };

  animateProgressBars();
});