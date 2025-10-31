document.addEventListener('DOMContentLoaded', () => {

  // --- Overlay ---
  const overlay = document.getElementById('overlay');
  const startBtn = document.getElementById('startBtn');
  const music = document.getElementById('bg-music');
  const mainContent = document.getElementById('main-content'); // <-- ADDED THIS
  
  // 🔥 Overlay click
  startBtn.addEventListener('click', () => {
    // fade out overlay
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.style.display = 'none';
      mainContent.style.display = 'block'; // <-- ADDED THIS
    }, 1000); // matches CSS transition

    // play music
    if (music) {
      music.muted = false;
      music.currentTime = 1.5;
      music.play().catch(() => {});
      // All sessionStorage code removed
    }

    // start hearts
    setInterval(createHeart, 250);
    // start beams
    setInterval(createBeam, 5000); // one beam every 5s
  });

  // --- Letter Button (now Cake Button) ---
  const letterBtn = document.getElementById('letterBtn');
  if (letterBtn) {
      letterBtn.addEventListener('click', () => {
        // Navigate to cake.html
        window.location.href = 'cake.html';
      });
  }

  // --- Hearts ---
  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    document.getElementById('hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }

  // --- Light Beams ---
  function createBeam() {
    const beam = document.createElement('div');
    beam.classList.add('beam');
    beam.style.left = Math.random() * 100 + 'vw';
    beam.style.width = (Math.random() * 60 + 40) + 'px'; // 40–100px wide
    beam.style.animationDuration = (Math.random() * 4 + 4) + 's'; // 4–8s
    document.getElementById('lightbeams').appendChild(beam);
    setTimeout(() => beam.remove(), 8000);
  }

  // --- Time Counter ---
  function updateCounter() {
    const startDate = new Date("2025-01-01T00:00:00"); // your real start date
    const now = new Date();
    
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonth;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
  
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    document.getElementById("years").textContent = String(years).padStart(2, "0");
    document.getElementById("months").textContent = String(months).padStart(2, "0");
    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
  }

  setInterval(updateCounter, 1000);
  updateCounter();

}); // <-- End of DOMContentLoaded


// --- Swimmer Background (Overlay) ---
// This code is separate because it has its own canvas
const swimmerCanvas = document.getElementById('swimmers');
const swimmerCtx = swimmerCanvas.getContext('2d');

function resizeSwimmerCanvas() {
  swimmerCanvas.width = window.innerWidth;
  swimmerCanvas.height = window.innerHeight;
}
resizeSwimmerCanvas();
window.addEventListener('resize', resizeSwimmerCanvas);

class Swimmer {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * swimmerCanvas.width;
    this.y = Math.random() * swimmerCanvas.height;
    this.speed = 1 + Math.random() * 2;
    this.size = 3 + Math.random() * 3;
    this.offset = Math.random() * 1000;
    this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;
  }
  update(time) {
    this.x += this.speed;
    this.y += Math.sin((this.x + this.offset + time * 0.002) * 0.05) * 1.5;

    if (this.x > swimmerCanvas.width + 20) {
      this.x = -20;
      this.y = Math.random() * swimmerCanvas.height;
    }
  }
  draw() {
    swimmerCtx.beginPath();
    swimmerCtx.fillStyle = this.color;
    swimmerCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    swimmerCtx.fill();
  }
}

const swimmers = [];
for (let i = 0; i < 40; i++) {
  swimmers.push(new Swimmer());
}

function animateSwimmers(time) {
  swimmerCtx.clearRect(0, 0, swimmerCanvas.width, swimmerCanvas.height);
  swimmers.forEach(s => {
    s.update(time);
    s.draw();
  });
  requestAnimationFrame(animateSwimmers);
}
animateSwimmers(0);