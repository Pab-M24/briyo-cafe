// Fade-in al scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in-up').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Navbar sticky shadow
window.addEventListener('scroll', () => {
  document.querySelector('nav#navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

if (burger && navMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMenu.classList.toggle('open');
  });

  burger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      burger.click();
    }
  });

  // Cierra el menu al hacer click en un link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navMenu.classList.remove('open');
    });
  });
}

// Sistema de tabs (index.html)
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));

      document.querySelectorAll('.tab-panel').forEach(p => {
        p.style.opacity = '0';
        setTimeout(() => { p.hidden = true; }, 200);
      });

      btn.classList.add('active');
      const target = document.querySelector(btn.dataset.target);

      setTimeout(() => {
        target.hidden = false;
        requestAnimationFrame(() => { target.style.opacity = '1'; });
      }, 200);
    });
  });
}

// Menu nav activo al hacer scroll (menu.html)
const menuNavLinks = document.querySelectorAll('.menu-nav-link');
if (menuNavLinks.length > 0) {
  const sections = document.querySelectorAll('.menu-section');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        menuNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  // Scroll suave al hacer click en nav del menu
  menuNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = 140; // navbar + menu-nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}
