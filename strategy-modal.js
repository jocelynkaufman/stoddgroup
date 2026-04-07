(function() {
  'use strict';

  var FORM_URL = 'https://app.utahinvestorhub.com/widget/survey/Kms3TYnxLwXtHW1cU1sB';
  var FORM_SCRIPT = 'https://app.utahinvestorhub.com/js/form_embed.js';
  var formScriptLoaded = false;
  var iframeLoaded = false;
  var isOpen = false;
  var scrollPos = 0;

  // Create overlay
  var overlay = document.createElement('div');
  overlay.id = 'strategy-modal-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Schedule a Free Strategy Call');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:1rem;background:rgba(0,0,0,0);transition:background 0.3s ease;overflow-y:auto;';

  // Inject responsive style for hiding image on mobile
  var modalStyle = document.createElement('style');
  modalStyle.textContent = '@media(max-width:767px){#strategy-modal-image{display:none!important}#strategy-modal-body{grid-template-columns:1fr!important}#strategy-modal-mobile-header{display:block!important}#strategy-modal-close{background:rgba(0,0,0,0.5)!important}}';
  document.head.appendChild(modalStyle);

  overlay.innerHTML =
    '<div id="strategy-modal-content" style="' +
      'background:#fff;' +
      'border-radius:1rem;' +
      'width:100%;' +
      'max-width:920px;' +
      'max-height:90vh;' +
      'overflow:hidden;' +
      'box-shadow:0 25px 50px rgba(0,0,0,0.25);' +
      'transform:scale(0.95) translateY(10px);' +
      'opacity:0;' +
      'transition:transform 0.3s ease,opacity 0.3s ease;' +
      'position:relative;' +
    '">' +
      // Green bar at top
      '<div style="height:10px;background:var(--color-brand-dark-green,#395659);border-radius:1rem 1rem 0 0;"></div>' +
      // Close button (absolute positioned)
      '<button id="strategy-modal-close" aria-label="Close modal" style="' +
        'position:absolute;' +
        'top:0.75rem;' +
        'right:0.75rem;' +
        'z-index:10;' +
        'background:rgba(0,0,0,0.3);' +
        'border:none;' +
        'color:#fff;' +
        'font-size:1.5rem;' +
        'cursor:pointer;' +
        'width:2rem;' +
        'height:2rem;' +
        'border-radius:50%;' +
        'display:flex;' +
        'align-items:center;' +
        'justify-content:center;' +
        'line-height:1;' +
        'opacity:0.8;' +
        'transition:opacity 0.2s,background 0.2s;' +
      '">&times;</button>' +
      // Two-column body
      '<div id="strategy-modal-body" style="' +
        'display:grid;' +
        'grid-template-columns:2fr 3fr;' +
        'min-height:500px;' +
      '">' +
        // Left: Image column
        '<div id="strategy-modal-image" style="' +
          'background-image:url(/stoddgroup/utah-houses.jpg);' +
          'background-size:cover;' +
          'background-position:center;' +
          'position:relative;' +
          'display:flex;' +
          'flex-direction:column;' +
          'justify-content:flex-start;' +
        '">' +
          // Dark overlay gradient (top to bottom)
          '<div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(57,86,89,0.9) 0%,rgba(57,86,89,0.3) 50%,rgba(57,86,89,0.05) 100%);"></div>' +
          // Text over image (at top)
          '<div style="position:relative;padding:2rem;">' +
            '<h2 style="color:#fff;font-size:1.5rem;font-weight:700;margin:0 0 0.5rem;font-family:var(--font-heading,DM Sans,system-ui,sans-serif);line-height:1.2;">Schedule a Free Strategy Call</h2>' +
            '<p style="color:var(--color-brand-light-green,#bad9d9);font-size:0.875rem;margin:0;font-family:var(--font-body,Inter,system-ui,sans-serif);line-height:1.5;">30 minutes with a local Utah real estate expert. No pressure, just honest guidance.</p>' +
          '</div>' +
        '</div>' +
        // Right: Form column
        '<div style="overflow-y:auto;max-height:90vh;">' +
          // Mobile-only header (visible when image is hidden)
          '<div id="strategy-modal-mobile-header" style="' +
            'background:var(--color-brand-dark-green,#395659);' +
            'padding:1.25rem 1.5rem;' +
            'display:none;' +
          '">' +
            '<h2 style="color:#fff;font-size:1.25rem;font-weight:700;margin:0;font-family:var(--font-heading,DM Sans,system-ui,sans-serif);">Schedule a Free Strategy Call</h2>' +
            '<p style="color:var(--color-brand-light-green,#bad9d9);font-size:0.8rem;margin:0.25rem 0 0;">30 minutes. No pressure. Just honest guidance.</p>' +
          '</div>' +
          // Orange accent bar
          '<div style="height:3px;background:var(--color-brand-orange,#E8A87C);"></div>' +
          // Form
          '<div id="strategy-modal-form" style="padding:0;min-height:400px;display:flex;align-items:center;justify-content:center;">' +
            '<p style="color:#999;font-size:0.875rem;">Loading form...</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  var modalContent = document.getElementById('strategy-modal-content');
  var closeBtn = document.getElementById('strategy-modal-close');
  var formContainer = document.getElementById('strategy-modal-form');

  // Hover effect on close button
  closeBtn.addEventListener('mouseenter', function() { closeBtn.style.opacity = '1'; closeBtn.style.background = 'rgba(0,0,0,0.5)'; });
  closeBtn.addEventListener('mouseleave', function() { closeBtn.style.opacity = '0.8'; closeBtn.style.background = 'rgba(0,0,0,0.3)'; });

  function loadIframe() {
    if (iframeLoaded) return;
    iframeLoaded = true;
    formContainer.innerHTML =
      '<iframe src="' + FORM_URL + '" ' +
      'style="border:none;width:100%;min-height:500px;" ' +
      'scrolling="no" ' +
      'id="Kms3TYnxLwXtHW1cU1sB" ' +
      'title="Realtor Interest Form - stoddgroup.com">' +
      '</iframe>';
  }

  function loadFormScript() {
    if (formScriptLoaded) return;
    formScriptLoaded = true;
    var s = document.createElement('script');
    s.src = FORM_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }

  function lockScroll() {
    scrollPos = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + scrollPos + 'px';
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollPos);
  }

  function openModal() {
    if (isOpen) return;
    isOpen = true;

    // Lazy-load iframe and script on first open
    loadIframe();
    loadFormScript();

    // Close mobile menu if open
    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }

    overlay.style.display = 'flex';
    overlay.setAttribute('aria-hidden', 'false');
    lockScroll();

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        overlay.style.background = 'rgba(0,0,0,0.5)';
        modalContent.style.transform = 'scale(1) translateY(0)';
        modalContent.style.opacity = '1';
      });
    });

    closeBtn.focus();
  }

  function closeModal() {
    if (!isOpen) return;
    isOpen = false;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.style.background = 'rgba(0,0,0,0)';
    modalContent.style.transform = 'scale(0.95) translateY(10px)';
    modalContent.style.opacity = '0';
    unlockScroll();

    setTimeout(function() {
      overlay.style.display = 'none';
    }, 300);
  }

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Backdrop click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });

  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isOpen) closeModal();
  });

  // CTA interception via event delegation
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var text = (link.textContent || '').trim().toLowerCase();

    // Must link to contact page or #Googleform
    var isContactLink = href.indexOf('/contact') !== -1 || href === '#Googleform';
    if (!isContactLink) return;

    // Must contain CTA-relevant text
    var ctaPatterns = ['strategy call', 'schedule a call', "let's connect", 'book free', 'book a free'];
    var isCTA = false;
    for (var i = 0; i < ctaPatterns.length; i++) {
      if (text.indexOf(ctaPatterns[i]) !== -1) {
        isCTA = true;
        break;
      }
    }

    if (isCTA) {
      e.preventDefault();
      openModal();
    }
  });

  // Expose globally
  window.openStrategyModal = openModal;
  window.closeStrategyModal = closeModal;
})();
