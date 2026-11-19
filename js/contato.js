/* Preenche contatos, endereco, mapa e Instagram a partir de js/config.js. */
(function () {
  const C = window.CONFIG || {};

  // Textos: <span data-config="endereco"></span>
  document.querySelectorAll('[data-config]').forEach((n) => { if (C[n.dataset.config]) n.textContent = C[n.dataset.config]; });

  // Links do Instagram: data-instagram="profissional" | "estudio"
  document.querySelectorAll('[data-instagram]').forEach((a) => {
    const ig = a.dataset.instagram === 'estudio' ? C.instagramEstudio : C.instagramProfissional;
    if (!ig) return;
    a.href = ig.url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    const alvo = a.querySelector('[data-usuario]'); if (alvo) alvo.textContent = '@' + ig.usuario;
  });

  // Formas de pagamento
  const lista = document.getElementById('pagamento-lista');
  if (lista && C.pagamento) C.pagamento.forEach((t) => { const li = document.createElement('li'); li.textContent = t; lista.appendChild(li); });

  // Sem endereco confirmado: esconde endereco/mapa e mostra o aviso
  if (!C.endereco && !C.mapaBusca) {
    document.querySelectorAll('[data-com-endereco]').forEach((n) => { n.hidden = true; });
    document.querySelectorAll('[data-sem-endereco]').forEach((n) => { n.hidden = false; });
    const g = document.querySelector('.local__grade'); if (g) g.classList.add('local__grade--sem-mapa');
  }

  // Mapa (Google Maps, sem chave de API) + link "Abrir no Google Maps"
  if (C.mapaBusca) {
    const q = encodeURIComponent(C.mapaBusca);
    const caixa = document.getElementById('mapa');
    if (caixa) {
      const f = document.createElement('iframe');
      f.src = `https://maps.google.com/maps?q=${q}&output=embed`;
      f.title = 'Mapa com a localização do estúdio em Torres/RS';
      f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
      caixa.replaceChildren(f);
    }
    document.querySelectorAll('[data-mapa-link]').forEach((a) => {
      a.href = `https://www.google.com/maps/search/?api=1&query=${q}`;
      a.target = '_blank'; a.rel = 'noopener noreferrer';
    });
  }
})();
