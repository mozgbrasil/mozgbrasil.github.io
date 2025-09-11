# Site Pessoal - Marcio Amorim

[![CI/CD](https://github.com/mozgbrasil/mozgbrasil.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/mozgbrasil/mozgbrasil.github.io/actions/workflows/ci.yml)

Site pessoal e portfólio profissional de Marcio Amorim, desenvolvido com tecnologias web modernas e publicado no GitHub Pages.

🔗 **URL:** [https://mozg.com.br/](https://mozg.com.br/)

## ✨ Recursos

- **Design Responsivo** - Adapta-se a qualquer tamanho de tela
- **Modo Escuro/Claro** - Suporte a preferências do sistema
- **PWA** - Instalável como aplicativo em dispositivos móveis/desktop
- **Otimizado para SEO** - Meta tags, sitemap e dados estruturados
- **Performance** - Carregamento rápido com CSS/JS mínimos
- **Acessibilidade** - Navegação por teclado e ARIA labels

## 🚀 Tecnologias

- HTML5 semântico
- CSS3 com variáveis para temas
- JavaScript puro (Vanilla JS)
- PWA (Service Worker, Web App Manifest)
- GitHub Actions para CI/CD
- Lighthouse para auditoria de performance

## 🛠️ Como Executar Localmente

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Node.js (opcional, para servidor de desenvolvimento)
- Python (opcional, para servidor de desenvolvimento alternativo)

### Usando Node.js

```bash
# Instale o http-server globalmente (caso ainda não tenha)
npm install -g http-server

# Execute o servidor
http-server -p 8080 .
```

### Usando Python

```bash
# Python 3.x
python3 -m http.server 8080

# Python 2.x
python -m SimpleHTTPServer 8080
```

### Acesse

Abra o navegador em: [http://localhost:8080](http://localhost:8080)

## 📁 Estrutura do Projeto

```
mozgbrasil.github.io/
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── assets/              # Recursos estáticos
│   ├── favicon.svg      # Ícone do site
│   ├── icon-192.svg     # Ícone PWA 192x192
│   ├── icon-512.svg     # Ícone PWA 512x512
│   ├── script.js        # Lógica JavaScript
│   ├── styles.css       # Estilos CSS
│   └── gamification.js  # Lógica de gamificação
├── .nojekyll           # Desativa o processamento Jekyll
├── budget.json         # Orçamento de performance
├── index.html          # Página principal
├── lychee.toml         # Configuração do Lychee (verificador de links)
├── manifest.webmanifest # Configuração PWA
├── robots.txt          # Instruções para web crawlers
└── sitemap.xml         # Mapa do site para SEO
```

## 🚀 Deploy

O deploy é automatizado via GitHub Actions. Qualquer push para a branch `main` dispara o workflow de CI/CD que:

1. Executa verificações de qualidade
2. Testa os links internos
3. Publica automaticamente no GitHub Pages

### Configuração do GitHub Pages

1. Acesse as configurações do repositório
2. Navegue até "Pages" no menu lateral
3. Em "Source", selecione "GitHub Actions"

## 🧪 Testes

O projeto inclui verificações automatizadas:

- Validação de HTML/CSS
- Testes de performance com Lighthouse
- Verificação de links quebrados

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📬 Contato

- 💻 Desenvolvedor Fullstack
- 🌱 Java, Node.js e Python
- 🔭 Projetos poliglotas
- 📫 suporte@mozg.com.br
