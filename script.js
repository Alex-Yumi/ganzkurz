/* ============================================
   GanzKurz — 3D Flip Animation
   ============================================ */

const topics = ['MK Ultra', 'Epstein', '9/11', 'CIA Files'];
let currentTopic = 0;

const flipper = document.querySelector('.flipper');
const topicEl = document.getElementById('topic');

function flipToTopic() {
    // Set the topic text before flipping
    topicEl.textContent = topics[currentTopic];
    
    // Flip to show topic
    flipper.classList.add('flipped');
    
    // After 3 seconds, flip back to logo
    setTimeout(() => {
        flipper.classList.remove('flipped');
        
        // Move to next topic for next flip
        currentTopic = (currentTopic + 1) % topics.length;
    }, 3000);
}

// Start the animation cycle
// Wait 2 seconds, then flip every 5 seconds
setTimeout(() => {
    flipToTopic();
    setInterval(flipToTopic, 6000);
}, 2000);
