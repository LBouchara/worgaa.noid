(function () {
  'use strict';
  if (!window.__layout) return;

  function render() {
    return (
      '<footer class="site-footer">' +
        '<div class="container site-footer__inner">' +
          '<span>&copy; worgaa.noid</span>' +
          '<span>made with care</span>' +
        '</div>' +
      '</footer>'
    );
  }

  window.__layout.fillSlot('[data-layout="footer"]', render());
})();
