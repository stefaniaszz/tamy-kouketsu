# Documentação — Site Tamy Kouketsu

Landing page de **Tamy Kouketsu — Maquiadora e Designer (Torres/RS)**.
Tecnologias: HTML5, CSS3 e JavaScript (ES6+), sem frameworks e sem back-end. Ícones Lucide e fontes (Cormorant Garamond e Jost) hospedados no próprio site, sem depender de CDN ou Google.

Última atualização desta documentação: 19/11/2026 (noite).

---

## 1. Resumo do projeto

- **Objetivo:** apresentar os serviços, mostrar o portfólio e levar a cliente ao agendamento pelo WhatsApp.
- **Identidade visual:** feminina, minimalista e premium.
- **Paleta:**

| Uso | Cor |
|---|---|
| Café (fundo escuro, texto) | `#493329` |
| Marrom secundário | `#80634D` |
| Dourado (destaques) | `#C5A46D` |
| Dourado escurecido (só texto sobre fundo claro) | `#7D5F2E` |
| Off-white (fundo claro) | `#F5F0E9` |

- **Regra do projeto:** não inventar logo, símbolos, serviços, preços, durações, endereços, depoimentos ou links de contato. Tudo o que aparece veio do catálogo ou foi informado pela cliente.

---

## 2. Como rodar e publicar

**Rodar localmente:** dê dois cliques em `index.html`. Opcionalmente, rode `python -m http.server 8000` na pasta e abra `http://localhost:8000`.

**GitHub Pages:** o repositório é `stefaniaszz/tamy-kouketsu` (branch `main`) e a publicação é feita pelo workflow `.github/workflows/jekyll-gh-pages.yml` a cada `git push`. Em Settings → Pages, a fonte deve ser "GitHub Actions". O site usa caminhos relativos e funciona dentro de subpasta (`usuario.github.io/repositorio/`).

**Vercel:** importe o mesmo repositório em vercel.com/new, framework "Other", sem build command e sem output directory. Publica a cada `git push`.

**Pasta `originais/`:** guarda as fotos e vídeos originais (HEIC, MOV etc.). O site não depende dela e ela está no `.gitignore`, então não é enviada ao GitHub.

---

## 3. Estrutura de arquivos

```
index.html            Estrutura e textos fixos
robots.txt            Regras para buscadores
README.md             Resumo rápido
DOCUMENTACAO.md       Este arquivo
.gitignore
.github/workflows/  Publicação no GitHub Pages (jekyll-gh-pages.yml)
css/
  fonts.css           Declaração das fontes locais (assets/fonts)
  variables.css       Cores, fontes, espaçamentos, altura do cabeçalho
  base.css            Reset e estilos gerais
  layout.css          Cabeçalho, menu mobile, rodapé, logo
  components.css      Botões, abas, cartões, carrossel, galeria, lightbox
  sections.css        Estilo de cada seção, formulário, modal, botão flutuante
  animations.css      Animações de entrada (reveal)
js/
  config.js           WhatsApp, mensagem, Instagram, cidade, pagamento
  dados-servicos.js   Serviços, preços, condições de agendamento
  dados-imagens.js    Caminho de todas as imagens e vídeos
  depoimentos.js      Depoimentos e o código que os desenha
  imagens.js          Funções de imagem e carrossel
  servicos.js         Desenha abas, cartões e condições
  gallery.js          Portfólio: filtros, "Ver mais", lightbox, vídeo
  nav.js              Menu mobile
  animations.js       Animação ao rolar (IntersectionObserver)
  whatsapp.js         Monta o link wa.me
  agendamento.js      Formulário em pop-up e validação
  contato.js          Preenche cidade, Instagram e pagamento
  icones.js           Ícones Lucide embutidos (sem CDN)
  main.js             Inicialização
assets/
  fonts/              Fontes em woff2 (latin)
  logo/               logo.png e logo-original.png
  favicon/            Favicon "TK" (.ico, 32, 192, 512 e apple-touch-icon), feito a partir da logo
  images/             hero, sobre, servicos, depoimentos (depoimento-1..4.jpg), portfolio
  videos/             trabalho-1.mp4 e capa
originais/            Arquivos originais (fora do GitHub)
```

---

## 4. Seções da página

1. **Início (`#inicio`)** — foto em retângulo vertical (2:3) com cantos arredondados e borda dourada, título, botões "Agendar horário" e "Conhecer serviços".
2. **Sobre (`#sobre`)** — texto em primeira pessoa (aprovado), foto, números (+7 anos, 3 áreas, Torres).
3. **Serviços (`#servicos`)** — abas Maquiagem, Sobrancelhas e Cílios; cartões com carrossel de fotos, detalhes e preço "a partir de"; bloco de condições de agendamento.
4. **Portfólio (`#portfolio`)** — galeria com filtros, lightbox e vídeo; botão "Ver no Instagram".
5. **Diferenciais (`#diferenciais`)**.
6. **Depoimentos (`#depoimentos`)** — 4 prints de conversas de clientes (4 por linha no desktop; carrossel de um por vez no celular, até 480 px).
7. **Localização (`#localizacao`)** — cidade, estúdio e aviso de que o endereço é enviado na confirmação do agendamento (sem endereço nem mapa na página).
8. **Contato (`#contato`)** — formulário de agendamento, botão do Instagram, estúdio e formas de pagamento.
9. **Rodapé** e **botão flutuante de WhatsApp**.

---

## 5. Onde editar (guia de manutenção)

### 5.1 `js/config.js`
- `whatsappNumero`: formato `55` + DDD + número, só dígitos. Atual: `5548999633286`.
- `mensagens.formulario`: texto automático enviado à Tamy. Marcadores: `{nome}`, `{telefone}`, `{servico}`, `{data}`. Use `*texto*` para negrito do WhatsApp.
- `instagramProfissional`: `@tamymaquiadora_`. `instagramEstudio`: `@coworking_de_beleza`.
- Endereço: não é exibido no site; é enviado na confirmação do agendamento, pelo WhatsApp.
- `pagamento`: lista exibida no contato (Pix; débito e crédito com taxa fixa de R$ 5,00 à vista).

### 5.2 `js/dados-servicos.js`
- `prefixoPreco`: texto antes do valor (hoje "a partir de").
- Cada serviço tem id, nome, descrição, detalhes, preço e duração. Para mudar um valor, edite só o número do serviço.
- Serviços atuais (valores do catálogo de 19/11): Maquiagem Social (R$ 200), Maquiagem Express (R$ 160), Brow Lamination (R$ 150), Design com Henna Premium (R$ 70), Design de Sobrancelhas + Tintura (R$ 95), Design Personalizado (R$ 50), Lash Lifting (R$ 150) e cílios Efeito Sirena, Foxy Eyes, Volume Brasileiro e Volume Egípcio (R$ 180 na primeira aplicação; manutenção a partir de R$ 90). Os preços aparecem com "a partir de". Remoção de cílios: R$ 20 (ver pendências).
- `CONDICOES_AGENDAMENTO`: hoje só o sinal de 30% do valor do procedimento no ato do agendamento (multa, reagendamento e tolerância de atraso foram removidos em 24/11). Para incluir outra condição, acrescente uma linha em `itens` (a lista é centralizada em `css/components.css`).

### 5.3 `js/dados-imagens.js` e `assets/`
- Troque o arquivo mantendo o nome, ou altere o caminho neste arquivo.
- `hero` = foto do topo; `sobre` = foto da seção Sobre; `servicos` = lista de fotos por serviço (várias fotos viram carrossel); `portfolio.extras` = fotos extras por categoria; `portfolio.videos` = vídeos.
- Se mudar a foto do topo, atualize também o `<link rel="preload">` no `<head>` do `index.html`.
- Cada pasta de `assets/images/` tem um `LEIA-ME.txt`.

### 5.4 `js/depoimentos.js`
- Lista `DEPOIMENTOS`: hoje 4 prints (`assets/images/depoimentos/depoimento-1.jpg` a `depoimento-4.jpg`). Para adicionar outro, coloque a imagem na pasta e acrescente uma linha com `imagem` e `alt`. O mesmo arquivo cria o carrossel do celular (setas e bolinhas, só até 480 px).

### 5.5 `js/gallery.js`
- `POR_VEZ_CELULAR` (hoje 6): quantas fotos aparecem por vez no celular antes do "Ver mais". No computador aparecem todas.

### 5.6 CSS
- Cores e fontes: `css/variables.css`.
- Tamanho da logo: `css/layout.css` (52 px base, 44 px no celular, 68 px no computador).
- Os links de CSS no `index.html` têm `?v=3` (`sections.css`, `dados-servicos.js` e `depoimentos.js` já estão em `?v=4`). Ao fazer alterações de estilo depois de publicar, aumente o número (`?v=4`…) para forçar a atualização no navegador das clientes.

---

## 6. Como funciona o agendamento

1. A cliente clica em **Agendar** (cartão de serviço, botão do topo ou botão flutuante).
2. Abre um **pop-up** com campos: nome, telefone (com máscara), procedimento e data desejada (não aceita data passada).
3. Ao enviar, o site valida os campos. Se algo estiver vazio, bloqueia.
4. Abre o WhatsApp da Tamy com a mensagem pronta, já informando que a disponibilidade será consultada antes da confirmação.

Motivo do pop-up: a cliente não consegue apagar campos da mensagem, e a Tamy recebe tudo padronizado. O mesmo formulário também existe fixo na seção Contato.

---

## 7. Acessibilidade, desempenho e SEO

- **Acessibilidade:** link "Pular para o conteúdo"; foco visível; menu com `aria-expanded` e rótulo que muda (Abrir/Fechar menu); galeria e filtros com `aria-pressed`; lightbox em `<dialog>` com teclado e gesto de deslizar; todas as imagens com `alt`; um único `<h1>`; respeita `prefers-reduced-motion`; contraste de texto corrigido (dourado `#7D5F2E` sobre fundo claro).
- **Desempenho:** ícones locais (sem CDN), foto do topo pré-carregada, imagens abaixo da dobra com `loading="lazy"`, vídeo só toca enquanto está visível, fontes locais com pré-carregamento e `display=swap`.
- **SEO:** título e descrição, Open Graph, `theme-color`, JSON-LD (BeautySalon, sem endereço nem telefone), `robots.txt`.

---

## 8. O que já foi feito e testado

**Etapas concluídas:** 1 (planejamento), 2 a 5 (construção das seções, catálogo, carrossel, galeria, vídeo, formulário), 6 (revisão mobile, acessibilidade, desempenho, SEO) e 7 (testes finais e entrega).

**Revisão mobile (19/11):** fontes passaram a ser locais (evita texto trocando de fonte ao carregar); números em estilo alinhado (a Cormorant usa números "antigos" por padrão); trava de rolagem lateral (`overflow-x: clip` e `overscroll-behavior-x`); o deslize do carrossel não arrasta mais a página; quebra de linha dos títulos balanceada.

**Atualização de 19/11 (tarde):** endereço e mapa removidos da página; prints de depoimentos reais no lugar dos fictícios; valores atualizados conforme o catálogo novo; Maquiagem Beauty ou Social substituída por Maquiagem Social (R$ 200) e Maquiagem Express (R$ 160); novo serviço Design de Sobrancelhas + Tintura (R$ 95), com 3 fotos.

**Atualização de 19/11 (noite):** os 3 depoimentos de fundo vermelho (Instagram) foram removidos, restando 4 prints de conversa;  taxa de remoção de extensão confirmada em R$ 50; autorização das clientes (prints e fotos) confirmada pela Tamy; depoimentos trocados pelos prints novos (`depoimento-1..4.jpg`), exibidos 4 por linha no desktop, 2 no tablet e 1 no celular estreito (`css/sections.css`); favicon "TK" criado a partir da logo e ligado no `<head>`; commit `c8c896d` feito no clone local (o `git push` precisa ser rodado no terminal do computador).

**Ajustes de 24/11:** (1) Condições de agendamento reduzidas ao sinal de 30%, com o bloco centralizado; (2) em Design de Sobrancelhas + Tintura, a primeira foto do carrossel passou a ser `design-sobrancelhas-tintura-3.jpg` (close com olhos fechados, que antes era a última), seguida de `design-sobrancelhas-tintura.jpg` e `-2.jpg` (ordem original das demais); (3) `maquiagem-beauty-social-2.jpg` (mulher deitada com colar de cruz) saiu do carrossel de Maquiagem Social. O arquivo da foto continua em `assets/images/servicos/` para uso futuro.

**Correção de toque nos carrosséis (24/11):** passar as fotos rápido no celular podia ser lido como duplo toque e dar zoom na página. Foi aplicado `touch-action: manipulation` em `.carrossel` e nos seus elementos (`css/components.css`): o duplo toque deixa de dar zoom, mas rolagem, arraste e zoom por pinça continuam. O viewport não foi alterado (zoom global liberado) e o JS dos carrosséis não mudou.

**Carrossel de Maquiagem Social sem loop, protegido contra foto em branco (25/11):** no iPhone, ao puxar além da última foto o espaço da foto ficava em branco. Foi testada uma versão circular (última ↔ primeira), mas ela foi **removida** a pedido: o carrossel volta a parar na primeira e na última foto, como os demais. A proteção continua, sem loop: em `js/servicos.js` a opção é `criarCarrossel(fotos, { protegido: true })` (só para esse serviço; lógica em `js/imagens.js`). Setas e bolinhas navegam por índice absoluto limitado entre a 1ª e a última foto (a seta para na ponta, sem saltos); o arraste é o nativo do navegador; sem "elástico" nas pontas (`overscroll-behavior-x: none` em `.carrossel--protegido`, `css/components.css`); e, quando a rolagem para, a pista é recolocada na foto mais próxima se o navegador a deixar entre duas fotos. Os demais carrosséis não mudaram; para estender a proteção a eles, troque a condição `s.id === 'maquiagem-social'` em `js/servicos.js`.

**Preço do Design Personalizado e depoimentos em carrossel no celular (25/11):** (1) o preço de "Design Personalizado" (sobrancelhas) passou de R$ 40 para **R$ 50,00** em `js/dados-servicos.js`; o preço é lido só dali, então o card é o único lugar onde aparece (os demais serviços não mudaram). (2) Em telas de até 480 px os depoimentos viram um carrossel: um print por vez, com setas, bolinhas e arraste com o dedo (`js/depoimentos.js` cria os controles; estilos no fim do bloco de depoimentos em `css/sections.css`). Acima de 480 px a grade continua igual (os controles ficam escondidos). A navegação para na primeira e na última (sem loop), sem "elástico" nas pontas e com recolocação no print mais próximo se o navegador parar entre dois (mesma proteção do carrossel de Maquiagem Social); `touch-action: manipulation` evita o zoom por duplo toque. Nenhuma biblioteca nova; textos, imagens e ordem dos depoimentos não mudaram. Para o Safari do iPhone não usar arquivos antigos, `sections.css`, `dados-servicos.js` e `depoimentos.js` agora são chamados com `?v=4` no `index.html`.

**Nova foto principal (24/11):** `assets/images/hero/hero.jpg` foi substituída pela fotografia enviada (1714×2576 px, retrato colorido, usada sem filtro nem retoque; os pixels são idênticos ao arquivo recebido). A foto anterior (preto e branco) continua no histórico do Git. Ajustes visuais em `css/sections.css`: a moldura em arco virou um retângulo vertical na proporção natural da foto (`aspect-ratio: 2 / 3`), com `border-radius` nos quatro cantos (`--raio-hero`, de 20 px no celular a 28 px no computador, aplicado também ao filete dourado de trás); largura máxima do computador de 440 para 400 px, para o retrato inteiro caber na primeira tela em 1366×768 (no celular continua `min(78%, 340px)`). Em `js/dados-imagens.js`: `object-position` `50% 30%` (a proporção da moldura é a da foto, então quase não há corte) e novo texto alternativo, já que o anterior descrevia um retrato em preto e branco. O `object-fit: cover` já era o padrão e foi mantido. Zoom leve de 10% na foto (`transform: scale(var(--zoom-hero, 1.1))`, centrado em 50% 40%, o `.midia` corta o excesso): para mudar, ajuste `--zoom-hero` em `css/sections.css` (1 = sem zoom). Títulos, textos, botões e cores não mudaram.

**Pedidos extras atendidos:** valores com "a partir de"; fotos do catálogo no carrossel de cada serviço; vídeo sem som e com autoplay; mensagem automática com nome, telefone, procedimento e data; formulário em pop-up; foto do topo ("primeira foto") e da seção Sobre ("segunda foto"); depoimentos de teste (já substituídos pelos reais); "Ver mais" no portfólio do celular; logo maior no computador; alinhamento de Estúdio e Formas de pagamento no celular; originais organizados em `originais/`.

**Testes automatizados (navegador headless):**
- 7 resoluções (320, 375, 414, 768, 1024, 1366 e 1920 px): sem rolagem lateral e sem erros de JavaScript.
- Formulário: vazio é bloqueado; preenchido gera o link `wa.me/5548999633286` com todos os dados.
- Âncoras internas sem link quebrado; 0 imagens quebradas; todas com `alt`; 1 `<h1>`.
- Menu mobile abre, fecha ao clicar e rola até a seção.
- Lightbox abre e navega pelo teclado; vídeo mudo, em loop e com autoplay.
- "Ver mais" do portfólio: 6 fotos iniciais, +6 por clique, reinicia ao trocar de filtro e some no computador.

**Limites dos testes:** o ambiente de teste não tem internet e nada foi testado em celular ou navegador reais nem no deploy real do GitHub Pages.

---

## 9. Pendências (o que falta alterar ou verificar)

### Informações que dependem da Stefania/Tamy
| # | Pendência | Onde resolver |
|---|---|---|
| 1 | **Valor da remoção de extensão:** havia divergência no catálogo (R$ 50 x R$ 20). Confirmado pela cliente: R$ 50 (já ajustado no site). | `js/dados-servicos.js` |
| 2 | ~~Autorização das clientes~~ — confirmada pela Tamy em 19/11. Os prints atuais não mostram nomes de clientes. | — |
| 3 | ~~Autorização das clientes para as fotos~~ — confirmada pela Tamy em 19/11. | — |
| 4 | **3 fotos sem classificação** (maquiagem, cílios ou sobrancelhas?). | `assets/images/portfolio/sem-classificacao/` + `js/dados-imagens.js` |
| 5 | Confirmar que a foto `E27E07FB…` é de **maquiagem** (foi usada como primeira foto de maquiagem). | `js/dados-imagens.js` |
| 6 | **Lash Lifting** tem só a foto do catálogo; incluir mais fotos se houver. | `js/dados-imagens.js` |
| 7 | **Favicon:** criado com as iniciais "TK" recortadas da própria logo (sem símbolo novo) em `assets/favicon/` e ligado no `<head>`. Conferir se a Tamy aprova o visual. | `index.html` |

### Ao publicar
| # | Tarefa |
|---|---|
| 7a | Rodar `git push origin main` no terminal do computador (o commit `c8c896d` já existe no clone) e conferir se o workflow do GitHub Pages terminou sem erro. |
| 8 | Colocar a URL final em `canonical`, `og:url` e `og:image` no `index.html` (há um comentário marcando o local) e no `robots.txt` (linha `Sitemap`). |
| 9 | Criar uma imagem de pré-visualização para `og:image` (para a prévia ao compartilhar o link no WhatsApp/Instagram). |
| 10 | Se houver domínio próprio, configurar na Vercel ou no GitHub Pages. |

### Verificações recomendadas
| # | Verificação |
|---|---|
| 11 | Abrir o site publicado em um **celular real** (iPhone e Android) e testar o agendamento de ponta a ponta. |
| 12 | Conferir a aparência dos prints de depoimento em celulares reais. |
| 13 | Testar em Chrome, Safari e Edge. |
| 14 | Fazer uma mensagem de teste de verdade para o WhatsApp da Tamy e confirmar que o número abre a conversa certa. |
| 15 | Rodar o relatório do Lighthouse (Chrome → F12 → Lighthouse) depois de publicado. |
| 16 | Ver se a Tamy aprova os textos de "Diferenciais" e "Sobre" na versão final. |
| 17 | Considerar reduzir o peso do vídeo e das fotos se o carregamento no 4G estiver lento. |

---

## 10. Observações técnicas

- Os caracteres especiais da mensagem do WhatsApp são codificados com `encodeURIComponent`. Mudanças em `mensagens.formulario` devem manter os marcadores entre chaves.
- Ao editar `js/config.js`, evite apagar vírgulas e aspas: um erro de sintaxe derruba todo o JavaScript do site. Depois de editar, abra o site e confira o menu e o agendamento.
- Ícones novos: o arquivo `js/icones.js` só tem os 24 ícones em uso. Para usar outro ícone Lucide, é preciso adicioná-lo a esse arquivo.
- Licenças: ícones Lucide (ISC); fontes Cormorant Garamond e Jost (SIL Open Font License).
- Número de WhatsApp registrado no site: +55 48 99963-3286.
