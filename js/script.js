/* ============================================================
   JHOREMIL C. CABRILLOS — PORTFOLIO
   script.js | Main JavaScript
   ============================================================ */

// Mark JS as loaded immediately so CSS safety net deactivates
document.documentElement.classList.add('js-loaded');

/* ── Navigation ───────────────────────────────────────────── */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  // Highlight active page
  const current = location.pathname.split('/').pop() || 'index.html';
  links.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── Scroll Reveal ────────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

/* ── Staggered card reveal ────────────────────────────────── */
(function initStagger() {
  const cards = document.querySelectorAll('.project-card, .cert-card');

  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('reveal', 'visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.06}s`;
    card.classList.add('reveal');
    observer.observe(card);
  });
})();

/* ── Filter Buttons ───────────────────────────────────────── */
(function initFilter() {
  const bar = document.querySelector('.filter-bar');
  if (!bar) return;

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
})();

/* ── Gallery ──────────────────────────────────────────────── */
(function initGallery() {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImg = document.querySelector('.gallery-main img');
  if (!thumbs.length || !mainImg) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.querySelector('img')?.src;
      if (src) {
        mainImg.src = src;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      }
    });
  });
})();

/* ── Smooth nav background on scroll ─────────────────────── */
(function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20
      ? 'rgba(13,15,20,0.97)'
      : 'rgba(13,15,20,0.88)';
  }, { passive: true });
})();
