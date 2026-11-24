/* ==========================================================================
   >>> ALTERAR SERVICOS E VALORES — EDITE SOMENTE ESTE ARQUIVO <<<
   ==========================================================================
   Fonte dos dados: catalogo da Tamy (PDF).

   Como mudar um PRECO:   altere o numero em  preco: 120   (use ponto, sem R$).
   Como mudar um TEXTO:   altere descricao, detalhes ou observacao.
   Como ADICIONAR servico: copie um bloco { ... } de dentro de "servicos" e
                           troque os dados (o "id" precisa ser unico e igual
                           ao usado em js/dados-imagens.js para a foto).
   Como REMOVER servico:  apague o bloco { ... } correspondente.

   "icone" usa nomes da biblioteca Lucide (clock, sparkles, calendar, check...).
   ========================================================================== */
window.SERVICOS = {
  /* Texto exibido antes de cada preco (valores sujeitos a alteracao conforme o caso).
     Para mostrar o preco sem prefixo, deixe '' (vazio). */
  prefixoPreco: 'a partir de',

  categorias: [

    /* ------------------------------ MAQUIAGEM ------------------------------ */
    {
      id: 'maquiagem',
      nome: 'Maquiagem',
      servicos: [
        {
          id: 'maquiagem-social',
          nome: 'Maquiagem Social',
          descricao: 'Ideal para eventos especiais e ocasiões que exigem uma produção mais elaborada. Uma maquiagem completa, com pele de alta durabilidade, acabamento sofisticado, olhos mais trabalhados e cílios inclusos. Pensada para acompanhar você durante eventos mais longos, mantendo a beleza e a elegância por muito mais tempo.',
          detalhes: [
            { icone: 'sparkles', texto: 'Cílios inclusos' },
            { icone: 'heart', texto: 'Pele de alta durabilidade' },
          ],
          preco: 200,
          precoLegenda: '',
        },
        {
          id: 'maquiagem-express',
          nome: 'Maquiagem Express',
          descricao: 'Ideal para eventos mais curtos, ensaios fotográficos e ocasiões que pedem uma produção mais leve. Uma maquiagem delicada e natural, com poucos detalhes e acabamento suave, valorizando sua beleza sem excessos.',
          detalhes: [
            { icone: 'info', texto: 'Não inclui cílios postiços' },
          ],
          preco: 160,
          precoLegenda: '',
        },
      ],
    },

    /* ----------------------------- SOBRANCELHAS ---------------------------- */
    {
      id: 'sobrancelhas',
      nome: 'Sobrancelhas',
      servicos: [
        {
          id: 'brow-lamination',
          nome: 'Brow Lamination',
          descricao: 'Procedimento químico para laminar as sobrancelhas, trazendo mais volume e espessura e cobrindo falhas. Trabalhamos o formato e a grossura conforme você deseja.',
          detalhes: [
            { icone: 'clock', texto: 'Atendimento: 40 min a 1h30' },
            { icone: 'calendar', texto: 'Durabilidade: 30 a 45 dias' },
            { icone: 'check', texto: 'Henna ou tintura inclusa' },
          ],
          preco: 150,
          precoLegenda: '',
        },
        {
          id: 'design-henna-premium',
          nome: 'Design com Henna Premium',
          descricao: 'Design estratégico personalizado para o formato das suas sobrancelhas, com aplicação de henna, que pigmenta a pele, cobre falhas, traz volume e corrige assimetrias.',
          detalhes: [
            { icone: 'clock', texto: 'Atendimento: 40 min a 1h30' },
            { icone: 'calendar', texto: 'Durabilidade: 5 a 8 dias' },
          ],
          preco: 70,
          precoLegenda: '',
        },
        {
          id: 'design-sobrancelhas-tintura',
          nome: 'Design de Sobrancelhas + Tintura',
          descricao: 'O procedimento inclui o design personalizado das sobrancelhas e a aplicação da tintura, que proporciona coloração uniforme, intensifica a tonalidade dos pelos, valoriza o desenho das sobrancelhas e pigmenta fios brancos.',
          detalhes: [
            { icone: 'info', texto: 'Observação profissional: diferente da henna, a tintura tem como principal função colorir os fios, não criar um preenchimento intenso na pele. O resultado fica mais voltado à definição e valorização dos pelos naturais.' },
          ],
          preco: 95,
          precoLegenda: '',
        },
        {
          id: 'design-personalizado',
          nome: 'Design Personalizado',
          descricao: 'Mapeamento natural, com foco na epilação dos pelos, para harmonizar as sobrancelhas e manter um design pensado para o seu rosto.',
          detalhes: [
            { icone: 'clock', texto: 'Atendimento: 30 min a 1h' },
            { icone: 'check', texto: 'Incluso spa de sobrancelhas e crescimento dos pelos' },
          ],
          preco: 40,
          precoLegenda: '',
        },
      ],
    },

    /* -------------------------------- CILIOS ------------------------------- */
    {
      id: 'cilios',
      nome: 'Cílios',
      /* Aviso exibido abaixo dos cartoes desta categoria (deixe '' para ocultar) */
      observacao: 'Remoção de extensão feita por outra profissional, antes da nova aplicação: taxa de R$ 50,00, além do valor dos novos cílios. Avise com antecedência, no agendamento, se precisar de remoção.',
      servicos: [
        {
          id: 'lash-lifting',
          nome: 'Lash Lifting',
          descricao: 'Curvatura dos cílios naturais, que realça o olhar e traz mais praticidade para usar rímel. Indicado para cílios médios ou longos.',
          detalhes: [
            { icone: 'clock', texto: 'Atendimento: 1h a 1h40' },
            { icone: 'calendar', texto: 'Durabilidade: 30 a 60 dias, com avaliação anterior' },
            { icone: 'check', texto: 'Tintura inclusa, caso necessário' },
          ],
          preco: 150,
          precoLegenda: '',
        },
        {
          id: 'cilios-efeito-sirena',
          grupo: 'Extensão de cílios',
          nome: 'Efeito Sirena',
          descricao: 'Fio 5D (LU/M) com efeito focado em preencher de 50% a 60% do canto externo do olho, trazendo aquele efeito delineado.',
          detalhes: [
            { icone: 'clock', texto: 'Atendimento: 1h' },
            { icone: 'refresh-cw', texto: 'Manutenção até 20 dias: a partir de R$ 90,00' },
          ],
          preco: 180,
          precoLegenda: 'primeira aplicação',
        },
        {
          id: 'cilios-foxy-eyes',
          grupo: 'Extensão de cílios',
          nome: 'Foxy Eyes',
          descricao: 'Fio leve e natural: o efeito queridinho de quem gosta de algo natural, mas que ainda assim seja marcante nos olhos.',
          detalhes: [
            { icone: 'refresh-cw', texto: 'Manutenção até 21 dias ou 50% dos cílios: a partir de R$ 90,00' },
          ],
          preco: 180,
          precoLegenda: 'primeira aplicação',
        },
        {
          id: 'cilios-vol-brasileiro',
          grupo: 'Extensão de cílios',
          nome: 'Volume Brasileiro',
          descricao: 'Fio Y, com volume intermediário que varia conforme a quantidade dos seus cílios naturais.',
          detalhes: [
            { icone: 'refresh-cw', texto: 'Manutenção até 21 dias ou 50% dos fios: a partir de R$ 90,00' },
          ],
          preco: 180,
          precoLegenda: 'primeira aplicação',
        },
        {
          id: 'cilios-vol-egipcio',
          grupo: 'Extensão de cílios',
          nome: 'Volume Egípcio',
          descricao: 'Fio 5D em formato W, trazendo mais volume e preenchimento, com 1 fio de extensão aplicado por fio natural.',
          detalhes: [
            { icone: 'refresh-cw', texto: 'Manutenção até 21 dias ou 50% dos cílios: a partir de R$ 90,00' },
          ],
          preco: 180,
          precoLegenda: 'primeira aplicação',
        },
      ],
    },
  ],
};

/* ==========================================================================
   CONDICOES DE AGENDAMENTO — exibidas abaixo dos servicos.
   Edite, adicione ou apague itens da lista conforme necessario.
   ========================================================================== */
window.CONDICOES_AGENDAMENTO = {
  titulo: 'Condições de agendamento',
  itens: [
    { icone: 'wallet',        texto: 'Sinal de 30% do valor do procedimento no ato do agendamento.' },
  ],
};
