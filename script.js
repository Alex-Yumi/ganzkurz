/* ============================================
   GanzKurz — Netflix-style Scroll Transition
   Phase 1: Logo zoom
   Phase 2: Stripes in
   Phase 3: Stripes out + Content reveal
   ============================================ */

const logo = document.getElementById('logo');
const stripes = document.getElementById('stripes');
const content = document.getElementById('content');
const scrollHint = document.querySelector('.scroll-hint');

// Track transition phases
let currentPhase = 0; // 0: logo, 1: stripes-in, 2: stripes-out, 3: content

function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Total scroll journey = 2 viewport heights
    const totalJourney = windowHeight * 1.5;
    const progress = Math.min(scrollY / totalJourney, 1);
    
    // Phase 1: Logo zoom (0% - 40%)
    if (progress <= 0.4) {
        const logoProgress = progress / 0.4; // 0 to 1
        const scale = 1 + (logoProgress * 1.5);
        const opacity = 1 - logoProgress;
        
        if (logo) {
            logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
            logo.style.opacity = opacity;
            logo.style.visibility = opacity > 0 ? 'visible' : 'hidden';
        }
        
        // Reset stripes
        if (stripes) {
            stripes.classList.remove('active', 'stripes-in', 'stripes-out');
        }
        if (content) {
            content.classList.remove('visible');
        }
        
        currentPhase = 0;
    }
    
    // Phase 2: Stripes in (40% - 60%)
    else if (progress <= 0.6) {
        // Logo fully hidden
        if (logo) {
            logo.style.opacity = 0;
            logo.style.visibility = 'hidden';
        }
        
        // Stripes slide in
        if (stripes) {
            stripes.classList.add('active', 'stripes-in');
            stripes.classList.remove('stripes-out');
        }
        
        if (content) {
            content.classList.remove('visible');
        }
        
        currentPhase = 1;
    }
    
    // Phase 3: Stripes out (60% - 80%)
    else if (progress <= 0.8) {
        if (logo) {
            logo.style.opacity = 0;
            logo.style.visibility = 'hidden';
        }
        
        // Stripes slide out
        if (stripes) {
            stripes.classList.add('active', 'stripes-out');
            stripes.classList.remove('stripes-in');
        }
        
        currentPhase = 2;
    }
    
    // Phase 4: Content visible (80%+)
    else {
        if (logo) {
            logo.style.opacity = 0;
            logo.style.visibility = 'hidden';
        }
        
        // Hide stripes completely
        if (stripes) {
            stripes.classList.remove('active', 'stripes-in', 'stripes-out');
        }
        
        // Show content
        if (content) {
            content.classList.add('visible');
        }
        
        currentPhase = 3;
    }
    
    // Scroll hint fades quickly
    if (scrollHint) {
        scrollHint.style.opacity = Math.max(0, 1 - (progress * 5));
    }
}

// Event listeners
window.addEventListener('scroll', handleScroll, { passive: true });
window.addEventListener('touchmove', handleScroll, { passive: true });

// Initial state
document.addEventListener('DOMContentLoaded', handleScroll);
handleScroll();
