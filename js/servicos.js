/* Monta as abas e os cartoes de servicos a partir de js/dados-servicos.js
   (precos e textos) e js/dados-imagens.js (fotos). Nao precisa editar aqui. */
(function () {
  const raiz = document.getElementById('servicos-conteudo');
  const dados = window.SERVICOS;
  if (!raiz || !dados) return;

  const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const el = (tag, cls, texto) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (texto !== undefined) n.textContent = texto;
    return n;
  };

  function criarCartao(s, categoria) {
    const c = el('article', 'cartao-servico');

    const midia = el('div', 'midia cartao-servico__foto');
    // Fotos do servico: js/dados-imagens.js (mais de 1 foto = carrossel automatico)
    const fotos = window.listaImagens((window.IMAGENS.servicos || {})[s.id], s.nome);
    if (fotos.length) midia.appendChild(window.criarCarrossel(fotos, { circular: s.id === 'maquiagem-social' }));
    else {
      const p = el('div', 'placeholder');
      p.innerHTML = '<i data-lucide="image"></i><span>Foto do serviço<br>conteúdo pendente</span>';
      midia.appendChild(p);
    }
    c.appendChild(midia);

    const corpo = el('div', 'cartao-servico__corpo');
    if (s.grupo) corpo.appendChild(el('span', 'cartao-servico__grupo', s.grupo));
    corpo.appendChild(el('h3', 'cartao-servico__nome', s.nome));
    corpo.appendChild(el('p', 'cartao-servico__descricao', s.descricao));

    if (s.detalhes && s.detalhes.length) {
      const ul = el('ul', 'cartao-servico__detalhes');
      s.detalhes.forEach((d) => {
        const li = el('li');
        li.innerHTML = `<i data-lucide="${d.icone || 'check'}"></i>`;
        li.appendChild(el('span', '', d.texto));
        ul.appendChild(li);
      });
      corpo.appendChild(ul);
    }

    const rodape = el('div', 'cartao-servico__rodape');
    const preco = el('div', 'cartao-servico__preco');
    if (dados.prefixoPreco) preco.appendChild(el('span', 'cartao-servico__prefixo', dados.prefixoPreco));
    preco.appendChild(el('strong', '', moeda(s.preco)));
    if (s.precoLegenda) preco.appendChild(el('small', '', s.precoLegenda));
    rodape.appendChild(preco);

    // Botao de agendamento. Na Etapa 5 o WhatsApp usara o atributo data-servico
    // para montar a mensagem; ate la, leva a secao de contato.
    const btn = el('a', 'btn btn--escuro', 'Agendar');
    btn.href = '#contato';
    btn.dataset.servico = s.nome;
    btn.dataset.categoria = categoria.nome;
    rodape.appendChild(btn);

    corpo.appendChild(rodape);
    c.appendChild(corpo);
    return c;
  }

  const abas = el('div', 'abas');
  abas.setAttribute('role', 'tablist');
  abas.setAttribute('aria-label', 'Categorias de serviços');
  const paineis = el('div', 'paineis');

  dados.categorias.forEach((cat, i) => {
    const aba = el('button', 'abas__botao', cat.nome);
    aba.type = 'button';
    aba.id = `aba-${cat.id}`;
    aba.setAttribute('role', 'tab');
    aba.setAttribute('aria-controls', `painel-${cat.id}`);
    abas.appendChild(aba);

    const painel = el('div', 'painel');
    painel.id = `painel-${cat.id}`;
    painel.setAttribute('role', 'tabpanel');
    painel.setAttribute('aria-labelledby', aba.id);
    const grade = el('div', 'servicos__grade');
    cat.servicos.forEach((s) => grade.appendChild(criarCartao(s, cat)));
    painel.appendChild(grade);
    if (cat.observacao) painel.appendChild(el('p', 'servicos__observacao', cat.observacao));
    paineis.appendChild(painel);
  });

  raiz.append(abas, paineis);

  // Condicoes de agendamento (dados em js/dados-servicos.js > CONDICOES_AGENDAMENTO)
  const cond = window.CONDICOES_AGENDAMENTO;
  if (cond && cond.itens && cond.itens.length) {
    const bloco = el('div', 'condicoes');
    bloco.appendChild(el('h3', 'condicoes__titulo', cond.titulo));
    const ul = el('ul', 'condicoes__lista');
    cond.itens.forEach((i) => {
      const li = el('li');
      li.innerHTML = `<i data-lucide="${i.icone || 'check'}"></i>`;
      li.appendChild(el('span', '', i.texto));
      ul.appendChild(li);
    });
    bloco.appendChild(ul);
    raiz.appendChild(bloco);
  }

  const botoes = [...abas.children];
  const lista = [...paineis.children];
  function ativar(i, foco) {
    botoes.forEach((b, j) => {
      b.setAttribute('aria-selected', String(i === j));
      b.tabIndex = i === j ? 0 : -1;
      lista[j].hidden = i !== j;
    });
    if (foco) botoes[i].focus();
  }
  botoes.forEach((b, i) => {
    b.addEventListener('click', () => ativar(i));
    b.addEventListener('keydown', (e) => {                // setas do teclado
      if (e.key === 'ArrowRight') ativar((i + 1) % botoes.length, true);
      if (e.key === 'ArrowLeft') ativar((i - 1 + botoes.length) % botoes.length, true);
    });
  });
  ativar(0);
})();
