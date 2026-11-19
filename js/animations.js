/* Revela elementos [data-reveal] quando entram na tela. */
(function () {
  const itens = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window)) { itens.forEach((i) => i.classList.add('visivel')); return; }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  itens.forEach((i) => obs.observe(i));
})();
