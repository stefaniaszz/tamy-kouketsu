/* Portfolio: galeria por categoria + visualizacao ampliada (lightbox) + videos.
   Dados: js/dados-imagens.js (fotos/videos) e js/dados-servicos.js (nomes). */
(function () {
  const raiz = document.getElementById('portfolio-conteudo');
  if (!raiz) return;
  const IM = window.IMAGENS || {};
  const cfg = IM.portfolio || {};
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt !== undefined) n.textContent = txt; return n; };

  const CATEGORIAS = [
    { id: 'maquiagem', nome: 'Maquiagem' },
    { id: 'cilios', nome: 'Cílios' },
    { id: 'sobrancelhas', nome: 'Sobrancelhas' },
  ];

  /* ---- 1. Reune os itens (fotos dos servicos + extras + videos) ---- */
  const itens = [];
  CATEGORIAS.forEach((cat) => {
    const dadosCat = ((window.SERVICOS || {}).categorias || []).find((c) => c.id === cat.id);
    ((dadosCat && dadosCat.servicos) || []).forEach((s) => {
      window.listaImagens((IM.servicos || {})[s.id], s.nome).forEach((f) =>
        itens.push({ tipo: 'foto', categoria: cat.id, legenda: s.nome, ...f }));
    });
    window.listaImagens((cfg.extras || {})[cat.id], cat.nome).forEach((f) =>
      itens.push({ tipo: 'foto', categoria: cat.id, legenda: cat.nome, ...f }));
    (cfg.videos || []).filter((v) => v.categoria === cat.id && v.src).forEach((v) =>
      itens.push({ tipo: 'video', categoria: cat.id, legenda: v.titulo || cat.nome, src: v.src, poster: v.poster, alt: v.titulo || 'Vídeo' }));
  });

  /* ---- 2. Abas de filtro ---- */
  const abas = el('div', 'abas abas--claras');
  abas.setAttribute('role', 'group'); abas.setAttribute('aria-label', 'Filtrar portfólio');
  const grade = el('ul', 'galeria');
  let filtro = 'todos';

  /* "Ver mais": no celular mostra poucas fotos por vez para a pagina nao ficar longa.
     Ajuste os numeros abaixo. No computador (tela larga) aparecem todas. */
  const POR_VEZ_CELULAR = 6;
  const celular = window.matchMedia('(max-width: 900px)');
  const quantidadeInicial = () => (celular.matches ? POR_VEZ_CELULAR : Infinity);
  let limite = quantidadeInicial();
  [{ id: 'todos', nome: 'Todos' }, ...CATEGORIAS].forEach((cat) => {
    const b = el('button', 'abas__botao', cat.nome);
    b.type = 'button'; b.dataset.filtro = cat.id;
    b.setAttribute('aria-pressed', String(cat.id === 'todos'));
    b.addEventListener('click', () => {
      filtro = cat.id;
      abas.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      limite = quantidadeInicial();
      aplicar();
    });
    abas.appendChild(b);
  });

  /* ---- 3. Grade ---- */
  const visiveis = () => itens.filter((i) => filtro === 'todos' || i.categoria === filtro);
  if (!itens.length) {                      // nada enviado ainda: placeholders
    for (let i = 0; i < 6; i++) {
      const li = el('li', 'galeria__li');
      li.innerHTML = '<div class="placeholder"><i data-lucide="image"></i><span>Foto do portfólio<br>conteúdo pendente</span></div>';
      grade.appendChild(li);
    }
  }
  const videos = [];
  itens.forEach((it) => {
    const li = el('li', 'galeria__li'); li.dataset.categoria = it.categoria;
    const b = el('button', 'galeria__item'); b.type = 'button';
    b.setAttribute('aria-label', `Ampliar: ${it.legenda}${it.tipo === 'video' ? ' (vídeo)' : ''}`);
    if (it.tipo === 'video') {
      // Video no portfolio: toca sozinho, sem som, em loop (pausa quando sai da tela)
      const v = el('video'); v.src = it.src; if (it.poster) v.poster = it.poster;
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true; v.preload = 'metadata';
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-label', it.legenda);
      b.appendChild(v); videos.push(v);
    } else {
      const img = window.criarImagem({ src: it.src, alt: it.alt });
      if (img) b.appendChild(img);
    }
    b.appendChild(el('span', 'galeria__legenda', it.legenda));
    b.addEventListener('click', () => abrir(it));
    li.appendChild(b); grade.appendChild(li);
  });
  const maisBtn = el('button', 'btn btn--escuro galeria__mais'); maisBtn.type = 'button';
  const maisWrap = el('p', 'galeria__cta'); maisWrap.appendChild(maisBtn);
  raiz.append(abas, grade, maisWrap);

  // Mostra so ate "limite" itens do filtro atual e atualiza o botao "Ver mais"
  function aplicar() {
    let n = 0;
    grade.querySelectorAll('.galeria__li').forEach((li) => {
      const ok = filtro === 'todos' || li.dataset.categoria === filtro;
      if (ok) n++;
      li.hidden = !ok || n > limite;
    });
    const restantes = Math.max(0, n - limite);
    maisWrap.hidden = restantes === 0;
    maisBtn.textContent = `Ver mais (${restantes})`;
  }
  maisBtn.addEventListener('click', () => { limite += POR_VEZ_CELULAR; aplicar(); });
  celular.addEventListener('change', () => { limite = quantidadeInicial(); aplicar(); });
  aplicar();

  // Pausa os videos fora da tela e retoma ao voltar (economiza bateria e dados)
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) e.target.play().catch(() => {}); else e.target.pause();
    }), { threshold: 0.25 });
    videos.forEach((v) => obs.observe(v));
  }

  // Chamada para o Instagram (link vem de js/config.js)
  const ig = (window.CONFIG || {}).instagramProfissional;
  if (ig && ig.url) {
    const p = el('p', 'galeria__cta');
    const a = el('a', 'btn btn--escuro');
    a.href = ig.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.innerHTML = `Ver no Instagram @${ig.usuario} <i data-lucide="arrow-up-right"></i>`;
    p.appendChild(a); raiz.appendChild(p);
  }

  /* ---- 4. Visualizacao ampliada (lightbox) ---- */
  const dlg = el('dialog', 'lightbox');
  dlg.setAttribute('aria-label', 'Visualização ampliada');
  dlg.innerHTML = `
    <button type="button" class="lightbox__fechar" aria-label="Fechar"><i data-lucide="x"></i></button>
    <button type="button" class="lightbox__seta lightbox__seta--ant" aria-label="Anterior"><i data-lucide="chevron-left"></i></button>
    <div class="lightbox__midia"></div>
    <button type="button" class="lightbox__seta lightbox__seta--prox" aria-label="Próxima"><i data-lucide="chevron-right"></i></button>
    <p class="lightbox__legenda"></p>`;
  document.body.appendChild(dlg);
  const palco = dlg.querySelector('.lightbox__midia');
  const legenda = dlg.querySelector('.lightbox__legenda');
  let lista = [], pos = 0;

  function mostrar() {
    const it = lista[pos];
    palco.replaceChildren();
    if (it.tipo === 'video') {
      const v = el('video'); v.src = it.src; v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      if (it.poster) v.poster = it.poster;
      palco.appendChild(v);
    } else {
      const i = el('img'); i.src = it.src; i.alt = it.alt || ''; palco.appendChild(i);
    }
    legenda.textContent = `${it.legenda} · ${pos + 1}/${lista.length}`;
  }
  function abrir(it) {
    lista = visiveis(); pos = Math.max(0, lista.indexOf(it)); mostrar();
    if (!dlg.open) dlg.showModal();
  }
  const passo = (d) => { pos = (pos + d + lista.length) % lista.length; mostrar(); };
  dlg.querySelector('.lightbox__fechar').addEventListener('click', () => dlg.close());
  dlg.querySelector('.lightbox__seta--ant').addEventListener('click', () => passo(-1));
  dlg.querySelector('.lightbox__seta--prox').addEventListener('click', () => passo(1));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });  // clicar fora fecha
  dlg.addEventListener('close', () => palco.replaceChildren());                  // para o video
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') passo(-1);
    if (e.key === 'ArrowRight') passo(1);
  });
  let x0 = null;                                                                  // arrastar no celular
  dlg.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) passo(dx < 0 ? 1 : -1);
  });
})();
