# Site — Tamy Kouketsu (Maquiadora e Designer · Torres/RS)

Site de uma página (landing page) em HTML, CSS e JavaScript puros. Sem frameworks, sem servidor e sem depender de CDN (ícones e fontes ficam dentro do próprio projeto).

## Como abrir no computador
- Dê dois cliques em `index.html`. Pronto.
- (Opcional) Servidor local: abra um terminal na pasta e rode `python -m http.server 8000`, depois acesse http://localhost:8000.

## Onde alterar cada coisa
| O que | Arquivo |
|---|---|
| WhatsApp, mensagem automática, Instagram, cidade, formas de pagamento | `js/config.js` |
| Serviços, **preços**, descrições, duração, condições de agendamento | `js/dados-servicos.js` |
| **Fotos** (topo, sobre, serviços, portfólio, vídeo) | `js/dados-imagens.js` + pasta `assets/` |
| **Depoimentos** (4 prints de clientes, 4 por linha) | `js/depoimentos.js` + `assets/images/depoimentos/` |
| **Favicon** ("TK", feito da logo) | `assets/favicon/` + `<head>` do `index.html` |
| Cores e fontes | `css/variables.css` |
| Textos fixos das seções | `index.html` |

### Endereço
O endereço não aparece no site: é enviado à cliente na confirmação do agendamento, pelo WhatsApp.

### WhatsApp
O número fica em `whatsappNumero` (formato `55` + DDD + número, só dígitos).

### Fotos
Substitua o arquivo na pasta indicada mantendo o nome, ou ajuste o caminho em `js/dados-imagens.js`. Cada pasta de `assets/images/` tem um `LEIA-ME.txt`.

## Antes de publicar
1. Fazer um teste real de agendamento pelo WhatsApp.
2. Autorização das clientes para prints e fotos: confirmada pela Tamy em 19/11.
3. Informar a URL final em `index.html` (`canonical`, `og:url`, `og:image`) e em `robots.txt`.
4. Publicar a pasta inteira em qualquer hospedagem estática (Netlify, GitHub Pages, Vercel, Hostinger etc.).

## Estrutura
```
index.html  robots.txt  README.md
css/  variables base layout components sections animations
js/   config dados-* imagens servicos gallery nav animations depoimentos whatsapp agendamento contato icones main
assets/ logo/ favicon/ images/ videos/
```
Ícones: Lucide (licença ISC), embutidos em `js/icones.js`.
