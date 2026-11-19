/* ==========================================================================
   >>> ALTERAR IMAGENS E VIDEOS DO SITE — EDITE SOMENTE ESTE ARQUIVO <<<
   ==========================================================================
   COMO TROCAR OU ADICIONAR UMA FOTO
     1. Coloque a foto na pasta indicada (ex.: assets/images/servicos/).
        Use .jpg ou .webp (o navegador NAO abre .heic) e ~900 a 1200 px de largura.
     2. Escreva o caminho dela na lista do servico/categoria abaixo.
     3. Pronto: se um servico tiver mais de 1 foto, o cartao ganha CARROSSEL
        automaticamente, e todas as fotos aparecem tambem no PORTFOLIO.

   Cada foto pode ser so o caminho:   'assets/images/servicos/foto.jpg'
   ou, se quiser ajustar o recorte e a descricao (acessibilidade):
        { src: 'assets/images/servicos/foto.jpg', alt: 'descricao', posicao: '50% 30%' }
   (posicao = parte da foto que fica visivel no recorte; '50% 30%' = centro, um pouco acima)

   Para deixar um espaco "conteudo pendente", use lista vazia [] ou  src: ''.
   ========================================================================== */
window.IMAGENS = {

  /* Foto de destaque (secao inicial) */
  hero: {
    src: 'assets/images/hero/hero.jpg',
    alt: 'Retrato em preto e branco de Tamy Kouketsu',
    posicao: '50% 18%',
  },

  /* Foto da secao "Sobre".
     Outros retratos ja prontos em assets/images/sobre/: tamy-2.jpg a tamy-5.jpg */
  sobre: {
    src: 'assets/images/sobre/sobre.jpg',
    alt: 'Tamy Kouketsu, maquiadora e designer',
    posicao: '50% 20%',
  },

  /* FOTOS DE CADA SERVICO — a chave deve ser igual ao "id" do servico em
     js/dados-servicos.js. A primeira foto da lista e a que aparece primeiro. */
  servicos: {
    'maquiagem-beauty-social': [
      'assets/images/servicos/maquiagem-beauty-social.jpg',
      'assets/images/servicos/maquiagem-beauty-social-2.jpg',
      'assets/images/servicos/maquiagem-beauty-social-3.jpg',
      'assets/images/servicos/maquiagem-beauty-social-4.jpg',
      'assets/images/servicos/maquiagem-beauty-social-5.jpg',
    ],
    'brow-lamination': [
      'assets/images/servicos/brow-lamination.jpg',
      'assets/images/servicos/brow-lamination-2.jpg',
      'assets/images/servicos/brow-lamination-3.jpg',
    ],
    'design-henna-premium': [
      'assets/images/servicos/design-henna-premium.jpg',
      'assets/images/servicos/design-henna-premium-2.jpg',
      'assets/images/servicos/design-henna-premium-3.jpg',
    ],
    'design-personalizado': [
      'assets/images/servicos/design-personalizado.jpg',
      'assets/images/servicos/design-personalizado-2.jpg',
    ],
    'lash-lifting': [
      'assets/images/servicos/lash-lifting.jpg',          // foto do catalogo (sem fotos proprias ainda)
    ],
    'cilios-efeito-sirena': [
      'assets/images/servicos/cilios-efeito-sirena.jpg',
      'assets/images/servicos/cilios-efeito-sirena-2.jpg',
    ],
    'cilios-foxy-eyes': [
      'assets/images/servicos/cilios-foxy-eyes.jpg',
      'assets/images/servicos/cilios-foxy-eyes-2.jpg',
    ],
    'cilios-vol-brasileiro': [
      'assets/images/servicos/cilios-vol-brasileiro.jpg',
    ],
    'cilios-vol-egipcio': [
      'assets/images/servicos/cilios-vol-egipcio.jpg',
      'assets/images/servicos/cilios-vol-egipcio-2.jpg',
    ],
  },

  /* PORTFOLIO
     As fotos dos servicos acima entram sozinhas no portfolio, na categoria certa.
     Aqui voce adiciona o que for SO do portfolio (fotos extras e videos). */
  portfolio: {
    // Fotos extras: categorias 'maquiagem', 'cilios' e 'sobrancelhas'
    extras: {
      maquiagem: [],
      cilios: [],
      sobrancelhas: [],
    },
    // Videos (.mp4). "poster" = imagem de capa. categoria: 'maquiagem' | 'cilios' | 'sobrancelhas'
    videos: [
      {
        src: 'assets/videos/trabalho-1.mp4',
        poster: 'assets/videos/trabalho-1-capa.jpg',
        titulo: 'Cílios e sobrancelhas',
        categoria: 'cilios',
      },
    ],
  },
};
