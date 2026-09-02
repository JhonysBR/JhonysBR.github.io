/* =========================================================
   MAIN — header, menu mobile, carrossel, formulário e rodapé
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     1. Header sticky + barra de progresso + link ativo
     --------------------------------------------------------- */
  const header = document.getElementById('header');
  const progresso = document.getElementById('scrollProgress');
  const links = Array.from(document.querySelectorAll('.nav__link'));
  const secoes = links
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  let tickAgendado = false;

  function aoRolar() {
    const y = window.scrollY;

    header.classList.toggle('is-stuck', y > 40);

    const alturaRolavel = document.documentElement.scrollHeight - window.innerHeight;
    const pct = alturaRolavel > 0 ? (y / alturaRolavel) * 100 : 0;
    progresso.style.width = `${pct}%`;

    /* Destaca o link da seção visível */
    let atual = null;
    secoes.forEach((sec) => {
      if (sec.offsetTop - 140 <= y) atual = sec.id;
    });
    links.forEach((l) => {
      l.classList.toggle('is-active', l.getAttribute('href') === `#${atual}`);
    });
  }

  window.addEventListener('scroll', () => {
    if (tickAgendado) return;
    tickAgendado = true;
    requestAnimationFrame(() => {
      aoRolar();
      tickAgendado = false;
    });
  }, { passive: true });

  aoRolar();

  /* ---------------------------------------------------------
     2. Menu mobile
     --------------------------------------------------------- */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  function alternarMenu(abrir) {
    const estado = abrir !== undefined ? abrir : !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', estado);
    burger.classList.toggle('is-open', estado);
    burger.setAttribute('aria-expanded', String(estado));
    burger.setAttribute('aria-label', estado ? 'Fechar menu' : 'Abrir menu');
    document.body.style.overflow = estado ? 'hidden' : '';
  }

  burger.addEventListener('click', () => alternarMenu());
  links.forEach((l) => l.addEventListener('click', () => alternarMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) alternarMenu(false);
  });

  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('is-open')) return;
    if (!nav.contains(e.target) && !burger.contains(e.target)) alternarMenu(false);
  });

  /* ---------------------------------------------------------
     3. Carrossel de depoimentos
     --------------------------------------------------------- */
  const track = document.getElementById('testTrack');
  const dots = document.getElementById('testDots');
  const btnPrev = document.getElementById('testPrev');
  const btnNext = document.getElementById('testNext');

  if (track && typeof DEPOIMENTOS !== 'undefined' && DEPOIMENTOS.length) {
    let indice = 0;
    let autoplay = null;
    const total = DEPOIMENTOS.length;

    const escapar = (t) => String(t).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[c]);

    DEPOIMENTOS.forEach((d, i) => {
      const li = document.createElement('li');
      li.className = 'testimonial';
      li.setAttribute('role', 'group');
      li.setAttribute('aria-label', `Depoimento ${i + 1} de ${total}`);
      li.innerHTML = `
        <p class="testimonial__stars" aria-label="Nota ${d.nota} de 5">${'★'.repeat(d.nota)}${'☆'.repeat(5 - d.nota)}</p>
        <blockquote class="testimonial__text">&ldquo;${escapar(d.texto)}&rdquo;</blockquote>
        <div class="testimonial__author">
          <span class="testimonial__avatar" aria-hidden="true">${escapar(d.nome.charAt(0))}</span>
          <span class="testimonial__name">${escapar(d.nome)}</span>
          <span class="testimonial__role">${escapar(d.papel)}</span>
        </div>`;
      track.appendChild(li);

      const dot = document.createElement('button');
      dot.className = 'dot';
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para o depoimento ${i + 1}`);
      dot.addEventListener('click', () => irPara(i));
      dots.appendChild(dot);
    });

    function irPara(i) {
      indice = (i + total) % total;
      track.style.transform = `translateX(-${indice * 100}%)`;
      Array.from(dots.children).forEach((d, k) => {
        d.classList.toggle('is-active', k === indice);
        d.setAttribute('aria-selected', String(k === indice));
      });
    }

    function iniciarAutoplay() {
      pararAutoplay();
      autoplay = setInterval(() => irPara(indice + 1), 6500);
    }
    function pararAutoplay() {
      if (autoplay) clearInterval(autoplay);
    }

    btnNext.addEventListener('click', () => { irPara(indice + 1); iniciarAutoplay(); });
    btnPrev.addEventListener('click', () => { irPara(indice - 1); iniciarAutoplay(); });

    const carrossel = track.closest('.carousel');
    carrossel.addEventListener('mouseenter', pararAutoplay);
    carrossel.addEventListener('mouseleave', iniciarAutoplay);
    carrossel.addEventListener('focusin', pararAutoplay);
    carrossel.addEventListener('focusout', iniciarAutoplay);

    /* Navegação por teclado */
    carrossel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { irPara(indice + 1); iniciarAutoplay(); }
      if (e.key === 'ArrowLeft') { irPara(indice - 1); iniciarAutoplay(); }
    });

    /* Swipe no touch */
    let xInicial = null;
    track.addEventListener('touchstart', (e) => {
      xInicial = e.touches[0].clientX;
      pararAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (xInicial === null) return;
      const delta = e.changedTouches[0].clientX - xInicial;
      if (Math.abs(delta) > 45) irPara(indice + (delta < 0 ? 1 : -1));
      xInicial = null;
      iniciarAutoplay();
    }, { passive: true });

    irPara(0);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) iniciarAutoplay();
  }

  /* ---------------------------------------------------------
     4. Formulário de contato (validação apenas no navegador)
     --------------------------------------------------------- */
  const form = document.getElementById('contactForm');

  if (form) {
    const status = document.getElementById('formStatus');

    const regras = {
      nome: (v) => (v.trim().length >= 3 ? '' : 'Digite seu nome completo.'),
      telefone: (v) => (v.replace(/\D/g, '').length >= 10 ? '' : 'Informe um telefone com DDD.'),
      email: (v) => (!v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'E-mail inválido.')
    };

    function validarCampo(nome) {
      const input = form.elements[nome];
      const erroEl = form.querySelector(`[data-error-for="${nome}"]`);
      const msg = regras[nome](input.value);

      input.closest('.field').classList.toggle('has-error', Boolean(msg));
      erroEl.textContent = msg;
      return !msg;
    }

    Object.keys(regras).forEach((nome) => {
      const input = form.elements[nome];
      input.addEventListener('blur', () => validarCampo(nome));
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('has-error')) validarCampo(nome);
      });
    });

    /* Máscara simples de telefone brasileiro */
    form.elements.telefone.addEventListener('input', (e) => {
      const d = e.target.value.replace(/\D/g, '').slice(0, 11);
      let saida = d;
      if (d.length > 2) saida = `(${d.slice(0, 2)}) ${d.slice(2)}`;
      if (d.length > 6) {
        const corte = d.length > 10 ? 7 : 6;
        saida = `(${d.slice(0, 2)}) ${d.slice(2, corte)}-${d.slice(corte)}`;
      }
      e.target.value = saida;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const valido = Object.keys(regras).map(validarCampo).every(Boolean);

      if (!valido) {
        status.textContent = 'Confira os campos destacados antes de enviar.';
        status.className = 'form__status is-error';
        return;
      }

      /* Sem backend: montamos a mensagem e abrimos o WhatsApp.
         Para receber por e-mail, veja a seção "Formulário" no README. */
      const dados = new FormData(form);
      const texto = encodeURIComponent(
        `Olá! Meu nome é ${dados.get('nome')}.\n` +
        `Assunto: ${form.elements.assunto.selectedOptions[0].text}\n` +
        `Telefone: ${dados.get('telefone')}\n` +
        (dados.get('email') ? `E-mail: ${dados.get('email')}\n` : '') +
        (dados.get('mensagem') ? `\n${dados.get('mensagem')}` : '')
      );

      // PERSONALIZE: número do WhatsApp que recebe os contatos
      window.open(`https://wa.me/5511999998888?text=${texto}`, '_blank', 'noopener');

      status.textContent = 'Tudo certo! Abrimos o WhatsApp com sua mensagem pronta.';
      status.className = 'form__status is-success';
      form.reset();
    });
  }

  /* ---------------------------------------------------------
     5. Ano no rodapé
     --------------------------------------------------------- */
  const ano = document.getElementById('year');
  if (ano) ano.textContent = new Date().getFullYear();
})();
