// ============================================================
// Daniel — portfolio
// nav toggle · scroll reveal · live "uptime" readout · contact form
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.textContent = open ? '×' : '≡';
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.textContent = '≡';
      })
    );
  }

  /* scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
    // safety net: if something stops an element from ever intersecting, don't leave it hidden forever
    setTimeout(() => revealEls.forEach(el => el.classList.add('in')), 2500);
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* live "uptime" readout in the status bar — counts from a fixed epoch
     so it reads like a real system status line rather than a static string */
  const upEl = document.querySelector('[data-uptime]');
  if (upEl) {
    const epoch = new Date('2024-01-01T00:00:00Z').getTime();
    const render = () => {
      const diff = Date.now() - epoch;
      const days = Math.floor(diff / 86400000);
      const hrs = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      upEl.textContent = `${days}d ${hrs}h ${mins}m`;
    };
    render();
    setInterval(render, 60000);
  }

  /* contact form -> opens the visitor's mail client with a pre-filled message */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const to = form.dataset.to || 'you@example.com';
      const subject = encodeURIComponent(`Portfolio contact — ${name || 'no name given'}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

});
