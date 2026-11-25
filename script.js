'use strict';

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Deschide meniul');
  mobileMenu.classList.remove('open');
  mobileMenu.inert = true;
  document.body.classList.remove('menu-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  if (menuButton.getAttribute('aria-expanded') === 'true') return closeMenu();
  mobileMenu.inert = false;
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Închide meniul');
  mobileMenu.classList.add('open');
  document.body.classList.add('menu-open');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') closeMenu(true);
  if (event.key === 'Tab') {
    const links = [...mobileMenu.querySelectorAll('a')];
    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault(); links.at(-1).focus();
    } else if (!event.shiftKey && document.activeElement === links.at(-1)) {
      event.preventDefault(); menuButton.focus();
    }
  }
});
window.matchMedia('(min-width: 801px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});

const tabs = [...document.querySelectorAll('.program-tab')];
const programDialog = document.querySelector('#program-dialog');
function openProgram(card) {
  const details = document.getElementById('panel-' + card.dataset.program);
  document.querySelector('#program-dialog-content').replaceChildren(
    details.querySelector('.program-detail-copy').cloneNode(true),
    details.querySelector('.program-detail-actions').cloneNode(true)
  );
  document.querySelector('#program-dialog-title').textContent = card.getAttribute('aria-label');
  document.querySelector('#program-dialog-image').src = card.querySelector('.program-card-image').getAttribute('src');
  card.setAttribute('aria-expanded', 'true');
  document.body.classList.add('program-modal-open');
  programDialog.showModal();
}
document.querySelector('#close-program').addEventListener('click', () => programDialog.close());
programDialog.addEventListener('close', () => {
  document.body.classList.remove('program-modal-open');
  tabs.forEach(card => card.setAttribute('aria-expanded', 'false'));
});
programDialog.addEventListener('click', event => {
  const bounds = programDialog.getBoundingClientRect();
  if (event.target === programDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) programDialog.close();
});
tabs.forEach((tab,index) => {
  tab.addEventListener('click', () => openProgram(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = tabs[(index + 1) % tabs.length];
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === 'Home') next = tabs[0];
    if (event.key === 'End') next = tabs.at(-1);
    if (next) { event.preventDefault(); next.focus(); next.scrollIntoView({block:'nearest',inline:'center',behavior:'auto'}); }
  });
});
const cardMotion = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
tabs.forEach(tab => {
  const surface = tab.querySelector('.program-card-surface');
  tab.addEventListener('pointermove', event => {
    if (!surface || !cardMotion.matches) return;
    const bounds = tab.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
    surface.style.setProperty('--tilt-x', `${(0.5 - y) * 8}deg`);
    surface.style.setProperty('--tilt-y', `${(x - 0.5) * 10}deg`);
    surface.style.setProperty('--glow-x', `${x * 100}%`);
    surface.style.setProperty('--glow-y', `${y * 100}%`);
  });
  tab.addEventListener('pointerleave', () => {
    if (!surface) return;
    ['--tilt-x','--tilt-y','--glow-x','--glow-y'].forEach(property => surface.style.removeProperty(property));
  });
});
document.addEventListener('click', event => {
  const link = event.target.closest('.program-contact');
  if (!link) return;
  document.querySelector('#goal').value = link.dataset.goal;
  if (programDialog.open) programDialog.close();
});

const form = document.querySelector('#contact-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const goal = document.querySelector('#goal').value;
  const details = document.querySelector('#message').value.trim();
  const message = `Salut, Mădălin! Aș vrea să discutăm despre antrenament. Obiectivul meu: ${goal}.${details ? '\n\nDespre mine: ' + details : ''}\n\nÎmi poți spune ce opțiuni și disponibilitate ai?`;
  window.open(`https://wa.me/40725333024?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

const privacyDialog = document.querySelector('#privacy-dialog');
document.querySelector('#open-privacy').addEventListener('click', () => privacyDialog.showModal());
document.querySelector('#close-privacy').addEventListener('click', () => privacyDialog.close());
privacyDialog.addEventListener('click', event => {
  const bounds = privacyDialog.getBoundingClientRect();
  if (event.target === privacyDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) privacyDialog.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: .05, rootMargin: '0px 0px 15px 0px' });
  document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  document.body.classList.add('motion-ready');

  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navLinks.forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -50% 0px', threshold: 0 });
  document.querySelectorAll('#despre, #programe, #metoda, #contact').forEach(section => sectionObserver.observe(section));
}
