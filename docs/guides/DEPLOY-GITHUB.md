# 🚀 Guia Completo de Deploy - GitHub Pages + Google Apps Script

<div align="center">

![Deploy](https://img.shields.io/badge/Deploy-Pronto-success?style=for-the-badge)
![Tempo](https://img.shields.io/badge/Tempo-10_minutos-blue?style=for-the-badge)
![Custo](https://img.shields.io/badge/Custo-R$_0,00-green?style=for-the-badge)

**Deploy completo em 10 minutos • 100% gratuito • Sem cartão de crédito**

</div>

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Pré-requisitos](#-pré-requisitos)
- [Passo 1: Backend (Apps Script)](#-passo-1-configurar-backend-apps-script)
- [Passo 2: Frontend (Arquivos HTML)](#-passo-2-configurar-frontend)
- [Passo 3: GitHub Pages](#-passo-3-publicar-no-github-pages)
- [Passo 4: Testar](#-passo-4-testar-o-sistema)
- [Estrutura Final](#-estrutura-final)
- [Configuração da Planilha](#-configuração-da-planilha)
- [Atualização](#-atualização)
- [Troubleshooting](#-troubleshooting)
- [FAQ](#-faq)

---

## 🎯 Visão Geral

### Como funciona?

```
┌─────────────────┐      POST       ┌──────────────────┐     SQL-like    ┌─────────────┐
│  GitHub Pages   │ ───────────────> │  Apps Script     │ ──────────────> │   Google    │
│  (Frontend)     │  <───────────────│  (Backend API)   │ <────────────── │   Sheets    │
│                 │   postMessage    │                  │   getValues()   │  (Database) │
│ • index.html    │                  │ • doGet()        │                 │             │
│ • gerenciar.html│                  │ • doPost()       │                 │ • 18 cols   │
└─────────────────┘                  └──────────────────┘                 └─────────────┘
```

### O que você vai fazer

| Etapa | Ação | Tempo |
|-------|------|-------|
| 1️⃣ | Configurar Apps Script (backend) | 5 min |
| 2️⃣ | Atualizar URLs nos arquivos HTML | 2 min |
| 3️⃣ | Publicar no GitHub Pages | 2 min |
| 4️⃣ | Testar o sistema | 1 min |

**Total: ~10 minutos** ⏱️

---

## ✅ Pré-requisitos

### Contas necessárias

- [ ] **Conta Google** (Gmail)  
  → Para Apps Script e Google Sheets  
  → **Gratuita**: https://accounts.google.com/signup

- [ ] **Conta GitHub**  
  → Para hospedar o frontend  
  → **Gratuita**: https://github.com/signup

### Ferramentas (opcional)

- [ ] **Git** instalado  
  → Ou use a interface web do GitHub  
  → Download: https://git-scm.com/downloads

- [ ] **Editor de código**  
  → VS Code, Notepad++, ou qualquer editor  
  → VS Code: https://code.visualstudio.com/

### Conhecimentos

- ✅ Básico de edição de arquivos
- ✅ Copiar e colar
- ✅ Seguir instruções passo a passo

**Nenhuma experiência em programação necessária!** 🎉

---

## 🔧 Passo 1: Configurar Backend (Apps Script)

### 1.1 Criar projeto no Apps Script

1. **Acesse**: https://script.google.com

2. **Faça login** com sua conta Google

3. **Clique em**: `+ Novo projeto` (canto superior esquerdo)

4. **Renomeie o projeto**:
   - Clique em "Projeto sem título"
   - Digite: `Sistema-Violencia-Escolar`
   - Pressione Enter

### 1.2 Adicionar o código backend

1. **Apague** todo o conteúdo padrão do arquivo `Code.gs`

2. **Abra o arquivo** `backend/Code.gs` deste repositório

3. **Copie TODO o conteúdo** (Ctrl+A, Ctrl+C)

4. **Cole** no editor do Apps Script (Ctrl+V)

5. **Salve**: 
   - Pressione `Ctrl+S`
   - Ou clique no ícone 💾 (disquete)

### 1.3 Verificar ID da Planilha

No código que você colou, encontre (linha ~6):

```javascript
const SHEET_ID = '15QaRUJv60U15TmyCoIYJKqvRCjY_bMgsUFYimcYtBzc';
```

**Se você tem sua própria planilha:**

1. Abra sua planilha do Google Sheets
2. Copie o ID da URL:
   ```
   https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/edit
                                           ^^^^^^^^^^^^^^
   ```
3. Substitua o ID no código

### 1.4 Fazer Deploy como Web App

1. **Clique em**: `Implantar` (canto superior direito)

2. **Selecione**: `Nova implantação`

3. **Configure o tipo**:
   - Clique no ícone ⚙️ (engrenagem)
   - Selecione: `Aplicativo da Web`

4. **Preencha os campos**:
   
   | Campo | Valor | Explicação |
   |-------|-------|------------|
   | **Descrição** | `v1.0 - Deploy inicial` | Opcional |
   | **Executar como** | `Eu (seu-email@gmail.com)` | ✅ IMPORTANTE |
   | **Quem tem acesso** | `Qualquer pessoa` | ✅ CRÍTICO |

   > ⚠️ **Atenção**: "Qualquer pessoa" é necessário para aceitar requests do GitHub Pages!

5. **Clique em**: `Implantar`

### 1.5 Autorizar o aplicativo

Se for a primeira vez:

1. **Aparecerá**: "Autorização necessária"
2. **Clique em**: `Autorizar acesso`
3. **Escolha** sua conta Google
4. **Tela de aviso** "Este app não foi verificado":
   - Clique em `Avançado`
   - Clique em `Acessar Sistema-Violencia-Escolar (não seguro)`
5. **Clique em**: `Permitir`

### 1.6 Copiar a URL do Web App

1. Após autorizar, uma janela aparece com:
   ```
   URL da Aplicativo da Web:
   https://script.google.com/macros/s/AKfycbyXXXXXXXXXXXXXXXXXX/exec
   ```

2. **📋 COPIE ESTA URL COMPLETA**

3. **Cole em um local seguro** (Bloco de Notas, Google Docs, etc.)

> ⚠️ **Você vai precisar dessa URL no Passo 2!**

---

## 📝 Passo 2: Configurar Frontend

### 2.1 Clonar ou baixar o repositório

**Opção A: Via Git (recomendado)**
```bash
git clone https://github.com/GabrielGaks/sistema-registro-violencia.git
cd sistema-registro-violencia
```

**Opção B: Download ZIP**
```
1. Vá em: https://github.com/GabrielGaks/sistema-registro-violencia
2. Clique em: Code > Download ZIP
3. Extraia o arquivo
```

### 2.2 Atualizar URL no index.html

1. **Abra o arquivo**: `index.html`

2. **Encontre a linha** (~924):
   ```javascript
   const APPS_SCRIPT_URL = 'COLE_SUA_URL_AQUI';
   ```

3. **Substitua** pela URL que você copiou:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXXXXXXX/exec';
   ```

4. **Salve o arquivo** (Ctrl+S)

### 2.3 Atualizar URL no gerenciar.html

1. **Abra o arquivo**: `gerenciar.html`

2. **Encontre a linha** (~373):
   ```javascript
   const APPS_SCRIPT_URL = 'COLE_SUA_URL_AQUI';
   ```

3. **Substitua** pela mesma URL:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXXXXXXX/exec';
   ```

4. **Salve o arquivo** (Ctrl+S)

> ⚠️ **A URL deve ser EXATAMENTE a mesma nos dois arquivos!**

---

## 🌐 Passo 3: Publicar no GitHub Pages

### 3.1 Criar repositório no GitHub

1. **Acesse**: https://github.com/new

2. **Preencha**:
   - **Repository name**: `sistema-registro-violencia`
   - **Description**: `Sistema de registro de violência escolar`
   - **Visibilidade**: 
     - ✅ `Public` (qualquer um pode ver)
     - 🔒 `Private` (só você vê)

3. **NÃO marque** nenhuma opção:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license

4. **Clique em**: `Create repository`

### 3.2 Fazer upload dos arquivos

**Opção A: Via terminal (Git)**

```bash
# Na pasta do projeto
git init
git add .
git commit -m "🚀 Deploy inicial do sistema"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/sistema-registro-violencia.git
git push -u origin main
```

**Opção B: Via interface web**

1. Na página do repositório criado, clique em: `uploading an existing file`

2. **Arraste e solte** os arquivos:
   - `index.html`
   - `gerenciar.html`
   - `Code.gs`
   - `README.md`
   - `DEPLOY-GITHUB.md`
   - `.gitignore`

3. **Commit message**: `🚀 Deploy inicial`

4. **Clique em**: `Commit changes`

### 3.3 Ativar GitHub Pages

1. **Vá em**: `Settings` (aba no topo)

2. **Menu lateral esquerdo**: `Pages`

3. **Configure**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/ (root)`

4. **Clique em**: `Save`

5. **Aguarde 1-2 minutos**

6. **Recarregue a página**

7. **Copie a URL** que aparece:
   ```
   Your site is live at https://SEU-USUARIO.github.io/sistema-registro-violencia/
   ```

---

## ✅ Passo 4: Testar o Sistema

### 4.1 Testar o Formulário

1. **Acesse**: `https://SEU-USUARIO.github.io/sistema-registro-violencia/index.html`

2. **Preencha** o formulário com dados de teste:
   - Nome: João da Silva
   - Data: 01/12/2025
   - Idade: 12
   - Gênero: Menino
   - Escola: EMEF Adelaide Montevechi Costa
   - Encaminhamento: Conselho Tutelar (digite e pressione Enter)
   - etc.

3. **Clique em**: `💾 Salvar Registro`

4. **Verifique**:
   - ✅ Apareceu "Registro salvo com sucesso!"?
   - ✅ Dados apareceram na planilha do Google Sheets?

### 4.2 Testar o Painel Admin

1. **Acesse**: `https://SEU-USUARIO.github.io/sistema-registro-violencia/gerenciar.html`

2. **Clique em**: `🔄 Carregar Registros`

3. **Verifique**:
   - ✅ Tabela apareceu com os dados?
   - ✅ Busca funciona?
   - ✅ Paginação funciona?

4. **Teste edição**:
   - Clique no ícone ✏️
   - Altere um campo
   - Salve
   - ✅ Dados atualizaram?

5. **Teste exclusão**:
   - Clique no ícone 🗑️
   - Confirme
   - ✅ Registro sumiu?

### 4.3 Debug (se algo não funcionar)

**Console do Navegador:**
```
1. Pressione F12
2. Aba "Console"
3. Procure mensagens de erro (texto vermelho)
4. Anote a mensagem
```

**Logs do Apps Script:**
```
1. Acesse: https://script.google.com
2. Abra seu projeto
3. Menu: Executar > Execuções
4. Veja logs detalhados
```

---

## 🏗️ Estrutura Final

Após o deploy bem-sucedido:

```
Sistema de Registro de Violência
│
├── 🌐 GitHub Pages (Frontend)
│   URL: https://SEU-USUARIO.github.io/SEU-REPO/
│   │
│   ├── 📄 index.html
│   │   URL: .../index.html
│   │   Função: Formulário público de registro
│   │   Acesso: Qualquer pessoa com o link
│   │
│   └── 📄 gerenciar.html
│       URL: .../gerenciar.html
│       Função: Painel administrativo
│       Acesso: Mantenha URL privada
│
├── ☁️ Google Apps Script (Backend)
│   URL: https://script.google.com/macros/s/XXXXX/exec
│   │
│   └── 📄 Code.gs
│       Endpoints:
│       • GET  /exec?action=list    → Lista registros
│       • POST /exec (action=save)   → Cria registro
│       • POST /exec (action=update) → Atualiza registro
│       • POST /exec (action=delete) → Exclui registro
│
└── 📊 Google Sheets (Database)
    URL: https://docs.google.com/spreadsheets/d/SEU_ID/
    │
    └── 📋 Página1 (18 colunas A-R)
        Armazenamento: ~555.000 registros (10M células)
```

---

## 📊 Configuração da Planilha

### Estrutura obrigatória

Sua planilha deve ter **18 colunas** na **linha 1** (cabeçalho):

| Col | Nome | Formato | Exemplo |
|-----|------|---------|---------|
| **A** | Criança/ Estudante | Texto | João Silva Santos |
| **B** | Data da NT | Data | 01/12/2025 |
| **C** | Idade | Número | 12 |
| **D** | Identidade de Gênero | M/F | M |
| **E** | É PCD/tem Transtorno? | S/N | S |
| **F** | Raça/Cor | Texto | Parda |
| **G** | Tipo de Violência | Texto | Verbal |
| **H** | Encaminhamento | Texto | Conselho Tutelar, UBS |
| **I** | CMEI/EMEF | Sigla | AMCC |
| **J** | Região | Texto | Centro |
| **K** | Responsável pelo Registro | Texto | Maria Santos |
| **L** | fonte informadores foi a escola? | S/N | S |
| **M** | violência identificada pela escola ocorrida na escola | S/N | S |
| **N** | Algum profissional da escola foi autor da violência | S/N | N |
| **O** | Algum estudante foi autor da violência? | S/N | S |
| **P** | violência identificada pela escola não ocorrida na escola | S/N | N |
| **Q** | ocorreu na escola? 1.1 | S/N | S |
| **R** | violência informada a escola por qualquer um dos agentes que a compõe 1.2 | S/N | S |

### Validações (opcional)

Você pode adicionar validações de dados:

```
1. Selecione a coluna
2. Dados > Validação de dados
3. Configure as regras
4. Salvar
```

**Exemplo: Coluna D (Gênero)**
- Critério: Lista de uma faixa
- Valores: M, F

**Exemplo: Coluna E (PCD)**
- Critério: Lista de uma faixa
- Valores: S, N

> ⚠️ **Atenção**: O sistema remove validações ao atualizar registros via `clearDataValidations()` para evitar erros.

---

## 🔄 Atualização

### Atualizar Frontend (HTML/CSS/JS)

```bash
# 1. Edite os arquivos localmente
code index.html  # ou use qualquer editor

# 2. Teste localmente
# Abra index.html no navegador

# 3. Commit e push
git add .
git commit -m "✨ feat: adiciona nova funcionalidade"
git push origin main

# 4. Aguarde 1-2 minutos
# GitHub Pages atualiza automaticamente
```

### Atualizar Backend (Apps Script)

```
1. Acesse: https://script.google.com
2. Abra: Sistema-Violencia-Escolar
3. Edite: Code.gs
4. Salve: Ctrl+S
5. Menu: Implantar > Gerenciar implantações
6. Clique no ícone ✏️ (Editar)
7. Versão: Nova versão
8. Descrição: "v1.1 - Descrição da mudança"
9. Implantar
10. Se a URL mudou: atualize em index.html e gerenciar.html
```

### Versionamento Semântico

Siga o padrão [SemVer](https://semver.org/):

```
v2.1.0
│ │ │
│ │ └─ PATCH: Correções de bugs (2.1.0 → 2.1.1)
│ └─── MINOR: Novas funcionalidades (2.1.0 → 2.2.0)
└───── MAJOR: Mudanças incompatíveis (2.1.0 → 3.0.0)
```

**Exemplos de commits:**
```bash
git commit -m "fix: corrige validação de data"        # v2.1.1
git commit -m "feat: adiciona export para Excel"      # v2.2.0
git commit -m "BREAKING CHANGE: muda estrutura API"   # v3.0.0
```

---

## 🐛 Troubleshooting

### Problema: "Configure a URL do Apps Script"

**Causa**: URL não foi configurada nos arquivos HTML

**Solução**:
```javascript
// Em index.html e gerenciar.html
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXX/exec';
//                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                       Cole sua URL aqui (com aspas)
```

### Problema: "Acesso negado"

**Causa**: Deploy do Apps Script está restrito

**Solução**:
```
1. Apps Script > Implantar > Gerenciar implantações
2. Clique no ícone ✏️
3. "Quem tem acesso": Qualquer pessoa
4. Atualizar
```

### Problema: Dados não aparecem na planilha

**Causa**: ID da planilha ou nome da aba incorreto

**Solução**:
```javascript
// Em Code.gs (linha 6)
const SHEET_ID = 'SEU_ID_CORRETO_AQUI';

// Verifique o nome da aba (linha 9)
const SHEET_NAME = 'Página1'; // deve ser exatamente igual
```

### Problema: CORS Error no console

**Causa**: Comportamento normal com `mode: 'no-cors'`

**Solução**:
```
✅ Ignore este erro!
✅ Os dados foram salvos mesmo assim
✅ Verifique os logs no Apps Script para confirmar
```

### Problema: "Registro salvo" mas não salvou

**Causa**: Erro silencioso no backend

**Solução**:
```
1. Apps Script > Executar > Execuções
2. Encontre a execução com erro (ícone ⚠️)
3. Veja a mensagem de erro
4. Corrija o problema
5. Faça nova implantação
```

### Problema: GitHub Pages não atualiza

**Causa**: Cache do navegador ou delay do GitHub

**Solução**:
```
1. Aguarde 2-3 minutos
2. Limpe o cache: Ctrl+Shift+R
3. Ou abra em aba anônima: Ctrl+Shift+N
4. Verifique: Settings > Pages > "Your site is live"
```

### Problema: Validação de dados bloqueia update

**Causa**: Planilha tem validação de dados configurada

**Solução**:
```
O sistema já tem clearDataValidations() no código.

Se ainda ocorrer:
1. Abra a planilha
2. Selecione a coluna problemática
3. Dados > Validação de dados
4. Remover validação
```

### Problema: Formulário lento para 1000+ registros

**Causa**: muitos dados carregados de uma vez

**Solução**:
```javascript
// Em Code.gs, adicione paginação no backend
function listarRegistros(pagina = 1, itensPorPagina = 100) {
  const inicio = (pagina - 1) * itensPorPagina;
  const valores = range.getValues().slice(inicio, inicio + itensPorPagina);
  // ...
}
```

---

## ❓ FAQ

<details>
<summary><b>Preciso pagar pelo Google Cloud?</b></summary>

**NÃO!** Apps Script é gratuito e **não requer** Google Cloud Platform.

Você só precisa:
- ✅ Apps Script (gratuito)
- ✅ Google Sheets (gratuito)

**Sem custos. Sem cartão de crédito. Sem pegadinhas.**

</details>

<details>
<summary><b>Como proteger o painel admin?</b></summary>

**Opção 1: URL secreta (básico)**
- Não compartilhe a URL do gerenciar.html
- Use link curto com senha (bit.ly + senha)

**Opção 2: Token simples (intermediário)**
```javascript
// Code.gs
const TOKEN_ADMIN = 'sua-senha-secreta-123';

function doPost(e) {
  if (e.parameter.action === 'list' || e.parameter.action === 'update') {
    if (e.parameter.token !== TOKEN_ADMIN) {
      return ContentService.createTextOutput('Acesso negado');
    }
  }
  // ... resto do código
}

// gerenciar.html
const dados = {
  action: 'list',
  token: 'sua-senha-secreta-123'
};
```

**Opção 3: Google Sign-In (avançado)**
```html
<script src="https://accounts.google.com/gsi/client"></script>
<!-- Implementar OAuth 2.0 -->
```

</details>

<details>
<summary><b>Posso usar meu próprio domínio?</b></summary>

**Sim!** GitHub Pages suporta domínios customizados:

```
1. Compre um domínio (ex: Registro.Namecheap.com)
2. GitHub repo > Settings > Pages
3. Custom domain: seu-dominio.com
4. Configure DNS:
   - CNAME: www → SEU-USUARIO.github.io
   - A Record: @ → 185.199.108.153
5. Aguarde propagação DNS (24-48h)
```

**Custo**: ~R$30-50/ano para domínio .com

</details>

<details>
<summary><b>Como fazer backup automático?</b></summary>

```javascript
// Em Code.gs, adicione:
function backupDiario() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const pasta = DriveApp.getFolderById('ID_PASTA_BACKUP');
  
  const hoje = Utilities.formatDate(new Date(), 'GMT-3', 'yyyy-MM-dd');
  const copia = ss.copy(`Backup ${hoje}`);
  
  pasta.addFile(DriveApp.getFileById(copia.getId()));
}

// Configure acionador:
// Editar > Acionadores > Nova
// Função: backupDiario
// Evento: Cronômetro
// Diariamente: 00:00-01:00
```

</details>

<details>
<summary><b>Como exportar dados para Excel?</b></summary>

**Manualmente:**
```
Google Sheets > Arquivo > Download > Microsoft Excel (.xlsx)
```

**Automaticamente (Apps Script):**
```javascript
function exportarExcel() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const blob = ss.getAs('application/vnd.ms-excel');
  
  // Salvar no Drive
  DriveApp.createFile(blob.setName('registros.xlsx'));
  
  // Ou enviar por email
  MailApp.sendEmail({
    to: 'seu-email@gmail.com',
    subject: 'Export de registros',
    body: 'Planilha em anexo',
    attachments: [blob]
  });
}
```

</details>

<details>
<summary><b>Suporta upload de arquivos/fotos?</b></summary>

**Não nativamente.** Google Sheets não armazena arquivos.

**Alternativas:**

1. **Google Drive + Links**
   - Upload manual no Drive
   - Cole link na planilha

2. **Apps Script + Drive API**
   ```javascript
   function salvarArquivo(base64, nome) {
     const blob = Utilities.newBlob(
       Utilities.base64Decode(base64),
       'image/jpeg',
       nome
     );
     const arquivo = DriveApp.createFile(blob);
     return arquivo.getUrl();
   }
   ```

3. **Serviço externo**
   - Cloudinary (gratuito até 25GB)
   - Imgur API
   - AWS S3

</details>

<details>
<summary><b>Como adicionar novos campos?</b></summary>

**Frontend (index.html):**
```html
<!-- Adicione o campo -->
<input name="novaColuna" placeholder="Nova informação">
```

**Backend (Code.gs):**
```javascript
// Em saveRegistro(), adicione:
const linhaAtualizada = [
  // ... campos existentes
  dados.novaColuna || ''  // Nova coluna
];
```

**Planilha:**
```
Adicione uma nova coluna (ex: coluna S)
Atualize o range: getRange(2, 1, lastRow - 1, 19) // era 18
```

**Atenção**: Isso quebra registros antigos sem o campo!
Melhor: crie nova versão da planilha.

</details>

---

## 💰 Custos e Limites

### GitHub Pages (Frontend)

| Recurso | Limite |
|---------|--------|
| **Espaço** | 1 GB |
| **Largura de banda** | 100 GB/mês |
| **Build time** | 10 min/build |
| **Repositórios** | Ilimitados |
| **Custo** | **🆓 R$ 0,00** |

### Google Apps Script (Backend)

| Recurso | Limite Free |
|---------|-------------|
| **Execuções/dia** | 20.000 |
| **Tempo de execução** | 6 min/execução |
| **Triggers/conta** | 20 |
| **Tamanho do script** | 50 MB |
| **Custo** | **🆓 R$ 0,00** |

### Google Sheets (Database)

| Recurso | Limite Free |
|---------|-------------|
| **Células totais** | 10.000.000 |
| **Colunas** | 18.278 |
| **Linhas** | ~555.000 (com 18 cols) |
| **Tamanho** | 5 milhões células/sheet |
| **Custo** | **🆓 R$ 0,00** |

**💰 Custo Total: R$ 0,00/mês**

---

## 📞 Precisa de Ajuda?

### Recursos

- 📖 [README principal](./README.md)
- 🐛 [Reportar bug](https://github.com/GabrielGaks/sistema-registro-violencia/issues)
- 💬 [Discussões](https://github.com/GabrielGaks/sistema-registro-violencia/discussions)
- 📧 Email: gabriel.gaks@example.com

### Comunidade

- [Apps Script Community](https://developers.google.com/apps-script/community)
- [GitHub Community](https://github.community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/google-apps-script)

---

<div align="center">

**🚀 Deploy Completo - Sistema de Registro de Violência Escolar**

*Última atualização: Dezembro 2025*

[![Voltar ao README](https://img.shields.io/badge/←-Voltar_ao_README-blue?style=for-the-badge)](./README.md)

---

**Made with ❤️ by [Gabriel Gaks](https://github.com/GabrielGaks)**

</div>

---

## ⚙️ Passo 1: Configurar o Google Apps Script

### 1.1 Criar o projeto no Apps Script

1. Acesse: https://script.google.com
2. Clique em **"Novo projeto"**
3. Nome do projeto: `Formulario-Violencia-Escolar`

### 1.2 Adicionar o código backend

1. Apague o conteúdo padrão do arquivo `Code.gs`
2. **Cole todo o conteúdo do arquivo `Code.gs` deste repositório**
3. Salve (Ctrl+S)

### 1.3 Fazer Deploy como Web App

1. Clique em **"Implantar"** (canto superior direito)
2. Escolha **"Nova implantação"**
3. Clique no ícone ⚙️ e selecione **"Aplicativo da Web"**
4. Configure:
   - **Executar como**: Eu (sua conta)
   - **Quem tem acesso**: Qualquer pessoa *(importante para aceitar requests do GitHub)*
5. Clique em **"Implantar"**
6. **Autorize o aplicativo** quando solicitado
7. **COPIE A URL** que aparece (parecida com `https://script.google.com/macros/s/XXXXX/exec`)

---

## 🌐 Passo 2: Configurar o Frontend

### 2.1 Colar a URL do Apps Script

1. Abra o arquivo `index.html`
2. Encontre a linha (por volta da linha 900):
   ```javascript
   const APPS_SCRIPT_URL = 'COLE_AQUI_A_URL_DO_SEU_WEB_APP';
   ```
3. **Substitua** pela URL que você copiou:
   ```javascript
   const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXX/exec';
   ```
4. Salve o arquivo

### 2.2 Fazer Deploy no GitHub

1. **Crie um repositório no GitHub** (pode ser público ou privado)
   
2. **Faça o upload dos arquivos**:
   ```bash
   git init
   git add index.html
   git commit -m "Deploy inicial"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
   git push -u origin main
   ```

3. **Ative o GitHub Pages**:
   - Vá em: **Settings** > **Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `root`
   - Clique em **"Save"**

4. **Acesse seu formulário**:
   - URL: `https://SEU_USUARIO.github.io/SEU_REPO/index.html`

---

## ✅ Passo 3: Testar

1. Acesse a URL do GitHub Pages
2. Preencha o formulário
3. Clique em "Salvar Registro"
4. Verifique se os dados apareceram na planilha do Google Sheets

---

## 🔧 Estrutura Final

```
GitHub Pages (Frontend)
    ↓ envia dados via fetch()
Google Apps Script (Backend - Code.gs)
    ↓ processa e salva
Google Sheets (Planilha)
```

---

## 📊 Configuração da Planilha

Certifique-se que a planilha tem estas colunas na **linha 1** (na ordem):

1. Criança/ Estudante
2. Data da NT
3. Idade
4. Identidade de Gênero
5. É PCD/tem Transtorno?
6. Raça/Cor
7. Tipo de Violência
8. Encaminhamento
9. CMEI/EMEF
10. Região
11. Responsável pelo Registro
12. fonte informadores foi a escola?
13. violência identificada pela escola ocorrida na escola
14. Algum profissional da escola foi autor da violência
15. Album estudante foi autor da violência?
16. violência identificada pela escola não ocorrida na escola
17. ocorreu na escola? 1.1
18. violência informada a escola por qualquer um dos agentes que a compõe 1.2

---

## 🆘 Problemas Comuns

### "Configure a URL do Apps Script"
- Você esqueceu de colar a URL no `index.html`
- Verifique a linha com `APPS_SCRIPT_URL`

### "Registro enviado" mas não aparece na planilha
- Verifique o ID da planilha no `Code.gs` (linha 6)
- Verifique o nome da aba no `Code.gs` (linha 9)
- Abra o Apps Script > Execuções > veja se há erros

### CORS Error
- É normal com `mode: 'no-cors'`
- O registro foi salvo mesmo assim
- Para ver erros, abra: Apps Script > Execuções

### "Acesso negado"
- No Apps Script, verifique que "Quem tem acesso" está como "Qualquer pessoa"
- Faça uma nova implantação se necessário

---

## 🔄 Atualizações

### Para atualizar o Frontend:
1. Edite o `index.html` localmente
2. `git add index.html`
3. `git commit -m "Atualização"`
4. `git push`
5. GitHub Pages atualiza automaticamente

### Para atualizar o Backend:
1. Edite o `Code.gs` no Apps Script
2. Salve (Ctrl+S)
3. **Importante**: Vá em Implantar > Gerenciar implantações > ✏️ Editar > Nova versão > Implantar

---

## 💰 Custos

- **GitHub Pages**: GRATUITO
- **Google Apps Script**: GRATUITO
- **Google Sheets**: GRATUITO

**Total: R$ 0,00** 🎉

---

## 🔐 Segurança

- A URL do Apps Script é "secreta" (difícil de adivinhar)
- Apenas quem tem a URL pode enviar dados
- Para mais segurança, adicione verificação de token no `Code.gs`

---

## 📞 Suporte

Se algo não funcionar:
1. Abra o Console do navegador (F12)
2. Vá na aba "Console" e veja os erros
3. No Apps Script, vá em "Execuções" e veja os logs

---

**Última atualização**: 28/11/2025
