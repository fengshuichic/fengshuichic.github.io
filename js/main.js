/* ==========================================================================
   Feng Shui Chic — Main JS
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- Mobile Navigation ---------- */
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navList.classList.toggle('open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });

    // Close menu when a link is clicked
    navList.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        navList.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Header scroll shadow ---------- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---------- Form Validation + AJAX Submit ---------- */
  document.querySelectorAll('form[data-validate]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      form.querySelectorAll('[required]').forEach(function (field) {
        var value = field.value.trim();
        var valid = true;

        if (!value) {
          valid = false;
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          valid = false;
        }

        field.classList.toggle('invalid', !valid);
        if (!valid) isValid = false;
      });

      if (!isValid) {
        var firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // AJAX submit to Formspree — never shows their branded page
      var btn = form.querySelector('[type="submit"]');
      var btnText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          window.location.href = 'thank-you.html';
        } else {
          btn.disabled = false;
          btn.textContent = btnText;
          alert('Something went wrong. Please try again or reach us via the Contact page.');
        }
      }).catch(function () {
        btn.disabled = false;
        btn.textContent = btnText;
        alert('Connection error. Please check your internet and try again.');
      });
    });

    // Clear validation on input
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('invalid');
      });
    });
  });

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
