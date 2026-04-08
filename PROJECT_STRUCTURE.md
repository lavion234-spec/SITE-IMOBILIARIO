# 📁 Estrutura Visual do Projeto

```
SITE-IMOBILIARIO/ (ImoPrime)
│
├── 🌐 PÁGINAS HTML (Frontend)
│   ├── INDEX.HTML ..................... Página inicial com hero e carrossel
│   ├── CATALOG.HTML ................... Lista completa de imóveis com filtros
│   └── PROPERTY.HTML .................. Detalhes do imóvel + tour 3D
│
├── 🎨 ESTILOS (CSS)
│   ├── STYLE.CSS ...................... Estilos globais e tema
│   └── css/
│       └── accessibility.css .......... Estilos de acessibilidade (WCAG)
│
├── ⚙️ JAVASCRIPT (Módulos ES6)
│   └── js/
│       ├── app.js ..................... 🎯 Aplicação principal (orquestrador)
│       ├── config.js .................. 📋 Gerenciador de configurações
│       ├── utils.js ................... 🔧 20+ funções utilitárias
│       ├── theme.js ................... 🌓 Sistema de temas dark/light
│       ├── filters.js ................. 🔍 Gerenciador de filtros avançados
│       ├── carousel.js ................ 🎠 Carrossel acessível
│       └── modal.js ................... 🪟 Modais e tours 3D
│
├── 📊 DADOS (JSON)
│   ├── data/
│   │   └── properties.json ............ 🏠 Base de dados de imóveis
│   └── config/
│       └── site-config.json ........... ⚙️ Configurações do site
│
├── 📱 PWA (Progressive Web App)
│   ├── manifest.json .................. 📲 App manifest (instalação)
│   └── sw.js .......................... 🔄 Service Worker (cache/offline)
│
├── 🖼️ IMAGENS
│   └── imagem/
│       ├── casa beira mar.avif ........ Casa à beira-mar (local)
│       └── [outras imagens] ........... Imagens locais do projeto
│
├── 📚 DOCUMENTAÇÃO
│   ├── README_NEW.md .................. 📖 Documentação completa do projeto
│   ├── EXECUTIVE_SUMMARY.md ........... 📊 Sumário executivo (este arquivo!)
│   ├── IMPLEMENTATION_GUIDE.md ........ 🚀 Guia de implementação passo-a-passo
│   ├── INTERVIEW_GUIDE.md ............. 🎯 Guia para apresentar em entrevistas
│   ├── CHANGELOG.md ................... 📝 Histórico de mudanças
│   ├── CONTRIBUTING.md ................ 🤝 Guia de contribuição
│   └── LICENSE ........................ ⚖️ Licença MIT
│
└── 💾 BACKUPS
    └── backup_originals_2025-12-03/
        ├── INDEX.HTML ................. Versão original preservada
        ├── CATALOG.HTML ............... Versão original preservada
        ├── PROPERTY.HTML .............. Versão original preservada
        ├── SCRIPT.JS .................. Versão original preservada
        ├── CATALOG.JS ................. Versão original preservada
        ├── PROPERTY.JS ................ Versão original preservada
        └── STYLE.CSS .................. Versão original preservada

```

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────┐
│                    USUÁRIO ACESSA SITE                   │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│               INDEX.HTML / CATALOG.HTML                  │
│  • Carrega CSS (STYLE.CSS + accessibility.css)          │
│  • Carrega Módulo principal (app.js)                    │
│  • Registra Service Worker (sw.js)                      │
└─────────────────┬───────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│                    js/app.js (Main)                      │
│  1. Detecta página atual (home/catalog/property)        │
│  2. Carrega configurações (config.js)                   │
│  3. Inicializa módulos necessários                      │
└─────────────────┬───────────────────────────────────────┘
                  │
          ┌───────┴───────┐
          │               │
          ▼               ▼
┌──────────────┐  ┌──────────────┐
│  config.js   │  │  theme.js    │
│              │  │              │
│ ┌──────────┐ │  │ • Init tema  │
│ │Carrega:  │ │  │ • Toggle     │
│ │          │ │  │ • Persist    │
│ │properties│◄┼──┤              │
│ │.json     │ │  └──────────────┘
│ │          │ │
│ │site-     │ │
│ │config    │ │
│ │.json     │ │
│ └──────────┘ │
└──────────────┘
       │
       │ Dados carregados
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│              Inicialização Específica da Página          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  SE home/catalog:                                        │
│  ┌────────────────────────────────────────────┐        │
│  │ 1. filters.js → Configura filtros          │        │
│  │    • Location, bedrooms, price, search     │        │
│  │    • Debounce em inputs                    │        │
│  │                                             │        │
│  │ 2. carousel.js → Inicializa carrossel      │        │
│  │    • Auto-play configurável                │        │
│  │    • Controles acessíveis                  │        │
│  │                                             │        │
│  │ 3. modal.js → Setup tour 3D                │        │
│  │    • Botões "Tour 3D" configurados         │        │
│  │    • Focus management                      │        │
│  └────────────────────────────────────────────┘        │
│                                                          │
│  SE property:                                            │
│  ┌────────────────────────────────────────────┐        │
│  │ 1. Busca ID na URL (?id=apt-luxo-sp)       │        │
│  │ 2. Carrega dados do imóvel                 │        │
│  │ 3. Renderiza detalhes                      │        │
│  │ 4. Inicializa modelo 3D                    │        │
│  │ 5. Setup botões WhatsApp                   │        │
│  └────────────────────────────────────────────┘        │
│                                                          │
└─────────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────┐
│            USUÁRIO INTERAGE (Eventos)                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ • Filtrar imóveis ──────────► filters.js                │
│   └─► app.js renderiza resultados filtrados            │
│                                                          │
│ • Navegar carrossel ────────► carousel.js               │
│   └─► Prev/Next controls                               │
│                                                          │
│ • Abrir Tour 3D ─────────────► modal.js                 │
│   └─► TourModal.open3DTour(url)                        │
│                                                          │
│ • Toggle tema ───────────────► theme.js                 │
│   └─► Persiste em localStorage                         │
│                                                          │
│ • Agendar visita ────────────► utils.js (WhatsApp)      │
│   └─► window.open(whatsapp_url)                        │
│                                                          │
└─────────────────────────────────────────────────────────┘

```

## 🔧 Módulos e Responsabilidades

```
┌───────────────────────────────────────────────────────────┐
│                     js/app.js (Orquestrador)              │
├───────────────────────────────────────────────────────────┤
│ Responsabilidades:                                        │
│ • Detectar página atual                                   │
│ • Carregar configurações                                  │
│ • Inicializar módulos corretos                           │
│ • Coordenar comunicação entre módulos                    │
│ • Renderizar UI (cards, detalhes)                        │
│                                                           │
│ Métodos principais:                                       │
│ • init() ...................... Inicialização principal  │
│ • initHomePage() .............. Setup página home        │
│ • initCatalogPage() ........... Setup catálogo          │
│ • initPropertyPage() .......... Setup detalhes          │
│ • renderCatalogProperties() ... Renderiza cards         │
│ • createPropertyCard() ........ Cria HTML do card       │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                   js/config.js (Configuração)             │
├───────────────────────────────────────────────────────────┤
│ Responsabilidades:                                        │
│ • Carregar site-config.json                              │
│ • Carregar properties.json                               │
│ • Fornecer API de acesso aos dados                       │
│                                                           │
│ Métodos principais:                                       │
│ • loadConfig() ................ Carrega configurações   │
│ • loadProperties() ............ Carrega imóveis         │
│ • get(path) ................... Acessa config nested    │
│ • getProperty(id) ............. Busca imóvel por ID     │
│ • getProperties() ............. Retorna todos           │
│ • getFeaturedProperties() ..... Apenas destacados       │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                    js/utils.js (Utilitários)              │
├───────────────────────────────────────────────────────────┤
│ Responsabilidades:                                        │
│ • Funções helper reutilizáveis                           │
│ • Formatação (preço, número)                             │
│ • Performance (debounce, throttle)                       │
│ • Validações (email, phone)                              │
│ • DOM manipulation helpers                               │
│                                                           │
│ Funções principais (20+):                                 │
│ • formatPrice(price) .......... Formata moeda           │
│ • debounce(func, delay) ....... Otimiza eventos         │
│ • lazyLoadImages() ............ Lazy loading            │
│ • validateEmail(email) ........ Valida email            │
│ • scrollToElement(selector) ... Smooth scroll           │
│ • showNotification(msg) ....... Toast messages          │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                  js/theme.js (Gerenciador de Tema)        │
├───────────────────────────────────────────────────────────┤
│ Responsabilidades:                                        │
│ • Alternar tema dark/light                               │
│ • Persistir escolha (localStorage)                       │
│ • Detectar preferência do sistema                        │
│                                                           │
│ Métodos principais:                                       │
│ • init() ...................... Inicializa sistema      │
│ • toggle() .................... Alterna tema            │
│ • applyTheme(theme) ........... Aplica tema             │
│ • isDarkMode() ................ Verifica estado         │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                   js/filters.js (Filtros)                 │
├───────────────────────────────────────────────────────────┤
│ Responsabilidades:                                        │
│ • Gerenciar filtros de busca                             │
│ • Aplicar múltiplos filtros simultaneamente              │
│ • Debounce em busca textual                              │
│                                                           │
│ Métodos principais:                                       │
│ • init() ...................... Setup filtros           │
│ • filterProperties(props) ..... Filtra array            │
│ • setOnFilterChange(callback).. Callback de mudança     │
│ • reset() ..................... Limpa filtros           │
│ • hasActiveFilters() .......... Verifica se filtrado    │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                 js/carousel.js (Carrossel)                │
├───────────────────────────────────────────────────────────┤
│ Responsabilidades:                                        │
│ • Gerenciar slider de imóveis                            │
│ • Auto-play configurável                                 │
│ • Controles acessíveis                                   │
│ • Keyboard navigation                                    │
│                                                           │
│ Métodos principais:                                       │
│ • init() ...................... Inicializa             │
│ • show(index) ................. Mostra items           │
│ • next() ...................... Próximo                │
│ • previous() .................. Anterior               │
│ • start() ..................... Inicia auto-play       │
│ • pause() ..................... Pausa                  │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                    js/modal.js (Modais)                   │
├───────────────────────────────────────────────────────────┤
│ Responsabilidades:                                        │
│ • Gerenciar modais genéricos                             │
│ • TourModal para tours 3D                                │
│ • Focus management (WCAG)                                │
│ • Keyboard navigation (Esc, Tab)                         │
│                                                           │
│ Métodos principais:                                       │
│ Modal:                                                    │
│ • open(content) ............... Abre modal             │
│ • close() ..................... Fecha e restaura foco  │
│ • setContent(html) ............ Define conteúdo        │
│                                                           │
│ TourModal:                                                │
│ • open3DTour(url, title) ...... Abre tour 3D           │
└───────────────────────────────────────────────────────────┘
```

## 📦 Dependências

```
Externas:
├── Google Fonts (Inter) ............. Tipografia
├── Google Model Viewer .............. Tours 3D (Web Component)
└── Unsplash Images .................. Imagens de exemplo

Internas (Todos criados no projeto):
├── Site Config JSON ................. Configurações
├── Properties JSON .................. Dados dos imóveis
├── Service Worker ................... Cache e offline
├── Manifest .........................PWA installable
└── 7 Módulos ES6 .................... Lógica da aplicação
```

## 🎯 Entry Points

```
Para cada página:

INDEX.HTML:
  └─► js/app.js (type="module")
      └─► detecta página = "home"
          └─► initHomePage()
              ├─► carousel.js
              ├─► filters.js
              ├─► modal.js (tour 3D)
              └─► theme.js

CATALOG.HTML:
  └─► js/app.js (type="module")
      └─► detecta página = "catalog"
          └─► initCatalogPage()
              ├─► filters.js
              ├─► modal.js (tour 3D)
              ├─► renderCatalogProperties()
              └─► theme.js

PROPERTY.HTML:
  └─► js/app.js (type="module")
      └─► detecta página = "property"
          └─► initPropertyPage()
              ├─► renderPropertyDetails()
              ├─► model-viewer (3D)
              ├─► setupScheduleButtons()
              └─► theme.js

Service Worker:
  └─► sw.js (registrado em todas as páginas)
      ├─► Cacheia assets
      ├─► Serve offline
      └─► Network/Cache strategies
```

---

**Agora você tem uma visão completa e visual de TODO o projeto! 🚀**
