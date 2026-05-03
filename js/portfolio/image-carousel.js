(function () {
  'use strict';

  var grids = document.querySelectorAll('.image-grid');
  if (!grids.length) return;

  var box = document.createElement('div');
  box.className = 'image-carousel';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML =
    '<button type="button" class="image-carousel__close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
    '</button>' +
    '<button type="button" class="image-carousel__nav image-carousel__prev" aria-label="Previous">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>' +
    '</button>' +
    '<button type="button" class="image-carousel__nav image-carousel__next" aria-label="Next">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>' +
    '</button>' +
    '<figure class="image-carousel__figure">' +
      '<img class="image-carousel__img" src="" alt="">' +
      '<figcaption class="image-carousel__caption"></figcaption>' +
    '</figure>';
  document.body.appendChild(box);

  var imgEl = box.querySelector('.image-carousel__img');
  var capEl = box.querySelector('.image-carousel__caption');
  var prevBtn = box.querySelector('.image-carousel__prev');
  var nextBtn = box.querySelector('.image-carousel__next');
  var closeBtn = box.querySelector('.image-carousel__close');

  var items = [];
  var index = 0;
  var lastTrigger = null;

  function escape(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function show(i) {
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
  }

  function open() {
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.classList.add('image-carousel-open');
    closeBtn.focus();
  }

  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('image-carousel-open');
    imgEl.removeAttribute('src');
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  }

  function buildItems(grid) {
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
  }

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
