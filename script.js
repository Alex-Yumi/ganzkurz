/* ============================================
   GanzKurz — Interactive Studio Script
   ============================================ */

const studio = document.getElementById('studio');
const studioBg = document.querySelector('.studio-bg');
const hotspots = document.querySelectorAll('.hotspot');
const panels = document.querySelectorAll('.content-panel');

let currentTopic = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add click listeners to hotspots
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', () => {
            const topic = hotspot.dataset.topic;
            zoomToTopic(topic);
        });
    });
    
    // Allow clicking outside panel to go back
    panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            if (e.target === panel) {
                zoomOut();
            }
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentTopic) {
            zoomOut();
        }
    });
});

function zoomToTopic(topic) {
    if (currentTopic) return; // Already zoomed
    
    currentTopic = topic;
    
    // Add zoomed state
    studio.classList.add('zoomed');
    
    // Apply zoom transform
    studioBg.classList.add(`zoom-${topic}`);
    
    // Show corresponding panel after zoom animation
    setTimeout(() => {
        const panel = document.getElementById(`panel-${topic}`);
        if (panel) {
            panel.classList.add('active');
        }
    }, 800);
}

function zoomOut() {
    if (!currentTopic) return;
    
    // Hide panel first
    const panel = document.getElementById(`panel-${currentTopic}`);
    if (panel) {
        panel.classList.remove('active');
    }
    
    // Remove zoom after panel fades
    setTimeout(() => {
        studioBg.classList.remove(`zoom-${currentTopic}`);
        studio.classList.remove('zoomed');
        currentTopic = null;
    }, 300);
}

// Parallax effect on mouse move (subtle)
document.addEventListener('mousemove', (e) => {
    if (currentTopic) return; // Don't move when zoomed
    
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    
    studioBg.style.transform = `translate(${-x}px, ${-y}px)`;
});

// Reset on mouse leave
document.addEventListener('mouseleave', () => {
    if (!currentTopic) {
        studioBg.style.transform = 'translate(0, 0)';
    }
});
