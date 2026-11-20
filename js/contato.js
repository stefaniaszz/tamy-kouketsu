/* Preenche cidade, Instagram e formas de pagamento a partir de js/config.js.
   (O endereco nao aparece no site: e enviado na confirmacao do agendamento, pelo WhatsApp.) */
(function () {
  const C = window.CONFIG || {};

  // Textos: <span data-config="cidade"></span>
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
})();
