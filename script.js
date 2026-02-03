/* ============================================
   GanzKurz — Netflix-style Scroll Transition
   Extended with Curtain + Portraits
   ============================================ */

const logo = document.getElementById('logo');
const stripes = document.getElementById('stripes');
const content = document.getElementById('content');
const scrollHint = document.querySelector('.scroll-hint');

// NEW elements
const curtain = document.getElementById('curtain');
const portraits = document.getElementById('portraits');

function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;
    
    // PHASE 1-3: Original transition (0 to 1.5vh)
    const phase1Progress = Math.min(scrollY / (vh * 1.5), 1);
    
    // PHASE 4-5: New transitions (1.5vh to 4vh)
    const phase2Start = vh * 1.5;
    const phase2End = vh * 4;
    const phase2Progress = Math.max(0, Math.min((scrollY - phase2Start) / (phase2End - phase2Start), 1));
    
    // === PHASE 1: Logo zoom (0% - 35% of phase1) ===
    if (phase1Progress < 0.35) {
        const p = phase1Progress / 0.35;
        const scale = 1 + (p * 2);
        const opacity = 1 - p;
        
        logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
        logo.style.opacity = opacity;
        logo.style.visibility = 'visible';
        
        stripes.className = 'stripes-container';
        content.classList.remove('visible');
        
        // Hide new elements
        if (curtain) { curtain.classList.remove('visible', 'open'); }
        if (portraits) { portraits.classList.remove('visible'); }
    }
    
    // === PHASE 2: Stripes IN (35% - 55% of phase1) ===
    else if (phase1Progress < 0.55) {
        logo.style.opacity = 0;
        logo.style.visibility = 'hidden';
        
        stripes.className = 'stripes-container stripes-in';
        content.classList.remove('visible');
        
        if (curtain) { curtain.classList.remove('visible', 'open'); }
        if (portraits) { portraits.classList.remove('visible'); }
    }
    
    // === PHASE 3: Content appears (55%+ of phase1, before phase2 starts) ===
    else if (phase2Progress < 0.2) {
        logo.style.opacity = 0;
        logo.style.visibility = 'hidden';
        
        stripes.className = 'stripes-container stripes-in';
        content.classList.add('visible');
        
        if (curtain) { curtain.classList.remove('visible', 'open'); }
        if (portraits) { portraits.classList.remove('visible'); }
    }
    
    // === PHASE 4: Gold curtain appears and opens (20% - 50% of phase2) ===
    else if (phase2Progress < 0.5) {
        logo.style.opacity = 0;
        logo.style.visibility = 'hidden';
        
        stripes.className = 'stripes-container stripes-in';
        content.classList.remove('visible');
        
        if (curtain) {
            curtain.classList.add('visible');
            if (phase2Progress > 0.35) {
                curtain.classList.add('open');
            } else {
                curtain.classList.remove('open');
            }
        }
        if (portraits) { portraits.classList.add('visible'); }
    }
    
    // === PHASE 5: Portraits revealed (50%+ of phase2) ===
    else {
        logo.style.opacity = 0;
        logo.style.visibility = 'hidden';
        
        stripes.className = 'stripes-container stripes-in';
        content.classList.remove('visible');
        
        if (curtain) { curtain.classList.add('visible', 'open'); }
        if (portraits) { portraits.classList.add('visible'); }
    }
    
    // Hide all fixed layers when past animations (scrolled to bios section)
    const pastFixed = scrollY > vh * 4.5;
    
    [logo, stripes, document.querySelector('.content'), curtain, portraits].forEach(el => {
        if (el) {
            el.style.display = pastFixed ? 'none' : '';
        }
    });
    
    // Scroll hint
    if (scrollHint) {
        scrollHint.style.opacity = Math.max(0, 1 - phase1Progress * 4);
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener('DOMContentLoaded', handleScroll);
handleScroll();
