# LUCAS GG — Site Imobiliário

Projeto front-end estático com exemplos de página inicial, catálogo e página de detalhe de imóvel, incluindo integração de tours 3D (model-viewer) e suporte a tema claro/escuro.

Como usar localmente
- Abra `INDEX.HTML` no navegador (basta dar duplo-clique no arquivo) ou sirva com um servidor estático.

Observações importantes
- Número de WhatsApp usado nos links é placeholder. Atualize em `PROPERTY.JS` e nos links do header antes de publicar.
- Tema (dark/light) está persistido no `localStorage` e controlado pelo botão de tema no header.

Conteúdo do repositório
- `INDEX.HTML` — Página inicial
- `CATALOG.HTML` — Catálogo de imóveis (página separada)
- `PROPERTY.HTML` — Template de detalhe de imóvel (carrega por `?id=`)
- `STYLE.CSS` — Estilos globais e theming
- `SCRIPT.JS`, `CATALOG.JS`, `PROPERTY.JS` — Lógica do frontend

GitHub Actions
- Adicionado workflow básico (`.github/workflows/ci.yml`) que roda o `Super-Linter` para checar qualidade/formatacao do código em pushes e PRs.

Deploy
- Para publicar, crie um repositório no GitHub (já configurado neste projeto) e use GitHub Pages, Netlify ou outro host estático.

Contribuição
- Abra um pull request com alterações e o workflow do CI rodará automaticamente.

Contato
- Para dúvidas, atualize o arquivo `PROPERTY.JS` com o número da empresa e use o link de WhatsApp para contato rápido.
