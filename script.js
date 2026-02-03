// Background Slideshow
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 10 seconds
setInterval(nextSlide, 10000);

// Preload images
slides.forEach(slide => {
    const bg = slide.style.backgroundImage;
    const url = bg.slice(5, -2); // Extract URL from "url('...')"
    const img = new Image();
    img.src = url;
});
