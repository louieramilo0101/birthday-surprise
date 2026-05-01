document.addEventListener('DOMContentLoaded', () => {

  // --- Overlay ---
  const overlay = document.getElementById('overlay');
  const startBtn = document.getElementById('startBtn');
  const music = document.getElementById('bg-music');
  const mainContent = document.getElementById('main-content');

  const RELATIONSHIP_START = new Date('2025-01-01T00:00:00');

  function getRelationshipOccasion(now = new Date()) {
    const isFirstDayOfMonth = now.getDate() === 1;
    const isAnniversary = now.getMonth() === 0 && now.getDate() === 1;

    const totalMonths =
      (now.getFullYear() - RELATIONSHIP_START.getFullYear()) * 12 +
      (now.getMonth() - RELATIONSHIP_START.getMonth()) +
      (now.getDate() >= RELATIONSHIP_START.getDate() ? 0 : -1);

    const monthsaryMessages = [
      'Happy monthsary, my love. Every month with you still feels like magic. ✨',
      'Another month, another reason I am grateful for your heart. Happy monthsary! 💖',
      'Happy monthsary, baby! Loving you is still my favorite part of every day. 🌸',
      'We made it to another sweet milestone—happy monthsary, love! 🥰'
    ];

    const anniversaryMessages = [
      'Happy anniversary, my forever favorite person. Thank you for choosing us every day. ❤️',
      'One more year of us, one more year of love. Happy anniversary, baby! 🎉',
      'Happy anniversary! Building this love story with you is my greatest gift. 💌',
      'Another beautiful year with you—happy anniversary, my love! 🌹'
    ];

    if (isAnniversary) {
      return {
        title: `Happy Anniversary, Love!`,
        subtitle: `Today is our ${now.getFullYear() - RELATIONSHIP_START.getFullYear()} year anniversary 💍`,
        message: anniversaryMessages[now.getFullYear() % anniversaryMessages.length],
      };
    }

    if (isFirstDayOfMonth && totalMonths > 0) {
      return {
        title: `Happy ${totalMonths}th Monthsary, Love!`,
        subtitle: `Since January 1, 2025 — and still my favorite person.`,
        message: monthsaryMessages[now.getMonth() % monthsaryMessages.length],
      };
    }

    return {
      title: 'Celebrating Us, Always',
      subtitle: 'A little corner of our story, made with love.',
      message: 'No special date needed—I love you every single day. 💕',
    };
  }

  function renderOccasionBanner() {
    const occasionTitle = document.getElementById('occasionTitle');
    const occasionSubtitle = document.getElementById('occasionSubtitle');
    const occasionMessage = document.getElementById('occasionMessage');
    if (!occasionTitle || !occasionSubtitle || !occasionMessage) return;

    const occasion = getRelationshipOccasion(new Date());
    occasionTitle.textContent = occasion.title;
    occasionSubtitle.textContent = occasion.subtitle;
    occasionMessage.textContent = occasion.message;
  }

  renderOccasionBanner();
  
  // 🔥 Overlay click
  startBtn.addEventListener('click', () => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.style.display = 'none';
      mainContent.style.display = 'block';
    }, 1000);

    if (music) {
      music.muted = false;
      music.currentTime = 1.5;
      music.play().catch(() => {});
    }

    setInterval(createHeart, 250);
    setInterval(createBeam, 5000);
  });

  const letterBtn = document.getElementById('letterBtn');
  if (letterBtn) {
      letterBtn.addEventListener('click', () => {
        window.location.href = 'cake.html';
      });
  }

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

  function createBeam() {
    const beam = document.createElement('div');
    beam.classList.add('beam');
    beam.style.left = Math.random() * 100 + 'vw';
    beam.style.width = (Math.random() * 60 + 40) + 'px';
    beam.style.animationDuration = (Math.random() * 4 + 4) + 's';
    document.getElementById('lightbeams').appendChild(beam);
    setTimeout(() => beam.remove(), 8000);
  }

  function updateCounter() {
    const now = new Date();
    let years = now.getFullYear() - RELATIONSHIP_START.getFullYear();
    let months = now.getMonth() - RELATIONSHIP_START.getMonth();
    let days = now.getDate() - RELATIONSHIP_START.getDate();
    
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
  
    document.getElementById('years').textContent = String(years).padStart(2, '0');
    document.getElementById('months').textContent = String(months).padStart(2, '0');
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCounter, 1000);
  updateCounter();

});

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
