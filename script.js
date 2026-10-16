document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('mobile-nav-toggle');
  const nav = document.getElementById('primary-nav');
  const dropdownItems = Array.from(document.querySelectorAll('.nav-item'));

  const closeAllDropdowns = () => {
    dropdownItems.forEach((item) => {
      item.classList.remove('dropdown-open');
      const button = item.querySelector('.nav-menu-toggle');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      if (!isOpen) closeAllDropdowns();
    });
  }

  dropdownItems.forEach((item) => {
    const button = item.querySelector('.nav-menu-toggle');
    const menu = item.querySelector('.dropdown-menu');
    if (!button || !menu) return;

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const wasOpen = item.classList.contains('dropdown-open');
      closeAllDropdowns();
      if (!wasOpen) {
        item.classList.add('dropdown-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if (nav) {
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
        closeAllDropdowns();
      });
    });
  }

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeAllDropdowns();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeAllDropdowns();
      if (nav) nav.classList.remove('is-open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 981px)').matches) {
      if (nav) nav.classList.remove('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      closeAllDropdowns();
    }
  });

  const year = String(new Date().getFullYear());
  document.querySelectorAll('#current-year, #copyright-year').forEach((el) => {
    el.textContent = year;
  });
});
