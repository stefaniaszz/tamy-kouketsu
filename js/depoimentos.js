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
})();
