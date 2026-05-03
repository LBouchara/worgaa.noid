(function () {
  'use strict';

  // Read this script's own src to derive how many `../` segments are
  // needed to reach the project root from the current page.
  var scriptSrc = (document.currentScript && document.currentScript.getAttribute('src')) || 'js/layout/base.js';
  var basePath = scriptSrc.slice(0, Math.max(0, scriptSrc.length - 'js/layout/base.js'.length));

  // Shared namespace for the rest of the layout files.
  window.__layout = {
    basePath: basePath,
    currentPage: (document.body.getAttribute('data-page') || '').toLowerCase(),
    initialHash: (location.hash || '').replace(/^#/, '').toLowerCase(),
    fillSlot: function (selector, html) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.outerHTML = html;
      });
    },
  };
})();
