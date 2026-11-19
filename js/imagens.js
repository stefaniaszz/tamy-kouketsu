/* Funcoes de imagem usadas pelo site (nao precisa editar).
   Dados: js/dados-imagens.js */
(function () {
  const dados = window.IMAGENS || {};
  const el = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };

  // Cria <img> a partir de {src, alt, posicao}; devolve null se nao houver src.
  window.criarImagem = function (info) {
    if (!info || !info.src) return null;
    const img = document.createElement('img');
    img.src = info.src;
    img.alt = info.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    if (info.posicao) img.style.objectPosition = info.posicao;
    return img;
  };

  // Aceita texto ('caminho.jpg'), objeto {src,...} ou lista deles; devolve lista de objetos.
  // O texto alternativo (alt) padrao e "<nome> — foto N".
  window.listaImagens = function (valor, nome) {
    const lista = Array.isArray(valor) ? valor : valor ? [valor] : [];
    return lista
      .map((v) => (typeof v === 'string' ? { src: v } : v))
      .filter((v) => v && v.src)
      .map((v, i, todas) => ({
        ...v,
        alt: v.alt || (nome ? `${nome}${todas.length > 1 ? ' — foto ' + (i + 1) : ''}` : ''),
      }));
  };

  // Carrossel de fotos (setas, bolinhas, arrastar no celular). Com 1 foto, sem controles.
  window.criarCarrossel = function (imagens) {
    const raiz = el('div', 'carrossel');
    const pista = el('div', 'carrossel__pista');
    pista.setAttribute('role', 'group');
    pista.setAttribute('aria-label', 'Fotos do serviço');
    imagens.forEach((info) => {
      const slide = el('div', 'carrossel__slide');
      slide.appendChild(window.criarImagem(info));
      pista.appendChild(slide);
    });
    raiz.appendChild(pista);
    if (imagens.length < 2) return raiz;

    const mover = (dir) => pista.scrollBy({ left: dir * pista.clientWidth, behavior: 'smooth' });
    const mkBtn = (cls, rotulo, icone, dir) => {
      const b = el('button', 'carrossel__seta ' + cls);
      b.type = 'button'; b.setAttribute('aria-label', rotulo);
      b.innerHTML = `<i data-lucide="${icone}"></i>`;
      b.addEventListener('click', () => mover(dir));
      return b;
    };
    raiz.append(mkBtn('carrossel__seta--ant', 'Foto anterior', 'chevron-left', -1),
                mkBtn('carrossel__seta--prox', 'Próxima foto', 'chevron-right', 1));

    const pontos = el('div', 'carrossel__pontos');
    const bolinhas = imagens.map((_, i) => {
      const p = el('button', 'carrossel__ponto');
      p.type = 'button'; p.setAttribute('aria-label', `Ir para a foto ${i + 1}`);
      p.addEventListener('click', () => pista.scrollTo({ left: i * pista.clientWidth, behavior: 'smooth' }));
      pontos.appendChild(p); return p;
    });
    raiz.appendChild(pontos);
    const atualizar = () => {
      const i = Math.round(pista.scrollLeft / (pista.clientWidth || 1));
      bolinhas.forEach((p, j) => p.classList.toggle('ativo', i === j));
    };
    pista.addEventListener('scroll', atualizar, { passive: true });
    atualizar();
    return raiz;
  };

  // Troca o placeholder pela foto em elementos com data-imagem="hero" | "sobre".
  document.querySelectorAll('[data-imagem]').forEach((alvo) => {
    const img = window.criarImagem(dados[alvo.dataset.imagem]);
    if (!img) return;                                  // sem src: mantem o placeholder
    if (alvo.dataset.imagem === 'hero') img.loading = 'eager';
    alvo.replaceChildren(img);
  });
})();
