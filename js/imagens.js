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
  // opcoes.circular = true: navegacao em loop (depois da ultima volta a 1a e vice-versa) com indice
  // absoluto, em vez de rolagem relativa. Hoje so o carrossel de Maquiagem Social usa (js/servicos.js).
  window.criarCarrossel = function (imagens, opcoes) {
    const circular = !!(opcoes && opcoes.circular);
    const raiz = el('div', 'carrossel' + (circular ? ' carrossel--circular' : ''));
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

    const total = imagens.length;
    const larg = () => pista.clientWidth || 1;
    const atual = () => Math.min(total - 1, Math.max(0, Math.round(pista.scrollLeft / larg())));
    let destino = 0;          // indice para onde o carrossel esta indo (cliques rapidos encadeiam)
    let tocando = false;      // dedo na tela
    let timer = 0;
    // Vai para a foto i (em loop). Saltos longos (ultima <-> primeira) sao instantaneos.
    const ir = (i) => {
      destino = ((i % total) + total) % total;
      const longe = Math.abs(destino - atual()) > 1;
      pista.scrollTo({ left: destino * larg(), behavior: longe ? 'auto' : 'smooth' });
    };
    const mover = circular ? (dir) => ir(destino + dir)
                           : (dir) => pista.scrollBy({ left: dir * pista.clientWidth, behavior: 'smooth' });
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
      p.addEventListener('click', () => (circular ? ir(i) : pista.scrollTo({ left: i * pista.clientWidth, behavior: 'smooth' })));
      pontos.appendChild(p); return p;
    });
    raiz.appendChild(pontos);
    const atualizar = () => {
      const i = Math.round(pista.scrollLeft / (pista.clientWidth || 1));
      bolinhas.forEach((p, j) => p.classList.toggle('ativo', i === j));
    };
    pista.addEventListener('scroll', atualizar, { passive: true });
    atualizar();

    if (circular) {
      // Quando a rolagem para (120 ms sem eventos): sincroniza o destino e, se o navegador deixou a pista
      // fora das posicoes das fotos (ex.: Safari do iPhone apos puxar alem da ultima foto -> espaco em
      // branco), recoloca na foto mais proxima.
      const assentar = () => {
        if (tocando) return;
        const i = atual();
        destino = i;
        if (Math.abs(pista.scrollLeft - i * larg()) > 2) pista.scrollTo({ left: i * larg(), behavior: 'auto' });
      };
      pista.addEventListener('scroll', () => { clearTimeout(timer); timer = setTimeout(assentar, 120); }, { passive: true });
      // Arrastar alem da ultima foto volta a primeira (e antes da primeira vai a ultima).
      let x0 = 0, y0 = 0, i0 = 0;
      pista.addEventListener('touchstart', (e) => {
        tocando = true; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; i0 = atual();
      }, { passive: true });
      const fim = (e) => {
        tocando = false;
        const t = e.changedTouches && e.changedTouches[0];
        if (t) {
          const dx = t.clientX - x0, dy = t.clientY - y0;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
            if (i0 === total - 1 && dx < 0) { ir(0); return; }
            if (i0 === 0 && dx > 0) { ir(total - 1); return; }
          }
        }
        clearTimeout(timer); timer = setTimeout(assentar, 120);
      };
      pista.addEventListener('touchend', fim, { passive: true });
      pista.addEventListener('touchcancel', fim, { passive: true });
    }
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
