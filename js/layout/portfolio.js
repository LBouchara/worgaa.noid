(function () {
  'use strict';
  if (!window.__layout) return;

  var basePath = window.__layout.basePath;
  var initialHash = window.__layout.initialHash;

  var portfolioTabs = [
    { slug: 'all',                   label: 'all' },
    { slug: 'digital-illustrations', label: 'digital illustrations' },
    { slug: 'fictional-forests',    label: 'fictional forests' },
    { slug: 'posters',               label: 'posters' },
    { slug: 'monster-fossils',       label: 'monster fossils' },
    { slug: 'album-cover',           label: 'album cover' },
    { slug: 'sketchbook',            label: 'sketchbook' },
    { slug: 'photography',           label: 'photography' },
    { slug: 'custom-clothes',        label: 'custom clothes' },
    { slug: 'typography',            label: 'typography' },
  ];

  function tabHref(slug) {
    return basePath + 'portfolio.html#' + slug;
  }

  function render() {
    var defaultSlug = initialHash || 'all';
    var items = portfolioTabs.map(function (t) {
      var cls = t.slug === defaultSlug ? 'tabs__btn is-active' : 'tabs__btn';
      return '<li><a class="' + cls + '" href="' + tabHref(t.slug) + '">' + t.label + '</a></li>';
    }).join('');
    return (
      '<nav class="tabs" aria-label="Project categories">' +
        '<ul class="tabs__list">' + items + '</ul>' +
      '</nav>'
    );
  }

  window.__layout.fillSlot('[data-layout="portfolio"]', render());
})();
