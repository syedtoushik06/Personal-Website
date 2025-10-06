// Portfolio Enhancement Script
(function() {
  'use strict';

  // ============================================
  // 1. SCROLL PROGRESS BAR
  // ============================================
  function initScrollProgress() {
    let scrollProgress = document.querySelector('.scroll-progress');
    
    if (!scrollProgress) {
      scrollProgress = document.createElement('div');
      scrollProgress.className = 'scroll-progress';
      document.body.appendChild(scrollProgress);
    }

    function updateProgress() {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ============================================
  // 2. SCROLL TO TOP BUTTON
  // ============================================
  function initScrollToTop() {
    let scrollTopBtn = document.querySelector('.scroll-top');
    
    if (!scrollTopBtn) {
      scrollTopBtn = document.createElement('div');
      scrollTopBtn.className = 'scroll-top';
      scrollTopBtn.innerHTML = '↑';
      scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
      scrollTopBtn.setAttribute('role', 'button');
      scrollTopBtn.setAttribute('tabindex', '0');
      document.body.appendChild(scrollTopBtn);
    }

    function toggleVisibility() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    scrollTopBtn.addEventListener('click', scrollToTop);
    scrollTopBtn.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToTop();
      }
    });
  }

  // ============================================
  // 3. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // ============================================
  // 4. INTERSECTION OBSERVER - FADE IN ANIMATIONS
  // ============================================
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.content-section, .card, .timeline-item, .quote, .info-box, .success-box'
    );

    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.animationDelay = `${index * 0.1}s`;
      observer.observe(el);
    });
  }

  // ============================================
  // 5. SKILL BADGE ANIMATIONS
  // ============================================
  function initSkillBadgeAnimations() {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach((badge, index) => {
      badge.style.opacity = '0';
      badge.style.transform = 'scale(0.8)';
      
      setTimeout(() => {
        badge.style.transition = 'all 0.4s ease';
        badge.style.opacity = '1';
        badge.style.transform = 'scale(1)';
      }, index * 50);
    });
  }

  // ============================================
  // 6. CARD TILT EFFECT (3D HOVER)
  // ============================================
  function initCardTiltEffect() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  // ============================================
  // 7. PARALLAX EFFECT FOR HERO SECTION
  // ============================================
  function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    function updateParallax() {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  // ============