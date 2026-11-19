/* Utilitarios do WhatsApp. Configuracao: js/config.js
   Os botoes "Agendar" abrem a janela de preenchimento (js/agendamento.js), que envia a mensagem. */
(function () {
  const C = window.CONFIG || {};
  const numero = String(C.whatsappNumero || '').replace(/\D/g, '');

  // Troca {marcadores} pelos valores; o que faltar fica em branco.
  const montar = (modelo, v) => String(modelo || '').replace(/\{(\w+)\}/g, (_, k) => (v && v[k]) || '');
  window.linkWhatsApp = (modelo, valores) => `https://wa.me/${numero}?text=${encodeURIComponent(montar(modelo, valores))}`;
  window.temWhatsApp = () => Boolean(numero);

  if (!numero) console.warn('WhatsApp: preencha "whatsappNumero" em js/config.js');
})();
