(function () {
  'use strict';
  if (!window.__layout) return;

  var basePath = window.__layout.basePath;
  var currentPage = window.__layout.currentPage;

  var navItems = [
    { id: 'home',        label: 'home',        href: 'index.html' },
    { id: 'portfolio',   label: 'portfolio',   href: 'portfolio.html' },
    { id: 'information', label: 'information', href: 'information.html' },
  ];

  function render() {
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

  window.__layout.fillSlot('[data-layout="header"]', render());
})();
