(function () {
  'use strict';

  // App-wide widgets — every page gets these. Page-specific behaviour
  // (portfolio tabs, image-carousel, etc.) lives under js/portfolio/.

  // ----- Burger menu (mobile) -----
  (function setupNavToggle() {
    var toggle = document.querySelector('.site-nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Close when a nav link is tapped (so the destination page isn't covered
    // by the overlay during the brief moment before navigation).
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });

    // Esc closes the drawer
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
      }
    });
  })();

  // ----- Back to top button -----
  (function setupBackToTop() {
    var backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label', 'Back to top');
    backBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
    document.body.appendChild(backBtn);

    var threshold = 80;
    var ticking = false;
    var update = function () {
      backBtn.classList.toggle('is-visible', window.pageYOffset > threshold);
      ticking = false;
    };

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    update();
  })();
})();
