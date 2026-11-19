# Site — Tamy Kouketsu (Maquiadora e Designer · Torres/RS)

Site de uma página (landing page) em HTML, CSS e JavaScript puros. Sem frameworks, sem servidor e sem internet para os ícones (só as fontes vêm do Google Fonts).

## Como abrir no computador
- Dê dois cliques em `index.html`. Pronto.
- (Opcional) Servidor local: abra um terminal na pasta e rode `python -m http.server 8000`, depois acesse http://localhost:8000.

## Onde alterar cada coisa
| O que | Arquivo |
|---|---|
| WhatsApp, mensagem automática, Instagram, **endereço**, formas de pagamento | `js/config.js` |
| Serviços, **preços**, descrições, duração, condições de agendamento | `js/dados-servicos.js` |
| **Fotos** (topo, sobre, serviços, portfólio, vídeo) | `js/dados-imagens.js` + pasta `assets/` |
| **Depoimentos** (hoje são fictícios, só para teste) | `js/depoimentos.js` |
| Cores e fontes | `css/variables.css` |
| Textos fixos das seções | `index.html` |

### Endereço e mapa
Preencha `endereco`, `complemento` e `mapaBusca` em `js/config.js`. Enquanto estiver vazio, o mapa e o botão "Abrir no Maps" ficam ocultos.

### WhatsApp
O número fica em `whatsappNumero` (formato `55` + DDD + número, só dígitos).

### Fotos
Substitua o arquivo na pasta indicada mantendo o nome, ou ajuste o caminho em `js/dados-imagens.js`. Cada pasta de `assets/images/` tem um `LEIA-ME.txt`.

## Antes de publicar
1. Confirmar o número do WhatsApp e preencher o endereço do estúdio.
2. Trocar os depoimentos fictícios pelos prints reais (ou remover a seção).
3. Confirmar autorização das clientes para uso das fotos.
4. Informar a URL final em `index.html` (`canonical`, `og:url`, `og:image`) e em `robots.txt`.
5. Publicar a pasta inteira em qualquer hospedagem estática (Netlify, GitHub Pages, Vercel, Hostinger etc.).

## Estrutura
```
index.html  robots.txt  README.md
css/  variables base layout components sections animations
js/   config dados-* imagens servicos gallery nav animations depoimentos whatsapp agendamento contato icones main
assets/ logo/ images/ videos/
```
Ícones: Lucide (licença ISC), embutidos em `js/icones.js`.
