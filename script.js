const imagesToCache = [
  'assets/Pale Blue Dot.webp',
  'assets/The_Blue_Marble.webp'
];
imagesToCache.forEach(src => {
  const img = new Image();
  img.src = src;
});


const loader = document.getElementById('loader');
setTimeout(() => { loader.classList.add('hidden'); }, 2000);

(function() {
  const canvas = document.getElementById('starfieldCanvas');
  const ctx = canvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  let stars = [];
  const starCount = 220;

  function resize() {
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function makeStars() {
    stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      s: Math.random() * 0.25 + 0.05,
      t: Math.random() * Math.PI * 2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.x -= s.s;
      if (s.x < -10) s.x = window.innerWidth + 10;
      s.t += 0.02;
      const alpha = 0.6 + Math.sin(s.t) * 0.4;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); makeStars(); });
  resize();
  makeStars();
  draw();
})();

document.getElementById('year').textContent = new Date().getFullYear();

const postCount = document.querySelectorAll('.blog-grid .card').length;
const postCountEl = document.getElementById('post-count');
if (postCountEl) {
  postCountEl.textContent = `${postCount} post${postCount === 1 ? '' : 's'}`;
}
