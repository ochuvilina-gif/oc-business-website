// Nav scrolled state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const navBurger = document.getElementById('navBurger');
const navOverlay = document.getElementById('navOverlay');

function closeMobileMenu() {
  navBurger.classList.remove('open');
  navOverlay.classList.remove('open');
  navOverlay.setAttribute('aria-hidden', 'true');
  navBurger.setAttribute('aria-expanded', 'false');
  navBurger.setAttribute('aria-label', 'Menü öffnen');
  document.body.style.overflow = '';
}

navBurger.addEventListener('click', () => {
  const isOpen = navBurger.classList.toggle('open');
  navOverlay.classList.toggle('open', isOpen);
  navOverlay.setAttribute('aria-hidden', String(!isOpen));
  navBurger.setAttribute('aria-expanded', String(isOpen));
  navBurger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.overlay-link, .overlay-cta').forEach(el => {
  el.addEventListener('click', closeMobileMenu);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Scroll reveal via IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Contact form — submits to mailto: action; opens the user's email client
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = 'E-Mail-Programm wird geöffnet …';
    btn.disabled = true;
  });
}
