/* ==========================================================================
   CONFIGURACOES DO SITE — contatos, links e mensagens. EDITE AQUI.
   ========================================================================== */
window.CONFIG = {

  /* WhatsApp: DDI + DDD + numero, SO NUMEROS (sem +, espacos ou tracos).
     Informado: +55 48 9963-3286.  */
  whatsappNumero: '554899633286',

  /* MENSAGEM DO WHATSAPP — montada com os dados que a cliente preenche no formulario
     (nome, telefone, procedimento e data), para ela nao apagar nada na conversa.
     Marcadores: {nome} {telefone} {servico} {data}
     "\n" = quebra de linha; *texto* = negrito no WhatsApp; _texto_ = italico. */
  mensagens: {
    formulario: 'Olá, Tamy! Vim pelo site e quero agendar.\n\n*Nome:* {nome}\n*Telefone:* {telefone}\n*Procedimento:* {servico}\n*Data desejada:* {data}\n\n_Sei que a disponibilidade será consultada antes da confirmação._',
  },

  instagramProfissional: { usuario: 'tamymaquiadora_',    url: 'https://www.instagram.com/tamymaquiadora_/' },
  instagramEstudio:      { usuario: 'coworking_de_beleza', url: 'https://www.instagram.com/coworking_de_beleza/' },

  /* ENDERECO — PENDENTE DE CONFIRMACAO.
     O endereco do catalogo (Av. Barao do Rio Branco, Edificio Augusto Zortea, sala 602)
     foi informado como DESATUALIZADO e por isso nao e exibido.
     Preencha os campos abaixo: endereco e mapa aparecem sozinhos no site. */
  cidade: 'Torres/RS',
  endereco: '',        // ex.: 'Rua Exemplo, 123'
  complemento: '',     // ex.: 'Sala 4'
  referencia: '',      // ex.: 'Em frente a ...'
  mapaBusca: '',       // texto usado no Google Maps, ex.: 'Rua Exemplo, 123, Torres, RS'

  /* Formas de pagamento (fonte: catalogo) */
  pagamento: ['Pix', 'Débito e crédito (taxa fixa de R$ 5,00 à vista)'],
};
