/* ═══════════════════════════════════════════════════════════════
   HEARTBEAT SWING & BLUES 2027 — main.js
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── STICKY HEADER SCROLL EFFECT ─────────────────────────────
  const header = document.getElementById('site-header');

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });


  // ─── ACTIVE NAV LINK ON SCROLL ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });


  // ─── HAMBURGER MENU ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('nav-open');
    hamburger.classList.toggle('is-open');
  });

  // Close nav on link click (mobile)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('nav-open');
      hamburger.classList.remove('is-open');
    });
  });


  // ─── SCHEDULE TABS ───────────────────────────────────────────
  const tabs     = document.querySelectorAll('.schedule-tab');
  const days     = document.querySelectorAll('.schedule-day');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetDay = tab.dataset.day;

      tabs.forEach(t => t.classList.remove('active'));
      days.forEach(d => d.classList.remove('active'));

      tab.classList.add('active');
      document.querySelector(`.schedule-day[data-day="${targetDay}"]`).classList.add('active');
    });
  });


  // ─── LANGUAGE SELECTOR ───────────────────────────────────────
  const langBtns = document.querySelectorAll('.lang-btn');

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // TODO: implement i18n when translations are ready
      // const lang = btn.dataset.lang;
    });
  });


  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ──────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = header.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  // ─── SCROLL-TRIGGERED FADE IN ────────────────────────────────
  const fadeEls = document.querySelectorAll(
    '.ticket-card, .pillar, .artist-card, .schedule-event, .comp-card, .highlight-item'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Staggered delay based on order
          const delay = (entry.target.dataset.index || 0) * 60;
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach((el, i) => {
    el.dataset.index = i % 8; // reset counter every 8 items
    el.classList.add('fade-init');
    observer.observe(el);
  });

});
