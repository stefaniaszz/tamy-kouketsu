/* Menu responsivo + cabecalho que ganha fundo ao rolar. */
(function () {
  const header = document.querySelector('.header');
  const nav = document.getElementById('menu');
  const botao = document.querySelector('.nav__toggle');
  if (!header || !nav || !botao) return;

  const aoRolar = () => header.classList.toggle('header--solido', window.scrollY > 40);
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  const alternar = (abrir) => {
    nav.classList.toggle('nav--aberto', abrir);
    botao.setAttribute('aria-expanded', String(abrir));
    botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    if (abrir) header.classList.add('header--solido');
    else aoRolar();
  };

  botao.addEventListener('click', () => alternar(!nav.classList.contains('nav--aberto')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => alternar(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') alternar(false); });
})();
