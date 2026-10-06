// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('section > *, .about-card, .process-card, .project-card, .exp-card, .soft-card').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// Skill bars animate on view
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.bar i').forEach(i => { i.style.width = i.style.getPropertyValue('--w'); });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-block').forEach(b => barObs.observe(b));

// Photo fallback: hide broken images, show placeholder
[['heroImg','heroPlaceholder'],['aboutImg','aboutPlaceholder']].forEach(([imgId, phId]) => {
  const img = document.getElementById(imgId);
  const ph = document.getElementById(phId);
  const show = () => { img.style.display = 'none'; ph.style.display = 'flex'; };
  img.addEventListener('error', show);
  if (img.complete && img.naturalWidth === 0) show();
});

// Contact form -> WhatsApp
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('cfName').value.trim();
  const email = document.getElementById('cfEmail').value.trim();
  const msg = document.getElementById('cfMsg').value.trim();
  const text = `Hi Shoaib,%0A%0AMy name is ${encodeURIComponent(name)} (${encodeURIComponent(email)}).%0A%0A${encodeURIComponent(msg)}`;
  window.open(`https://wa.me/923422625439?text=${text}`, '_blank');
});

// Nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 40 ? '0 4px 20px rgba(0,0,0,.4)' : 'none';
});
