# ImoPrime - Imobiliária Premium 🏢

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)]()

> Plataforma imobiliária moderna com tours 3D interativos, filtros avançados e experiência premium para compra e venda de imóveis.

## 🌟 Funcionalidades

### Core Features
- ✅ **Tours 3D Interativos**: Visualização de imóveis com modelos 3D usando Google Model Viewer
- ✅ **Filtros Avançados**: Busca por localização, quartos, faixa de preço e características
- ✅ **Tema Dark/Light**: Alternância de tema com persistência local
- ✅ **Design Responsivo**: Interface adaptável para mobile, tablet e desktop
- ✅ **PWA Ready**: Progressive Web App com suporte offline
- ✅ **SEO Otimizado**: Meta tags, Open Graph, structured data (JSON-LD)
- ✅ **Acessibilidade WCAG**: ARIA labels, navegação por teclado, screen reader friendly

### Tecnologias

**Frontend:**
- HTML5 Semântico
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript ES6+ (Modules, Async/Await)
- Google Model Viewer (Web Components)

**Arquitetura:**
- Modular ES6 Architecture
- Separation of Concerns (SoC)
- Event-Driven Design
- Lazy Loading & Performance Optimization

**PWA:**
- Service Worker para cache e offline
- Web App Manifest
- Installable App

## 📁 Estrutura do Projeto

```
LUCAS GG/
├── INDEX.HTML              # Página inicial
├── CATALOG.HTML            # Catálogo de imóveis
├── PROPERTY.HTML           # Detalhes do imóvel
├── STYLE.CSS               # Estilos globais
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
│
├── config/
│   └── site-config.json    # Configurações do site
│
├── data/
│   └── properties.json     # Base de dados de imóveis
│
├── js/
│   ├── app.js              # Aplicação principal
│   ├── config.js           # Gerenciador de configurações
│   ├── utils.js            # Funções utilitárias
│   ├── theme.js            # Gerenciador de temas
│   ├── filters.js          # Sistema de filtros
│   ├── carousel.js         # Carrossel de imóveis
│   └── modal.js            # Modais e tours 3D
│
├── imagem/
│   └── *.avif/*.jpg        # Imagens locais
│
└── backup_originals_2025-12-03/
    └── *                   # Backups dos arquivos originais
```

## 🚀 Como Usar

### Instalação Local

1. **Clone o repositório:**
```bash
git clone https://github.com/lavion234-spec/SITE-IMOBILIARIO.git
cd SITE-IMOBILIARIO
```

2. **Inicie um servidor local:**

Usando Python:
```bash
python -m http.server 8000
```

Usando Node.js (http-server):
```bash
npx http-server -p 8000
```

Usando PHP:
```bash
php -S localhost:8000
```

3. **Acesse no navegador:**
```
http://localhost:8000/INDEX.HTML
```

### Deploy em Produção

#### GitHub Pages
1. Vá em Settings > Pages
2. Source: Deploy from branch `main`
3. Folder: `/ (root)`
4. Save

#### Netlify
```bash
# netlify.toml já configurado
netlify deploy --prod
```

#### Vercel
```bash
vercel --prod
```

## 🎨 Personalização

### Configurar Dados do Site

Edite `config/site-config.json`:

```json
{
  "site": {
    "name": "Seu Nome",
    "url": "https://seusite.com"
  },
  "contact": {
    "phone": "5511999999999",
    "email": "seu@email.com"
  }
}
```

### Adicionar Imóveis

Edite `data/properties.json`:

```json
{
  "properties": [
    {
      "id": "novo-imovel",
      "title": "Título do Imóvel",
      "price": 1000000,
      "location": {
        "city": "São Paulo",
        "state": "SP"
      },
      ...
    }
  ]
}
```

### Customizar Tema

Edite variáveis CSS em `STYLE.CSS`:

```css
:root {
  --accent: #0b6b9e;
  --gold: #c9a14a;
  --radius: 12px;
  ...
}
```

## 📊 Performance

### Métricas Lighthouse (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### Otimizações Implementadas
- ✅ Lazy loading de imagens
- ✅ Service Worker para cache
- ✅ CSS otimizado (sem frameworks pesados)
- ✅ JavaScript modular (tree-shaking ready)
- ✅ Compressão de assets
- ✅ Preconnect para fontes externas

## ♿ Acessibilidade

### WCAG 2.1 Level AA Compliance
- ✅ Estrutura semântica HTML5
- ✅ ARIA labels e roles
- ✅ Navegação por teclado
- ✅ Contraste de cores adequado
- ✅ Textos alternativos descritivos
- ✅ Foco visível
- ✅ Screen reader friendly

### Testes Recomendados
- NVDA / JAWS (screen readers)
- Lighthouse Accessibility Audit
- axe DevTools
- Navegação apenas por teclado

## 🔧 Desenvolvimento

### Roadmap
- [ ] Backend API (Node.js/Express)
- [ ] Autenticação de usuários
- [ ] Dashboard administrativo
- [ ] Sistema de favoritos
- [ ] Comparador de imóveis
- [ ] Calculadora de financiamento
- [ ] Integração com CRM
- [ ] Chat ao vivo

### Scripts Úteis

```bash
# Validar HTML
npx html-validate *.HTML

# Minificar CSS
npx cssnano STYLE.CSS -o STYLE.min.CSS

# Minificar JS
npx terser js/*.js -o js/bundle.min.js

# Lighthouse CI
npx lighthouse INDEX.HTML --view
```

## 📱 PWA - Progressive Web App

### Instalação
O site pode ser instalado como app nativo:
1. Acesse o site pelo navegador
2. Chrome: Menu > "Instalar app"
3. iOS Safari: Compartilhar > "Adicionar à Tela Inicial"

### Funcionalidades Offline
- Cache de páginas principais
- Visualização de imóveis já carregados
- Tema persiste offline

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature incrível'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- Use ES6+ modern JavaScript
- Siga convenções de nomenclatura (camelCase para JS, kebab-case para CSS)
- Comente código complexo
- Mantenha funções pequenas e focadas
- Teste acessibilidade

## 📞 Suporte

- 📧 Email: contato@imoprime.com
- 💬 WhatsApp: (11) 99999-9999
- 🐛 Issues: [GitHub Issues](https://github.com/lavion234-spec/SITE-IMOBILIARIO/issues)

## 🙏 Agradecimentos

- Google Model Viewer
- Unsplash (imagens)
- Font Inter (Google Fonts)
- Comunidade de desenvolvedores

---

**Desenvolvido com ❤️ para o futuro do mercado imobiliário**

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!
