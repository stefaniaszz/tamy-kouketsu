/* ==========================================================================
   >>> ALTERAR DEPOIMENTOS — EDITE A LISTA ABAIXO <<<
   Dois formatos (pode misturar):
     1) Texto:  { nome: 'Nome', servico: 'Lash Lifting', texto: 'Texto do depoimento' }
     2) Print de conversa:  { imagem: 'assets/images/depoimentos/print-1.jpg', alt: 'Conversa com cliente' }
        (coloque os prints na pasta assets/images/depoimentos/)
   ATENCAO: os 3 itens abaixo com  ficticio: true  sao SO PARA TESTE e aparecem com
   a etiqueta "Exemplo de teste". APAGUE-OS antes de publicar o site.
   ========================================================================== */
window.DEPOIMENTOS = [
  { ficticio: true, nome: 'Ana (exemplo)',     servico: 'Lash Lifting',
    texto: 'Amei o resultado! Atendimento super cuidadoso e o olhar ficou bem mais marcante.' },
  { ficticio: true, nome: 'Camila (exemplo)',  servico: 'Brow Lamination',
    texto: 'Minhas sobrancelhas ficaram com muito mais volume e o formato que eu queria. Recomendo!' },
  { ficticio: true, nome: 'Juliana (exemplo)', servico: 'Maquiagem Beauty ou Social',
    texto: 'Maquiagem linda e que durou a festa toda. A Tamy entendeu exatamente o que eu pedi.' },
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
