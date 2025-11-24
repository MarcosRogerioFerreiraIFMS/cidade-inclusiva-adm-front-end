# 🌆 Projeto Cidade Inclusiva - Painel Administrativo - Front-end

O **Cidade Inclusiva - Painel Administrativo - Front-end** é uma aplicação web moderna desenvolvida para gerenciar e fornecer suporte à iniciativa **Cidade Inclusiva**, que visa melhorar a mobilidade urbana para cadeirantes e pessoas com deficiência. Este projeto utiliza tecnologias de ponta para garantir uma experiência de usuário excepcional, performance otimizada e manutenibilidade, permitindo que os administradores gerenciem dados e funcionalidades de forma intuitiva e eficiente.

## 🎯 Objetivo do Projeto

O sistema tem como objetivo principal facilitar a inclusão social e a mobilidade urbana através de:

- **🚍 Gestão de Transporte:** Interface para controle de motoristas disponíveis e veículos adaptados
- **♿ Acessibilidade Urbana:** Visualização e gerenciamento de locais acessíveis na cidade
- **🗺️ Mapa Interativo:** Sistema de mapeamento em com Google Maps para visualização e gestão de pontos com ocorrências de mobilidade
- **🔧 Manutenção:** Sistema de gerenciamento de oficinas especializadas
- **📰 Comunicação:** Plataforma de notícias e informações relevantes para a comunidade
- **👥 Comunidade:** Interface para comentários e interação entre usuários
- **🏥 Profissionais:** Cadastro e gestão de profissionais especializados

## 📋 Informações do Projeto

- **Nome:** cidade-inclusiva-adm-front-end
- **Versão:** 0.1.0
- **Descrição:** Painel Administrativo do sistema Cidade Inclusiva
- **Framework:** Next.js 15.5.4 com App Router
- **React:** 19.1.0
- **Node.js:** >=20.0.0 (versão mínima recomendada)
- **Gerenciador de Pacotes:** pnpm (recomendado)

## 📚 Documentação de Apoio

| 📄 Descrição                            | 🔗 Link                                                                                                                |
| :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| 📝 Desenvolvimento do Plano de Trabalho | [Plano de Trabalho](https://docs.google.com/document/d/1nRhvRcXlDFgf7TtoWgm3VRqlIvhKTE5sb9miVpVaVKU/edit?usp=sharing)  |
| 📄 Documentação do Projeto Mobile       | [Documentação Cidade Inclusiva](https://docs.google.com/document/d/1VxejBnzkMbvmlPWUQOMgSNrHDl5ugXdu/edit?usp=sharing) |
| 🎨 Protótipo Inicial no Figma           | [Figma](https://www.figma.com/design/sHp0ryMHBTla6oVVEYJSOv)                                                           |
| 📱 Protótipo Mobile no Vercel           | [Cidade Inclusiva - Mobile](https://fundect-pictec3-mobile-cidade-inclusiva.vercel.app/login)                          |
| 🛠️ Modelagem UML do Projeto             | [Cidade Inclusiva - UML](https://app.diagrams.net/#G1c72Gns79DE7laBVADoPoukr65F1AaNS-)                                 |
| 📂 Repositório Mobile no GitHub         | [Cidade Inclusiva - Mobile](https://github.com/marcosrogerio-jrf/fundect-pictec3-mobile-cidade-inclusiva)              |
| 🔙 Repositório Backend no GitHub        | [Cidade Inclusiva - Backend](https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-back-end)               |

## ⚡ Scripts Disponíveis

### 🚀 Scripts de Execução

| 📜 **Script** | 📖 **Descrição**                                                                    | 🏃‍♂️ **Comando** |
| ------------- | ----------------------------------------------------------------------------------- | -------------- |
| `dev`         | Inicia o servidor de desenvolvimento com Turbopack (hot-reload ultrarrápido)        | `pnpm dev`     |
| `build`       | Compila a aplicação para produção com otimizações automáticas                       | `pnpm build`   |
| `start`       | Inicia o servidor em modo de produção (requer build)                                | `pnpm start`   |
| `lint`        | Executa o ESLint para verificar problemas no código                                 | `pnpm lint`    |
| `first`       | **Script de configuração inicial**: instala dependências e inicia o servidor de dev | `pnpm first`   |

### 📝 Explicação Detalhada dos Scripts

#### 🚀 Scripts de Desenvolvimento

- **`dev`**: Inicia o servidor de desenvolvimento Next.js com **Turbopack** ativado, proporcionando hot-reload extremamente rápido e uma experiência de desenvolvimento otimizada. Disponível em `http://localhost:3000`.
- **`build`**: Gera a versão otimizada da aplicação para produção. O Next.js realiza otimizações automáticas como:
  - Code splitting inteligente
  - Otimização de imagens
  - Minificação de código
  - Tree shaking
  - Static Site Generation (SSG) quando aplicável
- **`start`**: Executa a versão compilada da aplicação em modo de produção. Requer que o comando `build` seja executado previamente.

- **`lint`**: Executa o ESLint com as configurações do Next.js para identificar problemas de código, inconsistências de estilo e potenciais bugs. Verifica todos os arquivos TypeScript/JavaScript do projeto.

- **`first`**: Script conveniente para configuração inicial do projeto. Ideal para novos desenvolvedores que estão clonando o repositório pela primeira vez. Executa automaticamente:
  1. Instalação de todas as dependências com pnpm
  2. Inicialização do servidor de desenvolvimento

## 📂 Estrutura do Projeto

O projeto segue a arquitetura moderna do **Next.js 15 App Router**, organizada de forma modular e escalável.

### 🎯 Arquitetura e Organização

#### 📂 **App Router (Next.js 15)**

- **`app/layout.tsx`**: Layout raiz com providers (tema, autenticação)
- **`app/(pages)/`**: Rotas agrupadas por funcionalidade
- **`middleware.ts`**: Proteção de rotas e redirecionamentos

#### 🧩 **Componentes**

- **`_components/ui/`**: Componentes base do shadcn/ui
- **`_components/layout/`**: Componentes estruturais (Header, Sidebar)
- **`_components/auth/`**: Componentes de autenticação
- **`_components/cells/`**: Células customizadas para tabelas

#### 🔄 **Gerenciamento de Estado e Dados**

- **`_store/`**: Estado global com Zustand (auth, menu)
- **`_services/`**: Camada de comunicação com API
- **`_actions/`**: Server Actions do Next.js
- **`_api/`**: Configuração de cliente HTTP e tratamento de erros

#### ✅ **Validação e Tipagem**

- **`_schemas/`**: Schemas Zod para validação de formulários
- **`_dtos/`**: Estruturas de dados tipadas
- **`_types/`**: Tipos TypeScript customizados
- **`_enums/`**: Enumerações para valores constantes

#### 🛠️ **Utilitários e Helpers**

- **`_hooks/`**: Custom hooks reutilizáveis
- **`_utils/`**: Funções auxiliares (formatação, validação)
- **`_lib/`**: Bibliotecas compartilhadas e configurações
- **`_constants/`**: Constantes da aplicação

## 🛠️ Tecnologias Utilizadas

### 🚀 Tecnologias Principais

| 🚀 **Tecnologia** | 📖 **Descrição**                                                             | 🔗 **Link de Acesso**                         |
| ----------------- | ---------------------------------------------------------------------------- | --------------------------------------------- |
| ⚛️ React          | Biblioteca JavaScript para construção de interfaces de usuário (v19.1.0)     | [React](https://react.dev/)                   |
| 🌟 Next.js        | Framework React com renderização híbrida e otimizações automáticas (v15.5.4) | [Next.js](https://nextjs.org/)                |
| 🟦 TypeScript     | Superset do JavaScript que adiciona tipos estáticos ao código                | [TypeScript](https://www.typescriptlang.org/) |
| 🎨 Tailwind CSS   | Framework CSS utilitário para criar designs customizados rapidamente (v4)    | [Tailwind CSS](https://tailwindcss.com/)      |
| ⚙️ pnpm           | Gerenciador de pacotes rápido e eficiente para JavaScript                    | [pnpm](https://pnpm.io/)                      |

### 📦 Dependências de Produção

| 📚 **Biblioteca**               | 📖 **Versão** | 📖 **Descrição**                                                  | 🔗 **Link**                                                        |
| ------------------------------- | ------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------ |
| `next`                          | `15.5.4`      | Framework React para aplicações web modernas                      | [Next.js](https://nextjs.org/)                                     |
| `react`                         | `19.1.0`      | Biblioteca para construção de interfaces de usuário               | [React](https://react.dev/)                                        |
| `react-dom`                     | `19.1.0`      | Biblioteca para manipulação do DOM no React                       | [React DOM](https://react.dev/)                                    |
| `@radix-ui/react-accordion`     | `^1.2.12`     | Componente de acordeão acessível                                  | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-alert-dialog`  | `^1.1.15`     | Componente de diálogo de alerta acessível                         | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-avatar`        | `^1.1.10`     | Componente de avatar acessível                                    | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-checkbox`      | `^1.3.3`      | Componente de checkbox acessível                                  | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-collapsible`   | `^1.1.12`     | Componente colapsável acessível                                   | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-dialog`        | `^1.1.15`     | Componente de diálogo acessível                                   | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-dropdown-menu` | `^2.1.16`     | Componente de menu dropdown acessível                             | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-label`         | `^2.1.7`      | Componente de label acessível                                     | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-select`        | `^2.2.6`      | Componente de select acessível                                    | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-slot`          | `^1.2.3`      | Utilitário para composição de componentes                         | [Radix UI](https://www.radix-ui.com/)                              |
| `@radix-ui/react-tooltip`       | `^1.2.8`      | Componente de tooltip acessível                                   | [Radix UI](https://www.radix-ui.com/)                              |
| `@tanstack/react-table`         | `^8.21.3`     | Biblioteca poderosa para tabelas de dados no React                | [TanStack Table](https://tanstack.com/table/)                      |
| `@vis.gl/react-google-maps`     | `^1.7.1`      | Componentes React para Google Maps                                | [React Google Maps](https://visgl.github.io/react-google-maps/)    |
| `axios`                         | `^1.13.1`     | Cliente HTTP baseado em Promises para o navegador e Node.js       | [Axios](https://axios-http.com/)                                   |
| `date-fns`                      | `^4.1.0`      | Biblioteca moderna de utilitários para manipulação de datas       | [date-fns](https://date-fns.org/)                                  |
| `@react-pdf/renderer`           | `^4.3.1`      | Geração de documentos PDF no React                                | [React PDF](https://react-pdf.org/)                                |
| `@hookform/resolvers`           | `^5.2.2`      | Integrações de validação para React Hook Form                     | [Hookform Resolvers](https://github.com/react-hook-form/resolvers) |
| `react-hook-form`               | `^7.66.0`     | Biblioteca performática para gerenciamento de formulários         | [React Hook Form](https://react-hook-form.com/)                    |
| `zod`                           | `^3.25.76`    | Biblioteca de validação de schema TypeScript-first                | [Zod](https://zod.dev/)                                            |
| `zustand`                       | `^5.0.8`      | Gerenciamento de estado global minimalista                        | [Zustand](https://zustand-demo.pmnd.rs/)                           |
| `next-themes`                   | `^0.4.6`      | Gerenciamento de temas (dark/light) para Next.js                  | [Next Themes](https://github.com/pacocoursey/next-themes)          |
| `lucide-react`                  | `^0.545.0`    | Biblioteca de ícones moderna e customizável                       | [Lucide](https://lucide.dev/)                                      |
| `sonner`                        | `^2.0.7`      | Biblioteca de toast notifications elegante                        | [Sonner](https://sonner.emilkowal.ski/)                            |
| `tailwind-merge`                | `^3.3.1`      | Utilitário para mesclar classes Tailwind CSS de forma inteligente | [Tailwind Merge](https://github.com/dcastil/tailwind-merge)        |
| `clsx`                          | `^2.1.1`      | Utilitário para construir className condicionais                  | [clsx](https://github.com/lukeed/clsx)                             |
| `class-variance-authority`      | `^0.7.1`      | Gerenciamento de variantes de componentes com TypeScript          | [CVA](https://cva.style/)                                          |

### 🛠️ Dependências de Desenvolvimento

| 📚 **Biblioteca**             | 📖 **Versão** | 📖 **Descrição**                                            | 🔗 **Link**                                                                                    |
| ----------------------------- | ------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `typescript`                  | `^5`          | Linguagem de programação que adiciona tipagem ao JavaScript | [TypeScript](https://www.typescriptlang.org/)                                                  |
| `@types/node`                 | `^20`         | Definições de tipos TypeScript para Node.js                 | [Types Node](https://www.npmjs.com/package/@types/node)                                        |
| `@types/react`                | `^19`         | Definições de tipos TypeScript para React                   | [Types React](https://www.npmjs.com/package/@types/react)                                      |
| `@types/react-dom`            | `^19`         | Definições de tipos TypeScript para React DOM               | [Types React DOM](https://www.npmjs.com/package/@types/react-dom)                              |
| `eslint`                      | `^9.39.1`     | Ferramenta de linting para identificar problemas no código  | [ESLint](https://eslint.org/)                                                                  |
| `eslint-config-next`          | `15.5.4`      | Configurações ESLint oficiais do Next.js                    | [ESLint Config Next](https://nextjs.org/docs/app/building-your-application/configuring/eslint) |
| `@next/eslint-plugin-next`    | `^15.5.4`     | Plugin ESLint oficial do Next.js                            | [Next ESLint Plugin](https://nextjs.org/docs/app/building-your-application/configuring/eslint) |
| `eslint-plugin-react-hooks`   | `^7.0.1`      | Regras ESLint para React Hooks                              | [React Hooks ESLint](https://www.npmjs.com/package/eslint-plugin-react-hooks)                  |
| `@eslint/eslintrc`            | `^3`          | Utilitário de configuração do ESLint                        | [ESLint RC](https://eslint.org/)                                                               |
| `prettier`                    | `^3.6.2`      | Ferramenta de formatação de código                          | [Prettier](https://prettier.io/)                                                               |
| `prettier-plugin-tailwindcss` | `^0.6.14`     | Plugin Prettier para ordenar classes Tailwind CSS           | [Prettier Tailwind](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)               |
| `tailwindcss`                 | `^4.1.16`     | Framework CSS utilitário                                    | [Tailwind CSS](https://tailwindcss.com/)                                                       |
| `@tailwindcss/postcss`        | `^4`          | Plugin PostCSS oficial do Tailwind CSS v4                   | [Tailwind PostCSS](https://tailwindcss.com/)                                                   |
| `tw-animate-css`              | `^1.4.0`      | Animações CSS para Tailwind                                 | [TW Animate](https://www.npmjs.com/package/tw-animate-css)                                     |

## 🎨 Shadcn/UI - Sistema de Componentes

Este projeto utiliza **shadcn/ui**, uma coleção de componentes reutilizáveis e acessíveis construídos com **Radix UI** e **Tailwind CSS**. Os componentes são copiados diretamente para o projeto, permitindo customização total.

### 📦 Componentes Instalados

- **Accordion** - Painéis expansíveis para conteúdo
- **Alert Dialog** - Diálogos de confirmação modais
- **Alert** - Mensagens de alerta e notificações
- **Avatar** - Imagens de perfil de usuário
- **Badge** - Etiquetas e tags
- **Button** - Botões com variantes
- **Card** - Cartões de conteúdo
- **Checkbox** - Caixas de seleção acessíveis
- **Collapsible** - Seções colapsáveis
- **Dialog** - Diálogos modais
- **Dropdown Menu** - Menus suspensos interativos
- **Form** - Integração com React Hook Form
- **Input** - Campos de entrada de texto
- **Label** - Rótulos de formulário
- **Select** - Seleção de opções
- **Table** - Tabelas de dados
- **Textarea** - Áreas de texto multilinha
- **Tooltip** - Dicas e informações contextuais
- **Theme Provider** - Gerenciamento de temas

### 🎨 Customização

Todos os componentes shadcn/ui podem ser customizados editando:

- **`components.json`**: Configuração de paths e aliases
- **`globals.css`**: Variáveis CSS e temas
- **Arquivos individuais** em `src/app/_components/ui/`

## 🗺️ Mapa Interativo com Google Maps

### 🌟 Destaque: Sistema de Mapeamento Avançado

O projeto integra **Google Maps** através da biblioteca **@vis.gl/react-google-maps**, proporcionando uma experiência de mapeamento moderna e interativa para gerenciamento de pontos de mobilidade urbana.

#### 🚀 Recursos do Mapa Interativo

- **📍 Visualização de Pontos de Mobilidade** - Marcadores customizados para locais acessíveis
- **🗺️ Navegação Intuitiva** - Zoom, pan e controles de navegação fluidos
- **🎯 Geolocalização** - Detecção automática da localização do usuário
- **♿ Foco em Acessibilidade** - Visualização clara de rotas e locais acessíveis

#### 📦 Biblioteca Utilizada

```json
"@vis.gl/react-google-maps": "^1.7.1"
```

A biblioteca **vis.gl** é mantida pelo Urban Computing Foundation e oferece componentes React de alta performance para Google Maps, com suporte a:

- ✅ TypeScript nativo
- ✅ Hooks modernos do React
- ✅ Performance otimizada
- ✅ API declarativa
- ✅ Suporte a todas as features do Google Maps

#### 🔑 Configuração

Para utilizar o Google Maps, é necessário configurar uma chave de API no arquivo `.env.local`:

```bash
GOOGLE_MAPS_API_KEY=sua_chave_api_aqui
```

> **📝 Nota:** Certifique-se de habilitar as APIs necessárias no Google Cloud Console:
>
> - Maps JavaScript API
> - Places API (para busca de endereços)
> - Geocoding API (para conversão de coordenadas)

#### 🎯 Casos de Uso

1. **Gestão de Mobilidade** - Visualizar e gerenciar pontos de ônibus acessíveis
2. **Locais Acessíveis** - Mapear calçadas, rampas e áreas adaptadas
3. **Rotas Seguras** - Definir trajetos recomendados para cadeirantes
4. **Monitoramento** - Acompanhar solicitações de manutenção por localização
5. **Planejamento Urbano** - Análise espacial de acessibilidade na cidade

---

## ⚠️ Aviso Importante sobre Dependências

> **🚨 NÃO ATUALIZE AS DEPENDÊNCIAS DO PROJETO SEM NECESSIDADE REAL!**

### 📋 Por que não atualizar as dependências sem critério?

- **🔒 Estabilidade**: As versões atuais foram testadas e são compatíveis entre si
- **🐛 Bugs**: Versões mais novas podem introduzir bugs ou breaking changes
- **💥 Compatibilidade**: Atualizações podem quebrar a compatibilidade entre dependências
- **🔧 Configurações**: Mudanças podem exigir reconfiguração de ESLint, TypeScript, Tailwind, etc.
- **⏱️ Tempo de desenvolvimento**: Resolver problemas de compatibilidade consome tempo valioso
- **🎨 Componentes**: Next.js 15 e React 19 são versões recentes que ainda estão estabilizando

### ✅ Quando é apropriado atualizar?

- **🔐 Correções de segurança críticas** identificadas por npm audit
- **🐛 Bugs que afetam funcionalidades essenciais** da aplicação
- **✨ Funcionalidades específicas necessárias** para novos recursos
- **📈 Melhorias significativas de performance** comprovadas
- **🆕 Atualizações de patch** (terceiro dígito da versão) geralmente são seguras

### 🛡️ Como atualizar com segurança (se necessário)?

1. **📊 Teste em branch separada** - Nunca atualize direto na main
2. **📝 Documente as mudanças** - Registre o que foi atualizado e por quê
3. **🧪 Execute todos os testes** - Verifique se tudo continua funcionando
4. **🔍 Revise breaking changes** - Leia os changelogs das dependências
5. **👥 Revise com a equipe** - Obtenha aprovação antes de mergear
6. **🔄 Tenha um plano de rollback** - Esteja preparado para reverter

## 🚀 Como Rodar o Projeto

### ⚠️ IMPORTANTE: Configuração do Backend

Antes de iniciar o projeto front-end, é **essencial** que o backend esteja rodando corretamente. O painel administrativo depende da API para funcionar.

- **📂 Repositório Backend:** [Cidade Inclusiva - Backend](https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-back-end)
- **🔗 URL Padrão da API:** `http://localhost:5555`

### 📋 Passo a Passo Completo

#### 1️⃣ **Clone o repositório**

```bash
git clone https://github.com/MarcosRogerioFerreiraIFMS/cidade-inclusiva-adm-front-end.git
cd cidade-inclusiva-adm-front-end
```

#### 2️⃣ **Instale o pnpm (se não tiver)**

```bash
npm install -g pnpm
```

#### 3️⃣ **Configure as variáveis de ambiente**

> **⚠️ ATENÇÃO**: Esta etapa é **OBRIGATÓRIA** para o funcionamento do projeto!

Crie o arquivo `.env.local` na raiz do projeto:

```bash
# No Windows (Git Bash ou PowerShell)
cp .env.example .env.local

# Ou crie manualmente o arquivo .env.local
```

**📝 Edite o arquivo `.env.local` e configure:**

```bash
# URL da API Backend (OBRIGATÓRIO)
API_URL=http://localhost:5555

# Outras configurações podem ser adicionadas aqui conforme necessário
```

#### 4️⃣ **Instale as dependências e inicie o projeto**

```bash
pnpm first
```

Este comando realiza automaticamente:

- ✅ Instalação de todas as dependências do projeto
- ✅ Inicialização do servidor de desenvolvimento com Turbopack

#### 5️⃣ **Acesse a aplicação**

Abra seu navegador em `http://localhost:3000` 🎉

### 🔧 Comandos Alternativos

Se preferir executar as etapas separadamente:

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev
```

### ✅ Verificação da Configuração

Para garantir que tudo está funcionando:

1. ✅ **Backend rodando** - Acesse `http://localhost:5555` e verifique se a API responde
2. ✅ **Arquivo `.env.local` criado** - Verifique se o arquivo existe na raiz do projeto
3. ✅ **Variável `API_URL` configurada** - Verifique se aponta para o backend
4. ✅ **Dependências instaladas** - Execute `pnpm install` sem erros
5. ✅ **Frontend acessível** - Abra `http://localhost:3000` no navegador

### 🐛 Problemas Comuns

| ❌ **Problema**                           | ✅ **Solução**                                                        |
| ----------------------------------------- | --------------------------------------------------------------------- |
| Erro de conexão com a API                 | Verifique se o backend está rodando em `http://localhost:5555`        |
| Variável de ambiente não encontrada       | Certifique-se de que o arquivo `.env.local` existe e está configurado |
| Página em branco ou erros de autenticação | Limpe o cache do navegador e tente novamente                          |
| Porta 3000 já em uso                      | Mate o processo ou use outra porta: `pnpm dev -- -p 3001`             |
| Erro ao instalar dependências             | Limpe o cache: `pnpm store prune` e tente novamente                   |

### 📦 Comandos Úteis para Desenvolvimento

```bash
# Verificar problemas de código
pnpm lint

# Compilar para produção
pnpm build

# Executar versão de produção localmente
pnpm start
```

## 📋 Requisitos do Sistema

- **Node.js:** >=20.0.0 (recomendado 20.x LTS ou superior)
- **Gerenciador de pacotes:** pnpm (recomendado) ou npm
- **Sistema operacional:** Windows, macOS ou Linux
- **Navegadores suportados:** Chrome, Firefox, Safari, Edge (versões modernas)
- **Backend:** API REST do Cidade Inclusiva (ver repositório backend)

## 🎯 Funcionalidades Principais

### 🏗️ Arquitetura e Desenvolvimento

- ✅ **Next.js 15 App Router** - Arquitetura moderna com Server Components
- ✅ **React 19** - Versão mais recente com melhorias de performance
- ✅ **TypeScript Estrito** - Tipagem completa para melhor DX e menos bugs
- ✅ **Turbopack** - Bundler ultrarrápido para desenvolvimento
- ✅ **Roteamento Baseado em Arquivos** - Sistema intuitivo de rotas
- ✅ **Middleware de Autenticação** - Proteção de rotas automática
- ✅ **Server Actions** - Mutações de dados sem API routes

### 🎨 Interface e Experiência do Usuário

- ✅ **Shadcn/UI** - Componentes acessíveis e customizáveis
- ✅ **Radix UI** - Primitivos UI de alta qualidade
- ✅ **Tailwind CSS v4** - Estilização utilitária moderna
- ✅ **Dark Mode** - Tema claro/escuro com persistência
- ✅ **Responsive Design** - Otimizado para todos os tamanhos de tela
- ✅ **Lucide Icons** - Biblioteca de ícones moderna e consistente
- ✅ **Toast Notifications** - Feedback visual elegante com Sonner
- ✅ **Animações CSS** - Transições suaves e profissionais

### 📊 Gerenciamento de Dados

- ✅ **TanStack Table** - Tabelas poderosas com sorting, filtering e paginação
- ✅ **React Hook Form** - Formulários performáticos com validação
- ✅ **Zod Schemas** - Validação type-safe de dados
- ✅ **Zustand** - Estado global minimalista e eficiente
- ✅ **API Client** - Cliente HTTP configurado com tratamento de erros
- ✅ **DTOs Tipados** - Estruturas de dados consistentes
- ✅ **Axios** - Cliente HTTP baseado em Promises para requisições

### 🗺️ Mapeamento e Geolocalização

- ✅ **Google Maps Integration** - Integração completa com Google Maps API
- ✅ **React Google Maps** - Componentes React modernos para mapas (@vis.gl)
- ✅ **Marcadores Customizados** - Pins e overlays personalizados
- ✅ **Geolocalização** - Detecção automática de localização
- ✅ **Rotas Interativas** - Visualização de trajetos acessíveis
- ✅ **Mapas Responsivos** - Otimizado para todos os dispositivos

### 🔐 Segurança e Autenticação

- ✅ **JWT Authentication** - Autenticação baseada em tokens
- ✅ **Protected Routes** - Middleware de proteção de rotas
- ✅ **Security Redirects** - Redirecionamentos seguros
- ✅ **Auth Fallback** - Componentes de carregamento de autenticação
- ✅ **Token Service** - Gerenciamento centralizado de tokens

### ⚡ Performance e Otimização

- ✅ **Server Components** - Renderização no servidor por padrão
- ✅ **Client Components** - Apenas onde necessário para interatividade
- ✅ **Image Optimization** - Otimização automática de imagens
- ✅ **Code Splitting** - Carregamento sob demanda de código
- ✅ **Font Optimization** - Google Fonts otimizadas automaticamente
- ✅ **Static Generation** - Páginas estáticas quando possível
- ✅ **Caching Inteligente** - Next.js gerencia cache automaticamente

### 🛠️ Qualidade e Manutenibilidade

- ✅ **ESLint** - Linting com regras do Next.js
- ✅ **Prettier** - Formatação consistente de código
- ✅ **TypeScript** - Tipagem estática completa
- ✅ **Code Organization** - Estrutura de pastas clara e escalável
- ✅ **Custom Hooks** - Lógica reutilizável encapsulada
- ✅ **Utility Functions** - Helpers para operações comuns
- ✅ **Constants Management** - Centralização de valores constantes
- ✅ **Date Utilities** - Manipulação de datas com date-fns
- ✅ **PDF Generation** - Geração de relatórios em PDF com React PDF

### 🧩 Componentes Especializados

- ✅ **Data Tables** - Tabelas com células customizadas
- ✅ **Form Components** - Inputs validados e estilizados
- ✅ **Layout Components** - Header, Sidebar, Dashboard
- ✅ **Auth Components** - Login, logout, proteção de rotas
- ✅ **Loading States** - Skeletons e indicadores de carregamento
- ✅ **Error Handling** - Páginas de erro customizadas
- ✅ **Image Previews** - Visualização de imagens antes do upload

---

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

> **Cidade Inclusiva** - Construindo uma cidade mais acessível para todos! 🌆♿

🎉 **Agora você está pronto para contribuir com o projeto Cidade Inclusiva!**
