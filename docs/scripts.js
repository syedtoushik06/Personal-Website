// Portfolio Enhancement Script - Fixed Scrolling
(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. SCROLL PROGRESS BAR
    // ============================================
    function initScrollProgress() {
      let scrollProgress = document.querySelector('.scroll-progress');
      
      if (!scrollProgress) {
        scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        document.body.prepend(scrollProgress);
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
    // 3. STICKY NAVBAR EFFECT
    // ============================================
    function initStickyNavbar() {
      const navbar = document.querySelector('.navbar');
      
      if (!navbar) return;

      function handleScroll() {
        if (window.pageYOffset > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }

    // ============================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href && href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              
              // Get navbar height to offset scroll position
              const navbar = document.querySelector('.navbar');
              const navbarHeight = navbar ? navbar.offsetHeight : 60;
              const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
              
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });
    }

    // ============================================
    // 5. INTERSECTION OBSERVER - FADE IN ANIMATIONS
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
    // 6. SKILL BADGE ANIMATIONS
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
    // 7. CARD TILT EFFECT (3D HOVER)
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
    // 8. PARALLAX EFFECT REMOVED - WAS CAUSING GLITCH
    // ============================================
    // The parallax effect has been removed because it caused scrolling glitches
    // on the index page. The hero section now scrolls normally with the page.

    // ============================================
    // 9. LOADING ANIMATIONS FOR IMAGES
    // ============================================
    function initImageLoadingAnimations() {
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.6s ease';
        
        if (img.complete) {
          img.style.opacity = '1';
        } else {
          img.addEventListener('load', function() {
            this.style.opacity = '1';
          });
        }
      });
    }

    // ============================================
    // 10. BUTTON RIPPLE EFFECT
    // ============================================
    function initButtonRippleEffect() {
      const buttons = document.querySelectorAll('.cta-button');
      
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
          `;
          
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          setTimeout(() => ripple.remove(), 600);
        });
      });
    }

    // ============================================
    // 11. ACTIVE LINK HIGHLIGHTING
    // ============================================
    function initActiveNavigation() {
      const currentPage = window.location.pathname.split('/').pop() || 'index.qmd';
      const navLinks = document.querySelectorAll('.navbar a');
      
      navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref && linkHref.includes(currentPage)) {
          link.style.borderBottom = '3px solid #60a5fa';
          link.style.paddingBottom = '0.3rem';
        }
      });
    }

    // ============================================
    // 12. OPTIMIZED SCROLL HANDLER
    // ============================================
    function initOptimizedScrollHandler() {
      let ticking = false;
      const navbar = document.querySelector('.navbar');
      const scrollTopBtn = document.querySelector('.scroll-top');
      const scrollProgress = document.querySelector('.scroll-progress');

      function updateScrollElements() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        // Update progress bar
        if (scrollProgress) {
          scrollProgress.style.width = scrolled + '%';
        }
        
        // Show/hide scroll-to-top button
        if (scrollTopBtn) {
          if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
          } else {
            scrollTopBtn.classList.remove('visible');
          }
        }
        
        // Add scrolled class to navbar
        if (navbar) {
          if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        }
        
        ticking = false;
      }
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollElements);
          ticking = true;
        }
      }, { passive: true });
      
      updateScrollElements();
    }

    // ============================================
    // INITIALIZE ALL FEATURES (PARALLAX REMOVED)
    // ============================================
    try {
      initScrollProgress();
      initScrollToTop();
      initStickyNavbar();
      initSmoothScroll();
      initScrollAnimations();
      initSkillBadgeAnimations();
      initCardTiltEffect();
      // initParallaxEffect(); // REMOVED - This was causing the scroll glitch
      initImageLoadingAnimations();
      initButtonRippleEffect();
      initActiveNavigation();
      initOptimizedScrollHandler();
      
      console.log('Portfolio enhancements loaded successfully! (Parallax removed for smooth scrolling)');
    } catch (error) {
      console.error('Error initializing portfolio features:', error);
    }
  });

})();