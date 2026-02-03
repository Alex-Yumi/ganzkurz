/* ============================================
   GanzKurz — Netflix-style Scroll Transition
   ============================================ */

const logo = document.getElementById('logo');
const stripes = document.getElementById('stripes');
const content = document.getElementById('content');
const scrollHint = document.querySelector('.scroll-hint');

function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;
    
    // Progress: 0 to 1 over 1.5 viewport heights
    const progress = Math.min(scrollY / (vh * 1.5), 1);
    
    // === PHASE 1: Logo zoom (0% - 35%) ===
    if (progress < 0.35) {
        const p = progress / 0.35;
        const scale = 1 + (p * 2);
        const opacity = 1 - p;
        
        logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
        logo.style.opacity = opacity;
        logo.style.visibility = 'visible';
        
        stripes.className = 'stripes-container';
        content.classList.remove('visible');
    }
    
    // === PHASE 2: Stripes IN (35% - 55%) ===
    else if (progress < 0.55) {
        logo.style.opacity = 0;
        logo.style.visibility = 'hidden';
        
        stripes.className = 'stripes-container stripes-in';
        content.classList.remove('visible');
    }
    
    // === PHASE 3: Content appears over black (55%+) ===
    else {
        logo.style.opacity = 0;
        logo.style.visibility = 'hidden';
        
        // Keep stripes IN (black background stays)
        stripes.className = 'stripes-container stripes-in';
        content.classList.add('visible');
    }
    
    // Scroll hint
    if (scrollHint) {
        scrollHint.style.opacity = Math.max(0, 1 - progress * 4);
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener('DOMContentLoaded', handleScroll);
handleScroll();
