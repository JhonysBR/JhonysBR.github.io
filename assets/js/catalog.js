/* =========================================================
   CATÁLOGO — render dos cards, filtros e modal de detalhe
   Depende de PRODUTOS (assets/js/data.js)
   ========================================================= */

(function () {
  'use strict';

  const grid = document.getElementById('catalogGrid');
  const vazio = document.getElementById('catalogEmpty');
  const filtros = document.querySelectorAll('.filter');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');

  if (!grid || typeof PRODUTOS === 'undefined') return;

  const CATEGORIAS = {
    solar: 'Solar',
    grau: 'Grau',
    infantil: 'Infantil',
    esportivo: 'Esportivo'
  };

  let ultimoFoco = null;

  const formatarPreco = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  /* Evita que qualquer texto vindo de data.js quebre o HTML */
  const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  /* Ilustração usada quando o produto não tem foto */
  function svgPlaceholder(cor) {
    return `
      <svg viewBox="0 0 320 150" role="img" aria-label="Ilustração do modelo ${escapar(cor)}">
        <circle cx="95" cy="78" r="52" fill="rgba(255,212,0,0.10)" stroke="#FFD400" stroke-width="7"/>
        <circle cx="225" cy="78" r="52" fill="rgba(255,212,0,0.10)" stroke="#FFD400" stroke-width="7"/>
        <path d="M147 74q13-12 26 0" fill="none" stroke="#FFD400" stroke-width="7" stroke-linecap="round"/>
        <path d="M43 66 12 44M277 66l31-22" fill="none" stroke="#FFD400" stroke-width="7" stroke-linecap="round"/>
        <path d="M72 52q16-18 36-12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity="0.55"/>
      </svg>`;
  }

  function midiaDoProduto(p) {
    return p.imagem
      ? `<img src="${escapar(p.imagem)}" alt="${escapar(p.nome)}" loading="lazy">`
      : svgPlaceholder(p.cor);
  }

  /* ---------- Render dos cards ---------- */
  function criarCard(p, indice) {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'card';
    card.dataset.categoria = p.categoria;
    card.dataset.id = p.id;
    card.style.animationDelay = `${Math.min(indice, 8) * 55}ms`;
    card.setAttribute('aria-label', `Ver detalhes de ${p.nome}`);

    const badge = p.badge
      ? `<span class="card__badge ${p.badge.toLowerCase() === 'novo' ? 'card__badge--novo' : ''}">${escapar(p.badge)}</span>`
      : '';

    const precoAntigo = p.precoAntigo
      ? `<span class="card__price-old">${formatarPreco(p.precoAntigo)}</span>`
      : '';

    card.innerHTML = `
      <div class="card__media">${badge}${midiaDoProduto(p)}</div>
      <div class="card__body">
        <span class="card__cat">${escapar(CATEGORIAS[p.categoria] || p.categoria)}</span>
        <h3 class="card__name">${escapar(p.nome)}</h3>
        <p class="card__meta">${escapar(p.material)} &middot; ${escapar(p.cor)}</p>
        <div class="card__footer">
          <span class="card__price">${formatarPreco(p.preco)}</span>
          ${precoAntigo}
          <span class="card__cta">Ver detalhes &rarr;</span>
        </div>
      </div>`;

    card.addEventListener('click', () => abrirModal(p.id, card));
    return card;
  }

  function renderProdutos(lista) {
    grid.innerHTML = '';
    lista.forEach((p, i) => grid.appendChild(criarCard(p, i)));
    vazio.hidden = lista.length > 0;
    if (window.OticaAnim && window.OticaAnim.aplicarTilt) {
      window.OticaAnim.aplicarTilt(grid.querySelectorAll('.card'));
    }
  }

  /* ---------- Filtros ---------- */
  function filtrar(categoria) {
    const lista = categoria === 'todos'
      ? PRODUTOS
      : PRODUTOS.filter((p) => p.categoria === categoria);
    renderProdutos(lista);
  }

  filtros.forEach((btn) => {
    btn.addEventListener('click', () => {
      filtros.forEach((b) => {
        const ativo = b === btn;
        b.classList.toggle('is-active', ativo);
        b.setAttribute('aria-selected', String(ativo));
      });
      filtrar(btn.dataset.filter);
    });
  });

  /* ---------- Modal ---------- */
  function abrirModal(id, origem) {
    const p = PRODUTOS.find((item) => item.id === Number(id));
    if (!p) return;

    ultimoFoco = origem || document.activeElement;

    const precoAntigo = p.precoAntigo
      ? ` <span class="card__price-old">${formatarPreco(p.precoAntigo)}</span>`
      : '';

    const mensagem = encodeURIComponent(
      `Olá! Tenho interesse no modelo "${p.nome}" que vi no site.`
    );

    modalContent.innerHTML = `
      <div class="modal__grid">
        <div class="modal__media">${midiaDoProduto(p)}</div>
        <div class="modal__info">
          <span class="card__cat">${escapar(CATEGORIAS[p.categoria] || p.categoria)}</span>
          <h3 id="modalTitle">${escapar(p.nome)}</h3>
          <p class="modal__desc">${escapar(p.descricao)}</p>
          <ul class="modal__specs">
            <li><span>Material</span><span>${escapar(p.material)}</span></li>
            <li><span>Cor</span><span>${escapar(p.cor)}</span></li>
            <li><span>Formato</span><span>${escapar(p.formato)}</span></li>
            <li><span>Garantia</span><span>12 meses</span></li>
          </ul>
          <p class="modal__price">${formatarPreco(p.preco)}${precoAntigo}</p>
          <div class="modal__actions">
            <a class="btn btn--accent btn--block"
               href="https://wa.me/5511999998888?text=${mensagem}"
               target="_blank" rel="noopener">Tenho interesse</a>
            <a class="btn btn--ghost btn--block" href="#contato" data-close-modal>Agendar exame de vista</a>
          </div>
        </div>
      </div>`;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    const fechar = modal.querySelector('.modal__close');
    if (fechar) fechar.focus();
  }

  function fecharModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    if (ultimoFoco) ultimoFoco.focus();
  }

  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close-modal]')) fecharModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') fecharModal();

    /* Mantém o foco preso dentro do modal enquanto ele está aberto */
    if (e.key === 'Tab' && !modal.hidden) {
      const focaveis = modal.querySelectorAll('a[href], button:not([disabled])');
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
  });

  /* ---------- Inicialização ---------- */
  renderProdutos(PRODUTOS);
})();
