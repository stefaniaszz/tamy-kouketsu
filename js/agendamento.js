/* AGENDAMENTO: a cliente preenche nome, telefone, procedimento e data; o site monta a
   mensagem (js/config.js > mensagens.formulario) e abre o WhatsApp com ela pronta.
   - Todo botao "Agendar" (servicos, inicio, botao flutuante) abre uma JANELA com o formulario.
   - A secao "Vamos agendar?" tem o mesmo formulario na propria pagina.
   Os procedimentos vem de js/dados-servicos.js. */
(function () {
  const base = document.getElementById('form-agendamento');
  if (!base) return;

  /* ---------- Janela (modal): copia do formulario da pagina ---------- */
  const dlg = document.createElement('dialog');
  dlg.className = 'modal-agendamento';
  dlg.setAttribute('aria-labelledby', 'modal-titulo');
  const copia = base.cloneNode(true);
  copia.id = 'form-agendamento-modal';
  copia.querySelector('#form-aviso').id = 'form-aviso-modal';
  copia.removeAttribute('data-reveal');
  dlg.innerHTML = `
    <button type="button" class="modal-agendamento__fechar" aria-label="Fechar"><i data-lucide="x"></i></button>
    <h2 id="modal-titulo">Agendar horário</h2>
    <p class="modal-agendamento__sub">Preencha os dados para enviar sua solicitação à Tamy pelo WhatsApp.</p>`;
  dlg.appendChild(copia);
  document.body.appendChild(dlg);
  dlg.querySelector('.modal-agendamento__fechar').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });   // clicar fora fecha

  /* ---------- Logica comum aos dois formularios ---------- */
  function ligar(form, aviso, aoEnviar) {
    const sel = form.elements.servico;
    ((window.SERVICOS || {}).categorias || []).forEach((cat) => {
      const g = document.createElement('optgroup'); g.label = cat.nome;
      cat.servicos.forEach((s) => { const o = document.createElement('option'); o.value = o.textContent = s.nome; g.appendChild(o); });
      sel.appendChild(g);
    });
    const hoje = new Date(); hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    form.elements.data.min = hoje.toISOString().slice(0, 10);

    // Mascara de telefone: (00) 00000-0000
    form.elements.telefone.addEventListener('input', (e) => {
      const d = e.target.value.replace(/\D/g, '').slice(0, 11);
      e.target.value = d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`
        : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (!window.temWhatsApp()) { aviso.textContent = 'WhatsApp ainda não configurado.'; return; }
      const [a, m, d] = form.elements.data.value.split('-');
      const link = window.linkWhatsApp((window.CONFIG.mensagens || {}).formulario, {
        nome: form.elements.nome.value.trim(),
        telefone: form.elements.telefone.value.trim(),
        servico: sel.value,
        data: `${d}/${m}/${a}`,
      });
      window.open(link, '_blank', 'noopener');
      aviso.textContent = 'Abrindo o WhatsApp… Basta enviar a mensagem para a Tamy.';
      if (aoEnviar) aoEnviar();
    });
  }
  ligar(base, document.getElementById('form-aviso'));
  ligar(copia, document.getElementById('form-aviso-modal'), () => setTimeout(() => dlg.close(), 1200));

  /* ---------- Botoes "Agendar": abrem a janela ---------- */
  document.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-whatsapp], [data-servico]');
    if (!botao) return;
    e.preventDefault();
    copia.reset();
    document.getElementById('form-aviso-modal').textContent = '';
    if (botao.dataset.servico) copia.elements.servico.value = botao.dataset.servico;  // procedimento ja escolhido
    dlg.showModal();
    copia.elements.nome.focus();
  });
})();
