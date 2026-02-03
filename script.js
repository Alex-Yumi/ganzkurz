/**
 * GanzKurz — Interactive Podcast Landing Page
 * Professional scroll-triggered animations
 */

(function() {
    'use strict';

    // ============================================
    // Configuration
    // ============================================
    const CONFIG = {
        observerThreshold: 0.5,
        observerRootMargin: '0px',
        progressUpdateInterval: 10,
    };

    // ============================================
    // DOM Elements
    // ============================================
    const elements = {
        progressFill: document.querySelector('.progress-bar__fill'),
        transition1: document.getElementById('transition-1'),
        transition2: document.getElementById('transition-2'),
        bios: document.querySelectorAll('.bio'),
        hostCards: document.querySelectorAll('.host-card'),
    };

    // ============================================
    // Progress Bar
    // ============================================
    function updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        if (elements.progressFill) {
            elements.progressFill.style.width = `${Math.min(progress, 100)}%`;
        }
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    function createObserver(callback, options = {}) {
        const defaultOptions = {
            threshold: CONFIG.observerThreshold,
            rootMargin: CONFIG.observerRootMargin,
        };
        
        return new IntersectionObserver(callback, { ...defaultOptions, ...options });
    }

    // Transition 1: Netflix Stripes
    function initTransition1() {
        if (!elements.transition1) return;
        
        const observer = createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(elements.transition1);
    }

    // Transition 2: Reveal Curtain
    function initTransition2() {
        if (!elements.transition2) return;
        
        const observer = createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(elements.transition2);
    }

    // Bio Cards Animation
    function initBioAnimations() {
        if (!elements.bios.length) return;
        
        const observer = createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.2 });
        
        elements.bios.forEach(bio => observer.observe(bio));
    }

    // Host Cards Stagger Animation
    function initHostCardAnimations() {
        if (!elements.hostCards.length) return;
        
        elements.hostCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        });
        
        const observer = createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.host-card');
                    cards.forEach(card => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }
            });
        }, { threshold: 0.2 });
        
        const hostsSection = document.getElementById('hosts');
        if (hostsSection) {
            observer.observe(hostsSection);
        }
    }

    // ============================================
    // Smooth Scroll Enhancement
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // Parallax Effect (subtle)
    // ============================================
    function initParallax() {
        const hero = document.querySelector('.hero__content');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${rate}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        }, { passive: true });
    }

    // ============================================
    // Initialization
    // ============================================
    function init() {
        // Progress bar
        window.addEventListener('scroll', updateProgressBar, { passive: true });
        updateProgressBar();
        
        // Animations
        initTransition1();
        initTransition2();
        initBioAnimations();
        initHostCardAnimations();
        
        // Enhancements
        initSmoothScroll();
        initParallax();
        
        // Log ready state
        console.log('🎙️ GanzKurz initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
