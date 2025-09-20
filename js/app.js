// ===== CONFIG (remplacez par vos infos) =====
const COMPANY = {
  phoneIntl: "+225000000000", // ex: +2250700000000
  phoneDisplay: "+225 07 00 00 00 00",
  email: "contact@elohim-communication.com",
  whatsapp: "+225000000000" // format international, sans espaces
};

// ===== NAV BURGER =====
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger?.addEventListener('click', ()=>{
  const isOpen = menu.style.display === 'flex';
  menu.style.display = isOpen ? 'none' : 'flex';
  burger.setAttribute('aria-expanded', String(!isOpen));
});

// ===== PORTFOLIO FILTER =====
const filters = document.getElementById('filters');
const gallery = document.getElementById('gallery');
filters?.addEventListener('click', (e)=>{
  if(e.target.tagName !== 'BUTTON') return;
  const f = e.target.dataset.filter;
  [...filters.children].forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');
  [...gallery.children].forEach(it=>{
    it.style.display = (f==='all' || it.dataset.cat===f) ? '' : 'none';
  });
});

// ===== LIGHTBOX =====
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbClose = document.getElementById('lbClose');
gallery?.addEventListener('click', (e)=>{
  const item = e.target.closest('.item');
  if(!item) return;
  const img = item.querySelector('img');
  lbImg.src = img.src;
  lb.classList.add('open');
});
lbClose?.addEventListener('click', ()=> lb.classList.remove('open'));
lb?.addEventListener('click', (e)=>{ if(e.target===lb) lb.classList.remove('open'); });
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') lb?.classList.remove('open'); });

// ===== CONTACT LINKS & YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();
const phoneLink = document.getElementById('phoneLink');
const mailLink = document.getElementById('mailLink');
const waLink = document.getElementById('waLink');
if (phoneLink && mailLink && waLink) {
  phoneLink.href = `tel:${COMPANY.phoneIntl}`;
  phoneLink.textContent = COMPANY.phoneDisplay;
  mailLink.href = `mailto:${COMPANY.email}`;
  mailLink.textContent = COMPANY.email;
  waLink.href = `https://wa.me/${COMPANY.whatsapp.replace(/[^\d+]/g,'')}`;
}

// ===== FORM (démo côté client) =====
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if(!data.name || !data.email){
    msg.style.color = getComputedStyle(document.documentElement).getPropertyValue('--danger');
    msg.textContent = "Merci de renseigner au moins votre nom et votre email.";
    return;
  }
  const body = encodeURIComponent(`Nom: ${data.name}\nEmail: ${data.email}\nTéléphone: ${data.phone||''}\nService: ${data.service||''}\nMessage: ${data.message||''}`);
  window.location.href = `mailto:${COMPANY.email}?subject=Demande de devis – ${encodeURIComponent(data.name)}&body=${body}`;
  msg.style.color = '#9fb0c9';
  msg.textContent = "Merci ! Votre logiciel de messagerie va s'ouvrir pour finaliser l'envoi.";
  form.reset();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const id = this.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
    }
  })
})