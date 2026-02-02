// === GanzKurz Landing Page Scripts ===

document.addEventListener('DOMContentLoaded', () => {
    // Hero image carousel with cursor reveal
    initHeroCarousel();
    
    // Smooth reveal animations on scroll
    initScrollAnimations();
    
    // Form handling
    initNotifyForm();
    
    // Parallax effects
    initParallax();
});

// === Hero Image Carousel with Cursor Reveal ===
function initHeroCarousel() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    const bgCurrent = hero.querySelector('.hero-bg-current');
    const bgNext = hero.querySelector('.hero-bg-next');
    const bgReveal = hero.querySelector('.hero-bg-reveal');
    
    // Hero images array
    const heroImages = [
        'hero_documents.png',
        'topic_epstein.png',
        'topic_mkultra.png',
        'topic_911.png'
    ];
    
    let currentIndex = 0;
    const intervalTime = 10000; // 10 seconds
    
    // Set initial images
    bgCurrent.style.backgroundImage = `url('${heroImages[0]}')`;
    bgNext.style.backgroundImage = `url('${heroImages[1]}')`;
    bgReveal.style.backgroundImage = `url('${heroImages[1]}')`;
    
    // Cursor tracking for reveal effect
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        hero.style.setProperty('--mouse-x', `${x}%`);
        hero.style.setProperty('--mouse-y', `${y}%`);
    });
    
    // Image transition function
    function transitionToNext() {
        const nextIndex = (currentIndex + 1) % heroImages.length;
        const afterNextIndex = (nextIndex + 1) % heroImages.length;
        
        // Fade transition
        bgCurrent.style.opacity = '0';
        bgNext.style.opacity = '1';
        bgNext.style.zIndex = '1';
        bgCurrent.style.zIndex = '0';
        
        // After transition, swap roles
        setTimeout(() => {
            currentIndex = nextIndex;
            
            // Swap the elements' classes/roles
            bgCurrent.style.backgroundImage = `url('${heroImages[nextIndex]}')`;
            bgCurrent.style.opacity = '1';
            bgCurrent.style.zIndex = '1';
            
            bgNext.style.backgroundImage = `url('${heroImages[afterNextIndex]}')`;
            bgNext.style.opacity = '0';
            bgNext.style.zIndex = '0';
            
            // Update reveal to show next image
            bgReveal.style.backgroundImage = `url('${heroImages[afterNextIndex]}')`;
        }, 1500);
    }
    
    // Start carousel
    setInterval(transitionToNext, intervalTime);
    
    // Preload images
    heroImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// === Scroll Animations ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animate class to elements for scroll effects
    const animatedElements = document.querySelectorAll(
        '.section-label, .section-title, .section-text, .feature, .topic-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('animate');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// === Notify Form ===
function initNotifyForm() {
    const form = document.getElementById('notifyForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button');
        const input = form.querySelector('input');
        const email = input.value;
        
        // Animate button
        button.innerHTML = '<span>Wird gesendet...</span>';
        button.disabled = true;
        
        // Simulate API call (replace with real endpoint later)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        button.innerHTML = '<span>✓ Eingetragen!</span>';
        button.style.background = '#22c55e';
        input.value = '';
        
        // Reset after delay
        setTimeout(() => {
            button.innerHTML = `
                <span>Benachrichtigen</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            `;
            button.style.background = '';
            button.disabled = false;
        }, 3000);
        
        console.log('Email submitted:', email);
    });
}

// === Parallax Effect ===
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// === Cursor Glow Effect (disabled - using hero reveal instead) ===
// function initCursorGlow() { ... }

// === Redacted Text Glitch Effect ===
const redactedElements = document.querySelectorAll('.redacted');

redactedElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        // Glitch animation
        el.style.animation = 'glitch 0.3s ease-out';
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.animation = '';
    });
});

// Add glitch keyframes dynamically
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchStyle);

// === Topic Cards Tilt Effect ===
const topicCards = document.querySelectorAll('.topic-card');

topicCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// === Typing Effect for Tagline (Optional Enhancement) ===
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// === Console Easter Egg ===
console.log(`
%c🔍 GanzKurz
%cDie Wahrheit braucht Zeit.

Du schaust hinter die Kulissen? Gut so.
Das ist genau der Spirit, den wir suchen.

Coming Soon.
`, 
'font-size: 24px; font-weight: bold; color: #c9a227;',
'font-size: 14px; color: #888;'
);
