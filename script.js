const slides = document.querySelectorAll(".slide");
const music = document.getElementById("bg-music");

let current = 0;
let transitioning = false;
let audioUnlocked = false;

const TRANSITION_TIME = 2000;

/* Initial slide fade-in */
setTimeout(() => {
    slides[current].classList.add("show");
}, 100);

/* Prepare audio */
music.volume = 0;
music.muted = true;
music.play().catch(() => {});

/* Smooth audio fade-in */
function fadeInMusic() {
    let vol = 0;
    music.muted = false;

    const fade = setInterval(() => {
        vol += 0.02;
        if (vol >= 0.2) {
            music.volume = 0.2;
            clearInterval(fade);
        } else {
            music.volume = vol;
        }
    }, 100);
}

/* Handle click */
document.addEventListener("click", () => {
    if (!audioUnlocked) {
        audioUnlocked = true;
        music.play().then(fadeInMusic).catch(() => {});
    }

    if (transitioning) return;
    transitioning = true;

    slides[current].classList.remove("show");

    setTimeout(() => {
        current = (current + 1) % slides.length;
        slides[current].classList.add("show");
        transitioning = false;
    }, TRANSITION_TIME);
});
