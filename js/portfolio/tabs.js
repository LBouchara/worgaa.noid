(function () {
  'use strict';

  // ----- Panel switching (hash-routed) -----
  (function setupPanelSwitching() {
    var tabs = document.querySelectorAll('.tabs__btn');
    var panels = document.querySelectorAll('.portfolio-group');
    if (!tabs.length || !panels.length) return;

    function activate(slug) {
      tabs.forEach(function (btn) {
        var href = btn.getAttribute('href') || '';
        var btnSlug = (href.split('#')[1] || '').toLowerCase();
        btn.classList.toggle('is-active', btnSlug === slug);
      });
      if (slug === 'all') {
        panels.forEach(function (p) { p.classList.add('is-active'); });
      } else {
        panels.forEach(function (p) {
          p.classList.toggle('is-active', p.id === slug);
        });
      }
    }

    function fromHash() {
      var slug = (location.hash || '').replace(/^#/, '').toLowerCase();
      activate(slug || 'all');
    }

    tabs.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var href = btn.getAttribute('href') || '';
        var slug = (href.split('#')[1] || '').toLowerCase();
        if (history.replaceState) {
          history.replaceState(null, '', '#' + slug);
        } else {
          location.hash = slug;
        }
        activate(slug);
      });
    });

    window.addEventListener('hashchange', fromHash);
    fromHash();
  })();

  // ----- Scroll indicators (prev/next buttons that fade in when the tab
  //       strip overflows horizontally) -----
  (function setupScrollIndicators() {
    document.querySelectorAll('.tabs__list').forEach(function (list) {
      var parent = list.parentNode;
      if (!parent || !parent.classList.contains('tabs')) return;

      var prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'tabs__scroll tabs__scroll--prev';
      prev.setAttribute('aria-label', 'Scroll tabs left');
      prev.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>';

      var next = document.createElement('button');
      next.type = 'button';
      next.className = 'tabs__scroll tabs__scroll--next';
      next.setAttribute('aria-label', 'Scroll tabs right');
      next.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

      parent.appendChild(prev);
      parent.appendChild(next);

      var sync = function () {
        var max = list.scrollWidth - list.clientWidth;
        var atStart = list.scrollLeft <= 1;
        var atEnd = list.scrollLeft >= max - 1;
        prev.classList.toggle('is-visible', max > 0 && !atStart);
        next.classList.toggle('is-visible', max > 0 && !atEnd);
      };

      prev.addEventListener('click', function () {
        list.scrollBy({ left: -list.clientWidth * 0.8, behavior: 'smooth' });
      });
      next.addEventListener('click', function () {
        list.scrollBy({ left: list.clientWidth * 0.8, behavior: 'smooth' });
      });

      list.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    });
  })();
})();
