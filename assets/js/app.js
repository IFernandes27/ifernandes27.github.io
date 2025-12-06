// i18n dictionary
const dict = {
  pt: {
    'nav.about':'Sobre','nav.projects':'Projetos','nav.experience':'Experiência','nav.contact':'Contacto',
    'nav.cv':'Baixar CV',
    'footer':'Feito com HTML + CSS + JS.',
    'home.role':'Desenvolvedor Web & Sistemas de Informação',
    'home.title':'Crio aplicações seguras e rápidas — PHP, Java e dados.',
    'home.lead':'Do conceito ao deploy: código limpo, integração com base de dados e métricas acionáveis.',
    'home.cta.projects':'Ver projetos','home.cta.contact':'Falar comigo',
    'home.card.title':'O que entrego','home.card.1':'APIs e back-ends estáveis (PHP/MySQL)','home.card.2':'UI responsiva e acessível','home.card.3':'Dashboards e insights (Power BI)',
    'about.title':'Sobre mim','about.lead':'Licenciado e Mestre pelo IPB. Interessa-me desenvolvimento web/software, gestão de dados e IA.',
    'about.skills.title':'Competências técnicas',
    'about.edu.title':'Formação','about.edu.lic':'Licenciatura em Gestão Informática — IPB (2017–2021)','about.edu.mes':'Mestrado em Informática — IPB (2021–2023)',
    'about.stack.title':'Stack (logos oficiais)',
    'projects.title':'Projetos','projects.p1.title':'Plataforma de Marcação — Barbershop','projects.p1.desc':'Agendamentos com admin, UI limpa e integrações.',
    'projects.p2.title':'AirFast — App Android','projects.p2.desc':'Compra de bilhetes, APIs e testes.',
    'projects.p3.title':'Site de Receitas (PHP + MySQL)','projects.p3.desc':'CRUD de receitas com carrinho e paginação.',
    'projects.viewCode':'Ver código','projects.viewDemo':'Ver demo',
    'exp.title':'Experiência','exp.altice.1':'Apoio ao cliente em faturação','exp.altice.2':'Apoio em novos contratos','exp.altice.3':'Suporte técnico',
    'exp.barber.1':'Plataforma de marcações (UI/Admin)','exp.barber.2':'Integração com serviços e BD','exp.barber.3':'Boas práticas HTML/CSS/JS',
    'exp.air.1':'Análise de requisitos','exp.air.2':'Desenvolvimento em Kotlin','exp.air.3':'Integração com APIs/BD e testes',
    'contact.title':'Contacto','contact.form.title':'Enviar mensagem','contact.form.name':'Nome','contact.form.email':'Email','contact.form.message':'Mensagem','contact.form.send':'Enviar',
  },
  en: {
    'nav.about':'About','nav.projects':'Projects','nav.experience':'Experience','nav.contact':'Contact',
    'nav.cv':'Download CV',
    'footer':'Built with HTML + CSS + JS.',
    'home.role':'Web Developer & Information Systems',
    'home.title':'I build secure, fast apps — PHP, Java and data.',
    'home.lead':'From concept to deploy: clean code, database integration and actionable metrics.',
    'home.cta.projects':'See projects','home.cta.contact':'Contact me',
    'home.card.title':'What I deliver','home.card.1':'Stable APIs & backends (PHP/MySQL)','home.card.2':'Responsive, accessible UIs','home.card.3':'Dashboards & insights (Power BI)',
    'about.title':'About me','about.lead':'BSc and MSc from IPB. Interests in web/software development, data management and AI.',
    'about.skills.title':'Technical skills',
    'about.edu.title':'Education','about.edu.lic':'BSc in Management Informatics — IPB (2017–2021)','about.edu.mes':'MSc in Informatics — IPB (2021–2023)',
    'about.stack.title':'Stack (official logos)',
    'projects.title':'Projects','projects.p1.title':'Booking Platform — Barbershop','projects.p1.desc':'Appointments with admin, clean UI and integrations.',
    'projects.p2.title':'AirFast — Android app','projects.p2.desc':'Ticket purchase, APIs and tests.',
    'projects.p3.title':'Recipes Website (PHP + MySQL)','projects.p3.desc':'Recipes CRUD with cart and pagination.',
    'projects.viewCode':'View code','projects.viewDemo':'View demo',
    'exp.title':'Experience','exp.altice.1':'Customer support in billing','exp.altice.2':'Support in new contracts','exp.altice.3':'Technical support',
    'exp.barber.1':'Booking platform (UI/Admin)','exp.barber.2':'Integration with services and DB','exp.barber.3':'HTML/CSS/JS best practices',
    'exp.air.1':'Requirements analysis','exp.air.2':'Development in Kotlin','exp.air.3':'API/DB integration & testing',
    'contact.title':'Contact','contact.form.title':'Send a message','contact.form.name':'Name','contact.form.email':'Email','contact.form.message':'Message','contact.form.send':'Send',
  }
};

const $  = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

function applyI18n(lang){
  const dictLang = dict[lang] || dict.pt;
  $$('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if (dictLang[key]) el.textContent = dictLang[key];
  });
  localStorage.setItem('lang', lang);
  document.documentElement.lang = (lang==='en'?'en':'pt');
  $$('.lang button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
}

function initLanguage(){
  const saved = localStorage.getItem('lang');
  const start = (saved==='pt' || saved==='en') ? saved : ((navigator.language||'pt').startsWith('pt')?'pt':'en');
  applyI18n(start);
  const btnPT = $('#btn-pt'); const btnEN = $('#btn-en');
  if (btnPT) btnPT.addEventListener('click',()=>applyI18n('pt'));
  if (btnEN) btnEN.addEventListener('click',()=>applyI18n('en'));
}

function applyTheme(theme){
  const t = (theme==='light' || theme==='dark') ? theme :
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
}
function initTheme(){
  applyTheme(localStorage.getItem('theme'));
  const btn = document.getElementById('themeToggle');
  if(btn){
    btn.addEventListener('click', ()=>{
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
    });
  }
}

function initYear(){ const y = $('#year'); if (y) y.textContent = new Date().getFullYear(); }

// reveal on scroll
function initReveal(){
  const els = $$('.reveal-up');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
  }, {threshold: 0.15});
  els.forEach(el=>io.observe(el));
}

// highlight current nav
function initActiveNav(){
  const page = document.body.dataset.page;
  if(!page) return;
  const map = {home:'index.html', about:'about.html', projects:'projects.html', experience:'experience.html', contact:'contact.html'};
  $$('.links a').forEach(a=>{
    if(a.getAttribute('href')===map[page]) a.classList.add('active');
  });
}

// contact form
function initContact(){
  const form = $('#contactForm'); if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim(), email = form.email.value.trim(), msg = form.message.value.trim();
    if(!name || !/.+@.+\..+/.test(email) || !msg){
      $('#status').textContent = (document.documentElement.lang==='en'?'Please fill all fields correctly.':'Preenche todos os campos corretamente.');
      return;
    }
    const subject = encodeURIComponent('Portfolio — Contato de ' + name);
    const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\nMensagem:\n${msg}`);
    window.location.href = `mailto:inaciopiresfernandes@gmail.com?subject=${subject}&body=${body}`;
    $('#status').textContent = (document.documentElement.lang==='en'?'Opening your email client...':'A abrir o teu cliente de email...');
  });
}

// page transitions
function initPageTransitions(){
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a'); if(!a) return;
    const href = a.getAttribute('href')||'';
    if (a.target === '_blank' || a.hasAttribute('download') || href.startsWith('#')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    e.preventDefault();
    document.body.classList.add('transition-leave');
    setTimeout(()=>{ window.location.href = a.href; }, 300);
  }, true);
}

document.addEventListener('DOMContentLoaded', ()=>{
  initLanguage();
  initTheme();
  initYear();
  initReveal();
  initActiveNav();
  initContact();
  initPageTransitions();
});


(function initBackToTop(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;
  const onScroll = () => {
    if (window.scrollY > 300) btn.classList.add('show');
    else btn.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  onScroll();
})();

(function initPageTransitions(){
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (a.target === '_blank' || a.hasAttribute('download') || href.startsWith('#')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    e.preventDefault();
    document.body.classList.add('transition-leave');
    setTimeout(() => { window.location.href = a.href; }, 300);
  }, true);
})();


