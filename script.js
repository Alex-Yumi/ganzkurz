/* ============================================
   GanzKurz — Netflix-style Scroll Zoom
   ============================================ */

const logo = document.getElementById('logo');
const content = document.querySelector('.content-inner');
const scrollHint = document.querySelector('.scroll-hint');

// Scroll handler for Netflix zoom effect
function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Calculate progress (0 to 1) based on scroll
    const progress = Math.min(scrollY / (windowHeight * 0.7), 1);
    
    // Logo: Scale up (1 to 2.5) and fade out
    const scale = 1 + (progress * 1.5);
    const opacity = Math.max(0, 1 - (progress * 1.5));
    
    if (logo) {
        logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
        logo.style.opacity = opacity;
        
        // Hide logo completely when faded
        if (opacity <= 0) {
            logo.style.visibility = 'hidden';
        } else {
            logo.style.visibility = 'visible';
        }
    }
    
    // Hide scroll hint
    if (scrollHint) {
        scrollHint.style.opacity = Math.max(0, 1 - (progress * 3));
    }
    
    // Show content when scrolled past 40%
    if (content) {
        if (progress > 0.4) {
            content.classList.add('visible');
        } else {
            content.classList.remove('visible');
        }
    }
}

// Use both scroll and touch events for mobile compatibility
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('touchmove', handleScroll, { passive: true });

// Also use IntersectionObserver as backup for content reveal
if ('IntersectionObserver' in window && content) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(content);
}

// Initial state
document.addEventListener('DOMContentLoaded', handleScroll);
handleScroll();
