(function () {
  // Mobile menu
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('nav');
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // Header shadow once the page scrolls
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  // Contact form: no server yet, so build an email the visitor sends from their own app.
  var form = document.getElementById('contact-form');
  var err = document.getElementById('form-error');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name, phone = form.elements.phone;
    var missing = [name, phone].filter(function (f) { return !f.value.trim(); });
    [name, phone].forEach(function (f) { f.setAttribute('aria-invalid', String(missing.indexOf(f) > -1)); });
    if (missing.length) { err.hidden = false; missing[0].focus(); return; }
    err.hidden = true;

    var d = form.elements;
    var body = [
      'Name: ' + d.name.value.trim(),
      'Business: ' + d.business.value.trim(),
      'Phone: ' + d.phone.value.trim(),
      'Interested in: ' + d.need.value,
      '',
      d.message.value.trim()
    ].join('\n');
    var subject = 'Website inquiry from ' + d.name.value.trim();
    window.location.href = 'mailto:rfdigitaltx@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  // Light/dark theme. Follows the device until the visitor picks one, then remembers it.
  var root = document.documentElement;
  var themeBtn = document.querySelector('.theme-toggle');
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    themeMeta.content = t === 'dark' ? '#0B1A1F' : '#FFFFFF';
    themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  applyTheme(root.getAttribute('data-theme') || 'light');
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('rf-theme', next); } catch (e) {}
  });
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onSystemChange = function (e) {
    var saved = null;
    try { saved = localStorage.getItem('rf-theme'); } catch (err) {}
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  };
  if (mq.addEventListener) mq.addEventListener('change', onSystemChange); else mq.addListener(onSystemChange);

  document.getElementById('year').textContent = new Date().getFullYear();
})();
