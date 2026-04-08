# Guia de Contribuição

Obrigado por considerar contribuir com o ImoPrime! 🎉

## 📋 Como Contribuir

### 1. Fork o Projeto
```bash
git clone https://github.com/lavion234-spec/SITE-IMOBILIARIO.git
cd SITE-IMOBILIARIO
```

### 2. Crie uma Branch
```bash
git checkout -b feature/MinhaNovaFeature
# ou
git checkout -b fix/CorrecaoDeBug
```

### 3. Faça suas Alterações

#### Padrões de Código

**JavaScript:**
- Use ES6+ (const/let, arrow functions, async/await)
- CamelCase para variáveis e funções
- PascalCase para classes
- Comente código complexo
- Máximo 80 caracteres por linha quando possível

```javascript
// ✅ Bom
const fetchProperties = async () => {
  try {
    const response = await fetch('/api/properties');
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// ❌ Evite
function getProps() {
  fetch('/api/properties').then(r => r.json()).then(d => console.log(d))
}
```

**CSS:**
- Use kebab-case para classes
- Mobile-first approach
- Variáveis CSS para cores e espaçamentos
- BEM methodology quando aplicável

```css
/* ✅ Bom */
.property-card {
  display: flex;
  gap: var(--spacing-md);
}

.property-card__title {
  font-size: var(--font-lg);
}

/* ❌ Evite */
.PropertyCard {
  display: flex;
  gap: 16px;
}
```

**HTML:**
- Estrutura semântica
- ARIA labels quando necessário
- Alt text descritivo em imagens
- Indentação consistente (tabs ou 2 espaços)

```html
<!-- ✅ Bom -->
<article class="property-card" role="article">
  <img src="..." alt="Apartamento moderno de 3 quartos em São Paulo" loading="lazy">
  <h3>Título do Imóvel</h3>
</article>

<!-- ❌ Evite -->
<div class="card">
  <img src="...">
  <div>Título</div>
</div>
```

### 4. Teste suas Alterações

```bash
# Inicie servidor local
python -m http.server 8000

# Teste:
# - Funcionalidade funciona?
# - Não quebrou nada existente?
# - Responsivo mobile/tablet/desktop?
# - Acessível via teclado?
# - Lighthouse score mantido?
```

### 5. Commit suas Mudanças

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git add .
git commit -m "feat: adicionar filtro por tipo de imóvel"
# ou
git commit -m "fix: corrigir bug no carrossel mobile"
# ou
git commit -m "docs: atualizar README com instruções de deploy"
```

**Tipos de commit:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (não afeta código)
- `refactor`: Refatoração de código
- `perf`: Melhoria de performance
- `test`: Adicionar testes
- `chore`: Tarefas de manutenção

### 6. Push para o GitHub
```bash
git push origin feature/MinhaNovaFeature
```

### 7. Abra um Pull Request

No GitHub:
1. Vá para o repositório original
2. Clique em "Pull Request"
3. Clique em "New Pull Request"
4. Selecione sua branch
5. Preencha o template (veja abaixo)

## 📝 Template de Pull Request

```markdown
## Descrição
[Descreva suas mudanças em detalhes]

## Tipo de Mudança
- [ ] Bug fix (não-quebra)
- [ ] Nova feature (não-quebra)
- [ ] Breaking change (quebra funcionalidade existente)
- [ ] Documentação

## Como Testar?
1. [Passo 1]
2. [Passo 2]
3. [Verificar que...]

## Checklist
- [ ] Código segue o style guide do projeto
- [ ] Comentei código complexo
- [ ] Atualizei documentação
- [ ] Não quebrei funcionalidade existente
- [ ] Testei em diferentes navegadores
- [ ] Testei acessibilidade (teclado/screen reader)
- [ ] Lighthouse score mantido (>90)

## Screenshots (se aplicável)
[Adicione screenshots ou GIFs]
```

## 🐛 Reportar Bugs

Use o template de Issue:

```markdown
## Descrição do Bug
[Descrição clara e concisa do bug]

## Como Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## Comportamento Esperado
[O que deveria acontecer]

## Screenshots
[Se aplicável, adicione screenshots]

## Ambiente
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Versão: [e.g. 1.0.0]

## Informações Adicionais
[Qualquer outra informação relevante]
```

## 💡 Sugerir Features

```markdown
## Descrição da Feature
[Descrição clara e concisa da feature]

## Problema que Resolve
[Explique o problema que esta feature resolve]

## Solução Proposta
[Como você imagina que funcione]

## Alternativas Consideradas
[Outras soluções que você considerou]

## Exemplos
[Exemplos de implementação ou referências]
```

## 🎨 Design Guidelines

### Cores
```css
--accent: #0b6b9e    /* Azul principal */
--gold: #c9a14a      /* Dourado para destaque */
--text-light: #0b1b2b /* Texto tema claro */
--text-dark: #eaf6ff  /* Texto tema escuro */
```

### Espaçamentos
```css
--spacing-xs: 0.25rem  /* 4px */
--spacing-sm: 0.5rem   /* 8px */
--spacing-md: 1rem     /* 16px */
--spacing-lg: 1.5rem   /* 24px */
--spacing-xl: 2rem     /* 32px */
```

### Tipografia
```css
--font-sm: 0.875rem   /* 14px */
--font-base: 1rem     /* 16px */
--font-lg: 1.25rem    /* 20px */
--font-xl: 1.5rem     /* 24px */
--font-2xl: 2rem      /* 32px */
```

## 🧪 Testes

### Manual Testing Checklist
- [ ] Desktop (Chrome, Firefox, Safari)
- [ ] Mobile (iOS Safari, Android Chrome)
- [ ] Tablet (iPad, Android tablets)
- [ ] Navegação por teclado (Tab, Enter, Esc)
- [ ] Screen reader (NVDA/JAWS)
- [ ] Dark mode e light mode
- [ ] Diferentes resoluções (1920x1080, 1366x768, 375x667)

### Automated Testing (futura implementação)
```bash
npm test              # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:a11y     # Accessibility tests
```

## 📚 Recursos Úteis

- [MDN Web Docs](https://developer.mozilla.org/)
- [Web.dev](https://web.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)

## ❓ Perguntas?

- Abra uma [Issue](https://github.com/lavion234-spec/SITE-IMOBILIARIO/issues)
- Entre em contato: contato@imoprime.com

## 📜 Código de Conduta

### Nosso Compromisso
Criar um ambiente acolhedor, respeitoso e inclusivo para todos.

### Padrões
- ✅ Usar linguagem acolhedora e inclusiva
- ✅ Respeitar diferentes pontos de vista
- ✅ Aceitar críticas construtivas graciosamente
- ✅ Focar no melhor para a comunidade

### Inaceitável
- ❌ Linguagem ou imagens sexualizadas
- ❌ Trolling, insultos ou ataques pessoais
- ❌ Assédio público ou privado
- ❌ Publicar informações privadas de outros

## 🏆 Reconhecimento

Contribuidores serão adicionados ao README e receberão crédito em:
- Lista de contribuidores no GitHub
- Menção no CHANGELOG
- Badge de contribuidor

---

**Obrigado por tornar o ImoPrime melhor! 🚀**
