/* ==========================================================================
   >>> ALTERAR DEPOIMENTOS — EDITE A LISTA ABAIXO <<<
   Dois formatos (pode misturar):
     1) Texto:  { nome: 'Nome', servico: 'Lash Lifting', texto: 'Texto do depoimento' }
     2) Print de conversa:  { imagem: 'assets/images/depoimentos/depoimento-1.jpg', alt: 'Conversa com cliente' }
        (coloque os prints na pasta assets/images/depoimentos/)
   Os 4 prints abaixo sao depoimentos reais de clientes (1 linha de 4 no desktop; a grade esta em css/sections.css). Para adicionar outro, coloque a
   imagem na pasta e acrescente uma linha. (Itens com  ficticio: true  ganham a etiqueta
   "Exemplo de teste".)
   ========================================================================== */
window.DEPOIMENTOS = [
  { imagem: 'assets/images/depoimentos/depoimento-1.jpg', alt: 'Conversa de cliente: a make durou a festa inteira e o resultado ficou do jeito que queria' },
  { imagem: 'assets/images/depoimentos/depoimento-2.jpg', alt: 'Conversa de cliente agradecendo: maquiagem perfeita, durou até o final da formatura e atendimento maravilhoso' },
  { imagem: 'assets/images/depoimentos/depoimento-3.jpg', alt: 'Conversa de cliente: missão cumprida, terminou o dia com a make intacta' },
  { imagem: 'assets/images/depoimentos/depoimento-4.jpg', alt: 'Conversa de cliente: a maquiagem e o cabelo duraram a festa toda' },
];

(function () {
  const raiz = document.getElementById('depoimentos-lista');
  if (!raiz) return;
  const lista = (window.DEPOIMENTOS || []).filter((d) => d && (d.texto || d.imagem));
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt !== undefined) n.textContent = txt; return n; };

  (lista.length ? lista : [null, null, null]).forEach((d) => {
    const c = el('li', 'depoimento' + (d ? '' : ' depoimento--pendente') + (d && d.imagem ? ' depoimento--print' : ''));
    if (d && d.ficticio) c.appendChild(el('span', 'depoimento__selo', 'Exemplo de teste'));
    if (d && d.imagem) {
      const img = window.criarImagem({ src: d.imagem, alt: d.alt || 'Print de conversa com cliente' });
      if (img) c.appendChild(img);
    } else {
      c.insertAdjacentHTML('beforeend', '<i data-lucide="quote"></i>');
      if (d) {
        c.appendChild(el('p', 'depoimento__texto', d.texto));
        const rodape = el('footer', 'depoimento__autor');
        rodape.appendChild(el('strong', '', d.nome || ''));
        if (d.servico) rodape.appendChild(el('span', '', d.servico));
        c.appendChild(rodape);
      } else {
        c.appendChild(el('p', 'depoimento__texto', 'Depoimento de cliente — conteúdo pendente'));
        c.appendChild(el('footer', 'depoimento__autor')).appendChild(el('span', '', 'Nome da cliente · Serviço'));
      }
    }
    raiz.appendChild(c);
  });

  /* ---- Carrossel SO no celular (ate 480 px) ----
     Acima de 480 px a lista continua em grade (nada muda). Os controles abaixo ficam escondidos por CSS
     e a rolagem horizontal so existe no celular (css/sections.css). Sem bibliotecas: scroll-snap + setas +
     bolinhas. Navegacao por indice limitado entre o 1o e o ultimo depoimento (nao da a volta), sem
     "elastico" nas pontas e com recolocacao na foto mais proxima se o navegador parar entre duas
     (evita espaco em branco no Safari do iPhone), como no carrossel de Maquiagem Social. */
  const itens = Array.from(raiz.children);
  if (itens.length < 2) return;
  const celular = window.matchMedia('(max-width: 480px)');
  // Prints entram na tela deslizando: no celular carrega todos de uma vez (sao so 4 imagens leves).
  if (celular.matches) raiz.querySelectorAll('img').forEach((i) => { i.loading = 'eager'; });

  const envolt = el('div', 'depo-carrossel');
  raiz.parentNode.insertBefore(envolt, raiz);
  envolt.appendChild(raiz);
  raiz.setAttribute('role', 'group');
  raiz.setAttribute('aria-label', 'Depoimentos de clientes');

  const total = itens.length;
  const passo = () => (itens[1].offsetLeft - itens[0].offsetLeft) || raiz.clientWidth || 1;
  const atual = () => Math.min(total - 1, Math.max(0, Math.round(raiz.scrollLeft / passo())));
  let destino = 0;      // depoimento para onde o carrossel esta indo (cliques rapidos encadeiam)
  let tocando = false;  // dedo na tela
  let timer = 0;
  const ir = (i) => {
    destino = Math.min(total - 1, Math.max(0, i));
    raiz.scrollTo({ left: destino * passo(), behavior: 'smooth' });
  };

  const controles = el('div', 'depo-carrossel__controles');
  const mkSeta = (cls, rotulo, icone, dir) => {
    const b = el('button', 'depo-carrossel__seta ' + cls);
    b.type = 'button'; b.setAttribute('aria-label', rotulo);
    b.innerHTML = `<i data-lucide="${icone}"></i>`;
    b.addEventListener('click', () => ir(destino + dir));
    return b;
  };
  const ant = mkSeta('depo-carrossel__seta--ant', 'Depoimento anterior', 'chevron-left', -1);
  const prox = mkSeta('depo-carrossel__seta--prox', 'Próximo depoimento', 'chevron-right', 1);
  const pontos = el('div', 'depo-carrossel__pontos');
  const bolinhas = itens.map((_, i) => {
    const p = el('button', 'depo-carrossel__ponto');
    p.type = 'button'; p.setAttribute('aria-label', `Ir para o depoimento ${i + 1}`);
    p.addEventListener('click', () => ir(i));
    pontos.appendChild(p); return p;
  });
  controles.append(ant, pontos, prox);
  envolt.appendChild(controles);

  const atualizar = () => {
    const i = atual();
    bolinhas.forEach((p, j) => { p.classList.toggle('ativo', i === j); if (i === j) p.setAttribute('aria-current', 'true'); else p.removeAttribute('aria-current'); });
    ant.disabled = i === 0;            // setas respeitam os limites
    prox.disabled = i === total - 1;
  };
  const assentar = () => {
    if (tocando || !celular.matches) return;
    const i = atual();
    destino = i;
    if (Math.abs(raiz.scrollLeft - i * passo()) > 2) raiz.scrollTo({ left: i * passo(), behavior: 'auto' });
  };
  raiz.addEventListener('scroll', () => { atualizar(); clearTimeout(timer); timer = setTimeout(assentar, 120); }, { passive: true });
  raiz.addEventListener('touchstart', () => { tocando = true; }, { passive: true });
  const soltou = () => { tocando = false; clearTimeout(timer); timer = setTimeout(assentar, 120); };
  raiz.addEventListener('touchend', soltou, { passive: true });
  raiz.addEventListener('touchcancel', soltou, { passive: true });
  atualizar();
})();
