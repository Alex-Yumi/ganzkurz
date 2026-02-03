/* ============================================
   GanzKurz — Netflix-style Scroll Zoom
   ============================================ */

const logo = document.getElementById('logo');
const content = document.querySelector('.content-inner');
const scrollHint = document.querySelector('.scroll-hint');

// Scroll handler for Netflix zoom effect
function handleScroll() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Calculate progress (0 to 1) based on scroll
    const progress = Math.min(scrollY / (windowHeight * 0.8), 1);
    
    // Logo: Scale up (1 to 3) and fade out
    const scale = 1 + (progress * 2);
    const opacity = 1 - progress;
    
    logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
    logo.style.opacity = opacity;
    
    // Hide scroll hint as user scrolls
    scrollHint.style.opacity = 1 - (progress * 2);
    
    // When logo is mostly faded, make it non-blocking
    if (progress > 0.8) {
        logo.style.pointerEvents = 'none';
    } else {
        logo.style.pointerEvents = 'auto';
    }
    
    // Show content when scrolled enough
    if (progress > 0.5) {
        content.classList.add('visible');
    } else {
        content.classList.remove('visible');
    }
}

// Throttle scroll for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial state
handleScroll();
