(function () {
  'use strict';

  // Layout slots (header, footer, portfolio tabs) are filled by js/layout.js,
  // which loads before this script. This file only handles interactive
  // behaviour: page-header parallax, burger menu, portfolio tab/panel
  // switching, back-to-top, portfolio tab scroll indicators, lightbox.

  // Page-header animation now lives in CSS (home.css @keyframes hero-scroll-*)
  // — JS no longer touches the layers.

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

  // ----- Portfolio tab/panel switching (hash-routed) -----
  (function setupPortfolioTabs() {
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

  // ----- Back to top button -----
  var backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  document.body.appendChild(backBtn);

  var threshold = 80;
  var ticking = false;
  var updateBackBtn = function () {
    backBtn.classList.toggle('is-visible', window.pageYOffset > threshold);
    ticking = false;
  };

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateBackBtn);
      ticking = true;
    }
  }, { passive: true });

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  updateBackBtn();

  // ----- Tabs scroll indicators -----
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

  // ----- Lightbox / carousel -----
  var grids = document.querySelectorAll('.image-grid');
  if (!grids.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML =
    '<button type="button" class="lightbox__close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
    '</button>' +
    '<button type="button" class="lightbox__nav lightbox__prev" aria-label="Previous">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>' +
    '</button>' +
    '<button type="button" class="lightbox__nav lightbox__next" aria-label="Next">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>' +
    '</button>' +
    '<figure class="lightbox__figure">' +
      '<img class="lightbox__img" src="" alt="">' +
      '<figcaption class="lightbox__caption"></figcaption>' +
    '</figure>';
  document.body.appendChild(box);

  var imgEl = box.querySelector('.lightbox__img');
  var capEl = box.querySelector('.lightbox__caption');
  var prevBtn = box.querySelector('.lightbox__prev');
  var nextBtn = box.querySelector('.lightbox__next');
  var closeBtn = box.querySelector('.lightbox__close');

  var items = [];
  var index = 0;
  var lastTrigger = null;

  var escape = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  var show = function (i) {
    if (!items.length) return;
    index = (i + items.length) % items.length;
    var it = items[index];
    imgEl.src = it.src;
    imgEl.alt = it.title || '';
    var parts = [];
    if (it.title) parts.push('<span class="work-title">' + escape(it.title) + '</span>');
    if (it.format) parts.push('<span class="work-format">' + escape(it.format) + '</span>');
    if (it.date) parts.push('<span class="work-date">' + escape(it.date) + '</span>');
    capEl.innerHTML = parts.join('');
    var multi = items.length > 1;
    prevBtn.style.display = multi ? '' : 'none';
    nextBtn.style.display = multi ? '' : 'none';
  };

  var open = function () {
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  };

  var close = function () {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    imgEl.removeAttribute('src');
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  };

  var buildItems = function (grid) {
    return Array.prototype.map.call(grid.querySelectorAll('figure'), function (fig) {
      var img = fig.querySelector('img');
      var t = fig.querySelector('.work-title');
      var f = fig.querySelector('.work-format');
      var d = fig.querySelector('.work-date');
      return {
        src: img ? img.getAttribute('src') : '',
        title: t ? t.textContent.trim() : '',
        format: f ? f.textContent.trim() : '',
        date: d ? d.textContent.trim() : '',
      };
    });
  };

  grids.forEach(function (grid) {
    var media = grid.querySelectorAll('.image-grid__media');
    media.forEach(function (m, i) {
      m.addEventListener('click', function () {
        items = buildItems(grid);
        lastTrigger = m;
        show(i);
        open();
      });
    });
  });

  prevBtn.addEventListener('click', function () { show(index - 1); });
  nextBtn.addEventListener('click', function () { show(index + 1); });
  closeBtn.addEventListener('click', close);

  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });
})();
