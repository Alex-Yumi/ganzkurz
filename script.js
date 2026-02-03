/* ============================================
   GanzKurz — Interactive Studio Script
   ============================================ */

const studio = document.getElementById('studio');
const studioBg = document.getElementById('studioBg');
const screens = document.querySelectorAll('.screen-overlay');
const panels = document.querySelectorAll('.content-panel');

let currentTopic = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add click listeners to screen overlays
    screens.forEach(screen => {
        screen.addEventListener('click', () => {
            const topic = screen.dataset.topic;
            zoomToTopic(topic);
        });
    });
    
    // Allow clicking outside panel content to go back
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
    if (currentTopic) return;
    
    currentTopic = topic;
    
    // Add zoomed state
    studio.classList.add('zoomed');
    
    // Show corresponding panel
    setTimeout(() => {
        const panel = document.getElementById(`panel-${topic}`);
        if (panel) {
            panel.classList.add('active');
        }
    }, 400);
}

function zoomOut() {
    if (!currentTopic) return;
    
    // Hide panel
    const panel = document.getElementById(`panel-${currentTopic}`);
    if (panel) {
        panel.classList.remove('active');
    }
    
    // Remove zoom state
    setTimeout(() => {
        studio.classList.remove('zoomed');
        currentTopic = null;
    }, 200);
}
