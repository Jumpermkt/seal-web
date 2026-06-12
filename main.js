/* ============ SEAL WEB — interacciones ============ */

/* ---- Nav: cambia de estado al pasar el hero ---- */
const nav = document.getElementById('nav');
const heroSlider = document.getElementById('heroSlider');

function updateNav(){
  if(!nav) return;
  if(heroSlider){
    const past = window.scrollY > heroSlider.offsetHeight - 80;
    nav.classList.toggle('over-hero', !past);
  } else {
    nav.classList.remove('over-hero');
  }
}
window.addEventListener('scroll', updateNav, {passive:true});
updateNav();

/* ---- Hero slider: crossfade automático cada 5s ---- */
(function(){
  if(!heroSlider) return;
  const slides = heroSlider.querySelectorAll('.slide');
  if(slides.length < 2) return;
  let i = 0;
  setInterval(()=>{
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
    const v = slides[i].querySelector('video');
    if(v){ v.currentTime = 0; v.play().catch(()=>{}); }
  }, 5000);
})();

/* ---- Galerías por servicio ---- */
const GALERIAS = {
  gal1: [
    'gal1_jd.jpg',
    'gal1_federada.jpg',
    'gal1_macro.jpg',
    'gal1_afa.jpg'
  ],
  gal2: [
    'gal2_soja.jpg',
    'card2.jpg'
  ],
  gal3: [
    'gal3_macro.jpg',
    'card3.jpg'
  ],
  gal4: [
    'card4.jpg',
    'row4.jpg'
  ]
};

const lightbox = document.getElementById('lightbox');
const lbStage  = document.getElementById('lbStage');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');
let lbImgs = [], lbIndex = 0;

function openGallery(key){
  const srcs = GALERIAS[key];
  if(!srcs || !srcs.length) return;
  lbStage.innerHTML = '';
  lbImgs = srcs.map((s, idx)=>{
    const im = new Image();
    im.src = s;
    if(idx === 0) im.classList.add('active');
    lbStage.appendChild(im);
    return im;
  });
  lbIndex = 0;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeGallery(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function lbGo(dir){
  if(!lbImgs.length) return;
  lbImgs[lbIndex].classList.remove('active');
  lbIndex = (lbIndex + dir + lbImgs.length) % lbImgs.length;
  lbImgs[lbIndex].classList.add('active');
}

document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click', ()=> openGallery(card.dataset.gallery));
});
if(lbPrev) lbPrev.addEventListener('click', e=>{ e.stopPropagation(); lbGo(-1); });
if(lbNext) lbNext.addEventListener('click', e=>{ e.stopPropagation(); lbGo(1); });
if(lightbox) lightbox.addEventListener('click', e=>{
  if(e.target === lightbox) closeGallery();
});
document.addEventListener('keydown', e=>{
  if(!lightbox || !lightbox.classList.contains('open')) return;
  if(e.key === 'Escape') closeGallery();
  if(e.key === 'ArrowRight') lbGo(1);
  if(e.key === 'ArrowLeft') lbGo(-1);
});

/* ---- Más servicios: en el prototipo de Figma este botón no tiene
       interacción activa; queda igual que en el proto. ---- */
const btnMas = document.getElementById('btnMasServicios');
if(btnMas) btnMas.addEventListener('click', ()=>{ /* sin acción, como el proto */ });

/* ---- Menú mobile ---- */
const navToggle = document.getElementById('navToggle');
if(navToggle && nav){
  navToggle.addEventListener('click', ()=> nav.classList.toggle('menu-open'));
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', ()=> nav.classList.remove('menu-open'));
  });
}
