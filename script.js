/* ============================================
   GanzKurz — Background Slideshow
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Change slide every 10 seconds
    setInterval(() => {
        // Remove active from current
        slides[currentSlide].classList.remove('active');
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active to new slide
        slides[currentSlide].classList.add('active');
    }, 10000);
});
