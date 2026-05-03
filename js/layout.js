(function () {
  'use strict';

  // ----- Path detection -----
  // Reads its own <script src="..."> to derive how many `../` segments are
  // needed to reach the project root from the current page.
  var scriptSrc = (document.currentScript && document.currentScript.getAttribute('src')) || 'js/layout.js';
  var basePath = scriptSrc.slice(0, Math.max(0, scriptSrc.length - 'js/layout.js'.length));

  // ----- Page identifiers (set on <body>) -----
  var currentPage = (document.body.getAttribute('data-page') || '').toLowerCase();
  // Initial portfolio tab is driven by the URL hash; default to "all".
  var initialHash = (location.hash || '').replace(/^#/, '').toLowerCase();

  // ----- Site nav -----
  var navItems = [
    { id: 'home',        label: 'home',        href: 'home.html' },
    { id: 'portfolio',   label: 'portfolio',   href: 'portfolio.html' },
    { id: 'information', label: 'information', href: 'information.html' },
  ];

  // ----- Portfolio category tabs -----
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

  // All tabs land on portfolio.html with a hash; app.js handles panel switching.
  function tabHref(slug) {
    return basePath + 'portfolio.html#' + slug;
  }

  // ----- Renderers -----
  function renderHeader() {
    var nav = navItems.map(function (item) {
      var cls = item.id === currentPage ? ' class="is-active"' : '';
      return '<a href="' + basePath + item.href + '"' + cls + '>' + item.label + '</a>';
    }).join('');
    return (
      '<header class="site-header">' +
        '<div class="container site-header__inner">' +
          '<nav id="site-nav" class="site-nav" aria-label="Primary">' + nav + '</nav>' +
          '<ul class="site-social" aria-label="Social">' +
            '<li><a href="https://instagram.com/worgaa.noid" target="_blank" rel="noopener" aria-label="Instagram">' +
              '<img src="' + basePath + 'img/information/instagram.png" alt="" aria-hidden="true">' +
            '</a></li>' +
            '<li><a href="https://x.com/worgaanoid" target="_blank" rel="noopener" aria-label="Instagram">' +
            '<img src="' + basePath + 'img/information/x.png" alt="" aria-hidden="true">' +
            '</a></li>' +
            '<li><a href="mailto:nicolas.delaire28@gmail.com" aria-label="Email">' +
              '<img src="' + basePath + 'img/information/email.png" alt="" aria-hidden="true">' +
            '</a></li>' +
          '</ul>' +
          '<button type="button" class="site-nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="site-nav">' +
            '<svg class="site-nav-toggle__icon site-nav-toggle__icon--menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
            '<svg class="site-nav-toggle__icon site-nav-toggle__icon--close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
          '</button>' +
        '</div>' +
      '</header>'
    );
  }

  function renderFooter() {
    return (
      '<footer class="site-footer">' +
        '<div class="container site-footer__inner">' +
          '<span>&copy; worgaa.noid</span>' +
          '<span>made with care</span>' +
        '</div>' +
      '</footer>'
    );
  }

  function renderPortfolioTabs() {
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

  // ----- Fill slots -----
  document.querySelectorAll('[data-layout="header"]').forEach(function (el) {
    el.outerHTML = renderHeader();
  });
  document.querySelectorAll('[data-layout="footer"]').forEach(function (el) {
    el.outerHTML = renderFooter();
  });
  document.querySelectorAll('[data-layout="portfolio-tabs"]').forEach(function (el) {
    el.outerHTML = renderPortfolioTabs();
  });
})();
