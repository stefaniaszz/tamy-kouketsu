# Documentação — Site Tamy Kouketsu

Landing page de **Tamy Kouketsu — Maquiadora e Designer (Torres/RS)**.
Tecnologias: HTML5, CSS3 e JavaScript (ES6+), sem frameworks e sem back-end. Ícones Lucide embutidos localmente. Fontes: Google Fonts (Cormorant Garamond e Jost).

Última atualização desta documentação: 19/11/2026.

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

**GitHub Pages:** envie a pasta para um repositório e ative em Settings → Pages (branch `main`, pasta `/ (root)`). O site usa caminhos relativos e funciona dentro de subpasta (`usuario.github.io/repositorio/`).

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
css/
  variables.css       Cores, fontes, espaçamentos, altura do cabeçalho
  base.css            Reset e estilos gerais
  layout.css          Cabeçalho, menu mobile, rodapé, logo
  components.css      Botões, abas, cartões, carrossel, galeria, lightbox
  sections.css        Estilo de cada seção, formulário, modal, botão flutuante
  animations.css      Animações de entrada (reveal)
js/
  config.js           WhatsApp, mensagem, Instagram, endereço, pagamento
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
  contato.js          Preenche contato, Instagram, pagamento e mapa
  icones.js           Ícones Lucide embutidos (sem CDN)
  main.js             Inicialização
assets/
  logo/               logo.png e logo-original.png
  images/             hero, sobre, servicos, depoimentos, portfolio
  videos/             trabalho-1.mp4 e capa
originais/            Arquivos originais (fora do GitHub)
```

---

## 4. Seções da página

1. **Início (`#inicio`)** — foto em moldura de arco, título, botões "Agendar horário" e "Conhecer serviços".
2. **Sobre (`#sobre`)** — texto em primeira pessoa (aprovado), foto, números (+7 anos, 3 áreas, Torres).
3. **Serviços (`#servicos`)** — abas Maquiagem, Sobrancelhas e Cílios; cartões com carrossel de fotos, detalhes e preço "a partir de"; bloco de condições de agendamento.
4. **Portfólio (`#portfolio`)** — galeria com filtros, lightbox e vídeo; botão "Ver no Instagram".
5. **Diferenciais (`#diferenciais`)**.
6. **Depoimentos (`#depoimentos`)** — hoje fictícios (ver pendências).
7. **Localização (`#localizacao`)** — estúdio, cidade e mapa (mapa oculto enquanto não houver endereço).
8. **Contato (`#contato`)** — formulário de agendamento, botão do Instagram, estúdio e formas de pagamento.
9. **Rodapé** e **botão flutuante de WhatsApp**.

---

## 5. Onde editar (guia de manutenção)

### 5.1 `js/config.js`
- `whatsappNumero`: formato `55` + DDD + número, só dígitos. Atual: `5548999633286`.
- `mensagens.formulario`: texto automático enviado à Tamy. Marcadores: `{nome}`, `{telefone}`, `{servico}`, `{data}`. Use `*texto*` para negrito do WhatsApp.
- `instagramProfissional`: `@tamymaquiadora_`. `instagramEstudio`: `@coworking_de_beleza`.
- `endereco`, `complemento`, `referencia`, `mapaBusca`: **vazios**. Ao preencher, o mapa e o botão "Abrir no Maps" aparecem.
- `pagamento`: lista exibida no contato (Pix; débito e crédito com taxa fixa de R$ 5,00 à vista).

### 5.2 `js/dados-servicos.js`
- `prefixoPreco`: texto antes do valor (hoje "a partir de").
- Cada serviço tem id, nome, descrição, detalhes, preço e duração. Para mudar um valor, edite só o número do serviço.
- Serviços atuais: Maquiagem Beauty ou Social (R$ 120), Brow Lamination (R$ 110), Design com Henna Premium (R$ 50), Design Personalizado (R$ 40), Lash Lifting (R$ 110) e cílios Efeito Sirena, Foxy Eyes, Volume Brasileiro e Volume Egípcio (R$ 160 na primeira aplicação; manutenção a partir de R$ 70/80). Remoção de cílios: R$ 20.
- `CONDICOES_AGENDAMENTO`: sinal de 30%, multa de 50%, reagendamento com 48h de antecedência, tolerância de 10 minutos.

### 5.3 `js/dados-imagens.js` e `assets/`
- Troque o arquivo mantendo o nome, ou altere o caminho neste arquivo.
- `hero` = foto do topo; `sobre` = foto da seção Sobre; `servicos` = lista de fotos por serviço (várias fotos viram carrossel); `portfolio.extras` = fotos extras por categoria; `portfolio.videos` = vídeos.
- Se mudar a foto do topo, atualize também o `<link rel="preload">` no `<head>` do `index.html`.
- Cada pasta de `assets/images/` tem um `LEIA-ME.txt`.

### 5.4 `js/depoimentos.js`
- Lista `DEPOIMENTOS`. Os três atuais têm `ficticio: true`. Para usar print de conversa, preencha `imagem` com o caminho do arquivo em `assets/images/depoimentos/`.

### 5.5 `js/gallery.js`
- `POR_VEZ_CELULAR` (hoje 6): quantas fotos aparecem por vez no celular antes do "Ver mais". No computador aparecem todas.

### 5.6 CSS
- Cores e fontes: `css/variables.css`.
- Tamanho da logo: `css/layout.css` (52 px base, 44 px no celular, 68 px no computador).
- Os links de CSS no `index.html` têm `?v=2`. Ao fazer alterações grandes de estilo depois de publicar, aumente o número (`?v=3`…) para forçar a atualização no navegador das clientes.

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
- **Desempenho:** ícones locais (sem CDN), foto do topo pré-carregada, imagens abaixo da dobra com `loading="lazy"`, vídeo só toca enquanto está visível, fontes enxutas com `display=swap`.
- **SEO:** título e descrição, Open Graph, `theme-color`, JSON-LD (BeautySalon, sem endereço nem telefone), `robots.txt`.

---

## 8. O que já foi feito e testado

**Etapas concluídas:** 1 (planejamento), 2 a 5 (construção das seções, catálogo, carrossel, galeria, vídeo, formulário), 6 (revisão mobile, acessibilidade, desempenho, SEO) e 7 (testes finais e entrega).

**Pedidos extras atendidos:** valores com "a partir de"; fotos do catálogo no carrossel de cada serviço; vídeo sem som e com autoplay; mensagem automática com nome, telefone, procedimento e data; formulário em pop-up; foto do topo ("primeira foto") e da seção Sobre ("segunda foto"); depoimentos fictícios de teste; "Ver mais" no portfólio do celular; logo maior no computador; alinhamento de Estúdio e Formas de pagamento no celular; originais organizados em `originais/`.

**Testes automatizados (navegador headless):**
- 7 resoluções (320, 375, 414, 768, 1024, 1366 e 1920 px): sem rolagem lateral e sem erros de JavaScript.
- Formulário: vazio é bloqueado; preenchido gera o link `wa.me/5548999633286` com todos os dados.
- Âncoras internas sem link quebrado; 0 imagens quebradas; todas com `alt`; 1 `<h1>`.
- Menu mobile abre, fecha ao clicar e rola até a seção.
- Lightbox abre e navega pelo teclado; vídeo mudo, em loop e com autoplay.
- "Ver mais" do portfólio: 6 fotos iniciais, +6 por clique, reinicia ao trocar de filtro e some no computador.

**Limites dos testes:** o ambiente de teste não tem internet, então Google Fonts e o mapa do Google não foram vistos carregando, e nada foi testado em celular ou navegador reais.

---

## 9. Pendências (o que falta alterar ou verificar)

### Informações que dependem da Stefania/Tamy
| # | Pendência | Onde resolver |
|---|---|---|
| 1 | **Endereço correto do estúdio.** O do catálogo (Av. Barão do Rio Branco, Edifício Augusto Zortea, sala 602) foi informado como desatualizado. | `js/config.js` (`endereco`, `complemento`, `mapaBusca`) |
| 2 | **Depoimentos reais.** Os 3 atuais são fictícios; remover antes de publicar e usar prints de conversas. | `js/depoimentos.js` |
| 3 | **Autorização das clientes** para usar as fotos no site público. | — |
| 4 | **3 fotos sem classificação** (maquiagem, cílios ou sobrancelhas?). | `assets/images/portfolio/sem-classificacao/` + `js/dados-imagens.js` |
| 5 | Confirmar que a foto `E27E07FB…` é de **maquiagem** (foi usada como primeira foto de maquiagem). | `js/dados-imagens.js` |
| 6 | **Lash Lifting** tem só a foto do catálogo; incluir mais fotos se houver. | `js/dados-imagens.js` |
| 7 | **Favicon:** não foi criado, porque a logo é larga e não se deve inventar símbolo. Se a Tamy tiver um ícone quadrado, adicionar. | `index.html` (`<link rel="icon">`) |

### Ao publicar
| # | Tarefa |
|---|---|
| 8 | Colocar a URL final em `canonical`, `og:url` e `og:image` no `index.html` (há um comentário marcando o local) e no `robots.txt` (linha `Sitemap`). |
| 9 | Criar uma imagem de pré-visualização para `og:image` (para a prévia ao compartilhar o link no WhatsApp/Instagram). |
| 10 | Se houver domínio próprio, configurar na Vercel ou no GitHub Pages. |

### Verificações recomendadas
| # | Verificação |
|---|---|
| 11 | Abrir o site publicado em um **celular real** (iPhone e Android) e testar o agendamento de ponta a ponta. |
| 12 | Conferir se as **fontes do Google** carregam e se o **mapa** aparece depois de preencher o endereço. |
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
