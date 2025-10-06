// Optimized Script for Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
  
  // Create scroll progress bar
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.prepend(scrollProgress);
  
  // Create scroll-to-top button
  const scrollTopBtn = document.createElement('div');
  scrollTopBtn.className = 'scroll-top';
  scrollTopBtn.innerHTML = '↑';
  document.body.appendChild(scrollTopBtn);
  
  // Add click event to scroll to top button
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Optimized scroll handler
  let ticking = false;
  
  function updateScrollElements() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    scrollProgress.style.width = scrolled + '%';
    
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollElements);
      ticking = true;
    }
  });
  
  updateScrollElements();
});