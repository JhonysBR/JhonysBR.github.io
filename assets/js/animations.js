/* =========================================================
   ANIMAÇÕES — scroll reveal, contadores, parallax e tilt 3D
   Expõe window.OticaAnim para os outros scripts.
   ========================================================= */

(function () {
  'use strict';

  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. Scroll reveal + contadores (um único IntersectionObserver)
     --------------------------------------------------------- */
  function animarContador(el) {
    const alvo = Number(el.dataset.count) || 0;
    const sufixo = el.dataset.suffix || '';
    const duracao = 1600;

    if (semMovimento) {
      el.textContent = alvo.toLocaleString('pt-BR') + sufixo;
      return;
    }

    const inicio = performance.now();

    function passo(agora) {
      const p = Math.min((agora - inicio) / duracao, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(alvo * eased).toLocaleString('pt-BR') + sufixo;
      if (p < 1) requestAnimationFrame(passo);
    }

    requestAnimationFrame(passo);
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;

      const el = entrada.target;
      el.classList.add('is-visible');

      el.querySelectorAll('[data-count]').forEach(animarContador);
      if (el.hasAttribute('data-count')) animarContador(el);

      observador.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => observador.observe(el));

  /* Contadores que não estejam dentro de um .reveal */
  document.querySelectorAll('[data-count]').forEach((el) => {
    if (!el.closest('.reveal')) observador.observe(el);
  });

  /* ---------------------------------------------------------
     2. Parallax do hero seguindo o mouse
     --------------------------------------------------------- */
  const camadas = document.querySelectorAll('[data-parallax]');
  if (camadas.length && !semMovimento && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0;
    let mouseY = 0;
    let agendado = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;

      if (agendado) return;
      agendado = true;

      requestAnimationFrame(() => {
        camadas.forEach((camada) => {
          const forca = parseFloat(camada.dataset.parallax) || 0.03;
          camada.style.transform =
            `translate3d(${mouseX * forca}px, ${mouseY * forca}px, 0)`;
        });
        agendado = false;
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     3. Tilt 3D nos cards do catálogo
     --------------------------------------------------------- */
  function aplicarTilt(elementos) {
    if (semMovimento || !window.matchMedia('(hover: hover)').matches) return;

    elementos.forEach((el) => {
      if (el.dataset.tiltAtivo === '1') return;
      el.dataset.tiltAtivo = '1';

      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;

        el.classList.add('is-tilting');
        el.style.transform =
          `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-6px) scale(1.015)`;
      });

      el.addEventListener('mouseleave', () => {
        el.classList.remove('is-tilting');
        el.style.transform = '';
      });
    });
  }

  /* Cards já renderizados por catalog.js antes deste script rodar */
  aplicarTilt(document.querySelectorAll('.card'));

  /* ---------------------------------------------------------
     4. Marquee: duplica a duração conforme a largura da tela
     --------------------------------------------------------- */
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack && !semMovimento) {
    const duracao = Math.max(18, marqueeTrack.scrollWidth / 90);
    marqueeTrack.style.animationDuration = `${duracao}s`;
  }

  /* Disponível para catalog.js re-aplicar o tilt após filtrar */
  window.OticaAnim = { aplicarTilt, animarContador };
})();
