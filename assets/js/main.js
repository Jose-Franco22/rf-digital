(function () {
  var root = document.documentElement;

  // Spanish string if the page is in Spanish, otherwise the English fallback.
  function t(key, en) {
    return root.lang === 'es' && window.RF_ES && window.RF_ES[key] ? window.RF_ES[key] : en;
  }

  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    var closeMenu = function () {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    };
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  // Header shadow once the page scrolls
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Fade sections in as they scroll into view
  if ('IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.section-head, .card, .why, .steps li, .work-card, .price-card, .menu-pricing, .about-grid > *, .contact-grid > *');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  // Contact form: sent through FormSubmit (free, no account) to the RF Digital inbox.
  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/rfdigitaltx@gmail.com';
  var form = document.getElementById('contact-form');
  if (form) {
    var err = document.getElementById('form-error');
    var status = document.getElementById('form-status');
    var submit = form.querySelector('button[type="submit"]');

    var showStatus = function (kind, html) {
      status.className = 'form-status ' + kind;
      status.innerHTML = html;
      status.hidden = false;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = form.elements;
      var missing = [d.name, d.phone].filter(function (f) { return !f.value.trim(); });
      [d.name, d.phone].forEach(function (f) { f.setAttribute('aria-invalid', String(missing.indexOf(f) > -1)); });
      if (missing.length) { err.hidden = false; missing[0].focus(); return; }
      err.hidden = true;
      status.hidden = true;

      // Bots fill the hidden field; people never see it.
      if (d._honey.value) { showStatus('ok', t('form.ok', 'Thanks! Your message was sent.')); form.reset(); return; }

      var payload = {
        name: d.name.value.trim(),
        business: d.business.value.trim(),
        phone: d.phone.value.trim(),
        interested_in: d.need.value,
        message: d.message.value.trim(),
        _subject: 'Website inquiry from ' + d.name.value.trim(),
        _template: 'table'
      };

      var label = submit.innerHTML;
      submit.disabled = true;
      submit.textContent = t('form.sending', 'Sending…');

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
        .then(function (r) {
          if (!r.ok || String(r.data.success) !== 'true') throw new Error(r.data.message || 'Send failed');
          form.reset();
          showStatus('ok', t('form.ok', "Thanks! Your message was sent. I'll get back to you soon."));
        })
        .catch(function () {
          var body = [
            'Name: ' + payload.name, 'Business: ' + payload.business, 'Phone: ' + payload.phone,
            'Interested in: ' + payload.interested_in, '', payload.message
          ].join('\n');
          var mailto = 'mailto:rfdigitaltx@gmail.com?subject=' + encodeURIComponent(payload._subject) + '&body=' + encodeURIComponent(body);
          showStatus('fail', t('form.fail', 'Sorry, that didn\'t go through. Please call or text <a href="tel:+19568442891">(956) 844-2891</a>, or <a class="js-mailto">send it by email</a>.'));
          var link = status.querySelector('.js-mailto');
          if (link) link.href = mailto;
        })
        .then(function () { submit.disabled = false; submit.innerHTML = label; });
    });
  }

  // Light/dark theme. Follows the device until the visitor picks one, then remembers it.
  var themeBtn = document.querySelector('.theme-toggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(th) {
    root.setAttribute('data-theme', th);
    if (themeMeta) themeMeta.content = th === 'dark' ? '#0B1A1F' : '#FFFFFF';
    if (themeBtn) themeBtn.setAttribute('aria-label', th === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('rf-theme', next); } catch (e) {}
    });
  }
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onSystemChange = function (e) {
    var saved = null;
    try { saved = localStorage.getItem('rf-theme'); } catch (er) {}
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  };
  if (mq.addEventListener) mq.addEventListener('change', onSystemChange); else mq.addListener(onSystemChange);

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
