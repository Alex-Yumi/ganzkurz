/* ============================================
   GanzKurz — Scroll-Driven Animation Controller
   ============================================ */

(function() {
    'use strict';
    
    // Elements
    const logo = document.getElementById('logo');
    const stripes = document.getElementById('stripes');
    const intro = document.getElementById('intro');
    const curtain = document.getElementById('curtain');
    const portraits = document.getElementById('portraits');
    const progressFill = document.querySelector('.progress-fill');
    const scrollHint = document.getElementById('scroll-hint');
    
    // Total scroll distance for fixed animations (matches CSS scroll-spacer)
    const FIXED_SCROLL_HEIGHT = 5; // viewport heights
    
    // Animation phases (as percentages of fixed scroll distance)
    const PHASES = {
        // Logo zoom: 0% - 20%
        logoStart: 0,
        logoEnd: 0.20,
        
        // Stripes in: 20% - 40%
        stripesStart: 0.20,
        stripesEnd: 0.40,
        
        // Intro text: 40% - 55%
        introStart: 0.40,
        introEnd: 0.55,
        
        // Curtain open: 55% - 70%
        curtainStart: 0.55,
        curtainEnd: 0.70,
        
        // Portraits: 70% - 100%
        portraitsStart: 0.70,
        portraitsEnd: 1.0
    };
    
    function lerp(start, end, t) {
        return start + (end - start) * Math.max(0, Math.min(1, t));
    }
    
    function handleScroll() {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const fixedDistance = vh * FIXED_SCROLL_HEIGHT;
        const totalHeight = document.documentElement.scrollHeight - vh;
        
        // Progress through fixed animations (0 to 1)
        const fixedProgress = Math.min(scrollY / fixedDistance, 1);
        
        // Total page progress for progress bar
        const totalProgress = scrollY / totalHeight;
        
        // Update progress bar
        if (progressFill) {
            progressFill.style.width = `${totalProgress * 100}%`;
        }
        
        // Update scroll hint
        if (scrollHint) {
            scrollHint.style.opacity = fixedProgress < 0.1 ? 1 - (fixedProgress / 0.1) : 0;
        }
        
        // === PHASE 1: Logo Zoom ===
        if (fixedProgress <= PHASES.logoEnd) {
            const p = fixedProgress / PHASES.logoEnd;
            const scale = 1 + (p * 3); // Zoom from 1x to 4x
            const opacity = 1 - p;
            
            logo.style.transform = `translate(-50%, -50%) scale(${scale})`;
            logo.style.opacity = opacity;
            logo.style.visibility = opacity > 0 ? 'visible' : 'hidden';
            
            // Reset everything else
            stripes.classList.remove('stripes-in');
            intro.classList.remove('visible');
            curtain.classList.remove('open');
            portraits.classList.remove('visible');
        }
        
        // === PHASE 2: Stripes In ===
        else if (fixedProgress <= PHASES.stripesEnd) {
            logo.style.opacity = 0;
            logo.style.visibility = 'hidden';
            
            stripes.classList.add('stripes-in');
            intro.classList.remove('visible');
            curtain.classList.remove('open');
            portraits.classList.remove('visible');
        }
        
        // === PHASE 3: Intro Text ===
        else if (fixedProgress <= PHASES.introEnd) {
            logo.style.opacity = 0;
            logo.style.visibility = 'hidden';
            
            stripes.classList.add('stripes-in');
            intro.classList.add('visible');
            curtain.classList.remove('open');
            portraits.classList.remove('visible');
        }
        
        // === PHASE 4: Curtain Opens ===
        else if (fixedProgress <= PHASES.curtainEnd) {
            logo.style.opacity = 0;
            logo.style.visibility = 'hidden';
            
            stripes.classList.add('stripes-in');
            intro.classList.remove('visible');
            curtain.classList.add('open');
            portraits.classList.add('visible');
        }
        
        // === PHASE 5: Portraits Stay ===
        else {
            logo.style.opacity = 0;
            logo.style.visibility = 'hidden';
            
            stripes.classList.add('stripes-in');
            intro.classList.remove('visible');
            curtain.classList.add('open');
            portraits.classList.add('visible');
        }
        
        // Hide fixed layers when we've scrolled past them
        const pastFixed = scrollY > fixedDistance;
        
        if (pastFixed) {
            logo.style.display = 'none';
            stripes.style.display = 'none';
            intro.style.display = 'none';
            curtain.style.display = 'none';
            portraits.style.display = 'none';
        } else {
            logo.style.display = '';
            stripes.style.display = '';
            intro.style.display = '';
            curtain.style.display = '';
            portraits.style.display = '';
        }
    }
    
    // Throttled scroll handler for performance
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Initialize
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    
    console.log('🎙️ GanzKurz initialized');
    
})();
