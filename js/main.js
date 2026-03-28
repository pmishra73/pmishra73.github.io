// ─── HERO IMAGE CAROUSEL ──────────────────────────────────────────────────────
// Reads images/manifest.json — a simple JSON array of filenames.
// To add a photo: drop it in images/ and add its filename to manifest.json.
(function initCarousel() {
  const frame       = document.getElementById('carouselFrame');
  const placeholder = document.getElementById('carouselPlaceholder');
  const dotsEl      = document.getElementById('carouselDots');

  async function discoverImages() {
    try {
      const res  = await fetch('images/manifest.json');
      const list = await res.json();
      return list.map(f => 'images/' + f);
    } catch (e) {
      return [];
    }
  }

  function buildCarousel(images) {
    if (images.length === 0) return;

    placeholder.classList.add('hidden');

    images.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');
      const img = document.createElement('img');
      img.src = src; img.alt = 'Prasant Mishra';
      slide.appendChild(img);
      frame.insertBefore(slide, dotsEl);
    });

    if (images.length > 1) {
      images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
      });
    }

    let current = 0;
    const slides = () => frame.querySelectorAll('.carousel-slide');
    const dots   = () => dotsEl.querySelectorAll('.carousel-dot');

    function goTo(n) {
      slides()[current].classList.remove('active');
      if (dots().length) dots()[current].classList.remove('active');
      current = n;
      slides()[current].classList.add('active');
      if (dots().length) dots()[current].classList.add('active');
    }

    if (images.length > 1) {
      setInterval(() => goTo((current + 1) % images.length), 5000);
    }
  }

  discoverImages().then(buildCarousel);
})();

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
(function initTypewriter() {
  const phrases = [
    'design stunning websites.',
    'build powerful web apps.',
    'train engineering teams.',
    'speak at tech conferences.',
    'consult on AI & strategy.',
    'craft exceptional digital products.',
  ];
  const el = document.getElementById('twText');
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    el.textContent = phrase.slice(0, deleting ? ci-- : ci++);

    if (!deleting && ci > phrase.length) {
      deleting = true; setTimeout(tick, 1800); return;
    }
    if (deleting && ci < 0) {
      deleting = false; ci = 0;
      pi = (pi + 1) % phrases.length;
      setTimeout(tick, 400); return;
    }
    setTimeout(tick, deleting ? 38 : 62);
  }
  setTimeout(tick, 600);
})();

// ─── THEME TOGGLE ─────────────────────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

const saved = localStorage.getItem('pm-theme');
if (saved) {
  html.setAttribute('data-theme', saved);
  themeToggle.textContent = saved === 'light' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
  localStorage.setItem('pm-theme', next);
});

// ─── MOBILE HAMBURGER ─────────────────────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  if (open) {
    mobileMenu.style.display = 'flex';
    requestAnimationFrame(() => mobileMenu.classList.add('visible'));
  } else {
    mobileMenu.classList.remove('visible');
    setTimeout(() => mobileMenu.style.display = 'none', 300);
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('visible');
    setTimeout(() => mobileMenu.style.display = 'none', 300);
  });
});

// ─── SCROLL-ACTIVE NAV ────────────────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-center a');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + id)
      );
    }
  });
}, { rootMargin: '-35% 0px -60% 0px' });

document.querySelectorAll('section[id]').forEach(s => navObserver.observe(s));

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
const btt = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  btt.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  revealObs.observe(el);
});
