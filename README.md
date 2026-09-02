# 👓 Ótica Visão — Site One-Page

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Sem dependências](https://img.shields.io/badge/depend%C3%AAncias-0-FFD400?style=flat)
![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-brightgreen?style=flat)

Site institucional **one-page** para ótica/loja de óculos. Vitrine de modelos com filtros,
serviços, depoimentos e contato — construído com **HTML, CSS e JavaScript puros**, sem
frameworks, sem build e sem banco de dados.

Identidade visual em **amarelo e preto**, com animações vivas (scroll reveal, contadores,
parallax, cards com efeito 3D) e foco em conversão.

---

## 📸 Preview

> Coloque um screenshot em `assets/img/preview.png` e ele aparecerá aqui.

<!-- ![Preview do site](assets/img/preview.png) -->

**Demo:** _publique no GitHub Pages e cole o link aqui._

---

## ✨ Funcionalidades

- **Catálogo interativo** — grid de modelos renderizado via JavaScript, com filtros por
  categoria (Solar, Grau, Infantil, Esportivo) e modal de detalhes.
- **Design responsivo** — mobile-first, testado de 375px a 1440px+.
- **Animações ricas** — reveal no scroll, contadores animados, parallax no hero,
  tilt 3D nos cards, gradiente animado, botão de WhatsApp pulsante.
- **Carrossel de depoimentos** — autoplay pausável, setas, dots e swipe no touch.
- **Acessibilidade** — HTML semântico, navegação completa por teclado, `aria-*` nos
  controles, foco visível e respeito a `prefers-reduced-motion`.
- **SEO local** — meta tags, Open Graph, Twitter Card e JSON-LD `Schema.org/Optician`.
- **Zero dependências** — nada de npm, bundler ou CDN de biblioteca.

---

## 🛠 Tecnologias

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilo | CSS3 (Custom Properties, Grid, Flexbox, `@keyframes`) |
| Comportamento | JavaScript ES6+ (IntersectionObserver, `requestAnimationFrame`) |
| Tipografia | Google Fonts — Sora + Inter |
| Ícones/Imagens | SVG inline (sem requisições extras) |

---

## 📁 Estrutura do projeto

```
Site_Pessoal/
├── index.html                 # Página única com todas as seções
├── README.md
├── LICENSE
├── .gitignore
└── assets/
    ├── css/
    │   ├── reset.css          # Normalização de estilos do navegador
    │   ├── variables.css      # 🎨 Design tokens (cores, fontes, espaçamentos)
    │   ├── style.css          # Layout e componentes
    │   └── animations.css     # Keyframes e classes de animação
    ├── js/
    │   ├── data.js            # 📝 Produtos e depoimentos (edite aqui!)
    │   ├── catalog.js         # Render do catálogo, filtros e modal
    │   ├── animations.js      # Scroll reveal, contadores, parallax, tilt 3D
    │   └── main.js            # Menu, header, carrossel, formulário
    └── img/                   # Suas fotos de produtos
```

---

## 🚀 Como rodar

**Opção 1 — abrir direto:** dê dois cliques em `index.html`.

**Opção 2 — servidor local** (recomendado, evita restrições do navegador):

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

Com Node instalado, a alternativa é:

```bash
npx serve .
```

---

## 🎨 Como personalizar

Tudo que é específico da sua loja está concentrado em poucos lugares.

### 1. Nome da loja, telefone e endereço

Abra `index.html` e procure pelos marcadores `<!-- PERSONALIZE -->`. Os pontos a trocar são:

| O que | Onde |
|---|---|
| Nome da loja | `<title>`, logo no header, rodapé e JSON-LD |
| Telefone / WhatsApp | Links `href="https://wa.me/55SEUNUMERO"` e `href="tel:..."` |
| Endereço e horários | Seção `#contato` |
| Redes sociais | Links no rodapé |
| Mapa | `<iframe>` na seção `#contato` — pegue o embed no Google Maps |

> **WhatsApp:** o número vai no formato internacional sem símbolos —
> `https://wa.me/5511999998888`.

### 2. Cores

Edite apenas `assets/css/variables.css`:

```css
--color-accent: #FFD400;   /* amarelo principal */
--color-bg:     #0A0A0A;   /* preto de fundo */
```

Todo o site se ajusta automaticamente.

### 3. Produtos do catálogo

Edite o array `PRODUTOS` em `assets/js/data.js`:

```js
{
  id: 13,
  nome: "Modelo Aviador Clássico",
  categoria: "solar",          // solar | grau | infantil | esportivo
  material: "Metal",
  cor: "Dourado",
  preco: 349.90,
  precoAntigo: 499.90,         // opcional — exibe preço riscado
  badge: "Promo",              // opcional — "Novo" ou "Promo"
  imagem: "assets/img/aviador.jpg",  // ou null para usar o SVG placeholder
  descricao: "Descrição curta que aparece no modal."
}
```

Para usar fotos reais: coloque os arquivos em `assets/img/` e informe o caminho em `imagem`.
Recomendado: JPG/WebP, fundo claro, ~800×600px.

### 4. Depoimentos

Mesmo arquivo `data.js`, array `DEPOIMENTOS`.

### 5. Formulário de contato

Como o site não tem backend, o formulário **valida os campos no navegador e abre o WhatsApp
com a mensagem já montada** — o cliente só precisa apertar enviar. Nenhum dado sai do
navegador dele antes disso.

O número que recebe os contatos fica em `assets/js/main.js`, no final da função de envio
(procure por `PERSONALIZE`):

```js
window.open(`https://wa.me/5511999998888?text=${texto}`, '_blank', 'noopener');
```

Se preferir **receber por e-mail**, crie uma conta gratuita no
[Formspree](https://formspree.io), troque a abertura do `<form>` em `index.html` por:

```html
<form action="https://formspree.io/f/SEU_ID" method="POST">
```

e remova o `e.preventDefault()` do handler de `submit` em `main.js`.

---

## 🌐 Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Site da ótica: versão inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

Depois, no GitHub: **Settings → Pages → Source: `main` / `(root)` → Save**.
Em poucos minutos o site fica em `https://SEU_USUARIO.github.io/SEU_REPO/`.

---

## 🗺 Roadmap

- [ ] Substituir SVGs placeholder por fotos reais dos modelos
- [ ] Integrar formulário com Formspree ou similar
- [ ] Galeria de fotos da loja física
- [ ] Blog com dicas de saúde ocular
- [ ] Modo claro alternativo

---

## 📄 Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.
