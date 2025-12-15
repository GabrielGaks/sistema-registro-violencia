# 🔒 Guia de Segurança e Organização

## 📋 Módulos de Segurança Criados

Foram criados módulos JavaScript para melhorar a segurança e organização do código:

### 1. `js/security.js` - Módulo de Segurança
Utilitários para sanitização, validação e proteção contra ataques comuns.

**Funcionalidades:**
- ✅ Sanitização de strings (prevenção XSS)
- ✅ Validação de email, URL, data, idade
- ✅ Sanitização de objetos e formulários
- ✅ Prevenção de injeção SQL básica
- ✅ Geração e validação de tokens CSRF
- ✅ Limitação de tamanho de strings
- ✅ Remoção de informações sensíveis de logs

**Uso:**
```javascript
// Sanitizar string
const safe = Security.sanitizeString(userInput);

// Validar email
if (Security.validateEmail(email)) {
  // email válido
}

// Sanitizar objeto
const safeData = Security.sanitizeObject(formData);
```

### 2. `js/api.js` - Módulo de API
Centraliza todas as chamadas de API com validações de segurança.

**Funcionalidades:**
- ✅ Validação de URLs antes de fazer requisições
- ✅ Sanitização automática de dados enviados
- ✅ Timeout configurável
- ✅ Tratamento de erros padronizado
- ✅ Métodos específicos (login, saveCase, updateCase, etc.)

**Uso:**
```javascript
// Login seguro
try {
  const result = await API.login(email, password);
  // resultado já sanitizado
} catch (error) {
  // erro tratado
}

// Salvar caso
const result = await API.saveCase(casoData);
```

### 3. `js/logger.js` - Módulo de Logging Seguro
Sistema de logs que protege informações sensíveis.

**Funcionalidades:**
- ✅ Logs condicionais (só se DEBUG_MODE estiver ativo)
- ✅ Sanitização automática de dados sensíveis
- ✅ Remoção de URLs, tokens e IDs de logs
- ✅ Métodos: log, error, warn, info, success

**Uso:**
```javascript
// Log seguro (só aparece se DEBUG_MODE = true)
Logger.log('Operação realizada', data);

// Erro (sempre loga, mas sanitiza)
Logger.error('Erro ao processar', error);

// Sucesso (só se debug)
Logger.success('Salvo com sucesso');
```

## 🔐 Proteção de Credenciais

### Sistema de Configuração Local

O `config.js` agora suporta carregamento de `config.local.js`:

1. **Crie `config.local.js`** (baseado em `config.local.example.js`):
   ```javascript
   const CONFIG_LOCAL = {
     APPS_SCRIPT_AUTH: 'sua-url-aqui',
     APPS_SCRIPT_CASOS: 'sua-url-aqui',
     SPREADSHEET_ID: 'seu-id-aqui',
     SUPABASE_URL: 'sua-url-aqui',
     SUPABASE_KEY: 'sua-chave-aqui'
   };
   
   if (typeof window !== 'undefined') {
     window.CONFIG_LOCAL = CONFIG_LOCAL;
   }
   ```

2. **O arquivo `config.local.js` está no `.gitignore`** e não será commitado.

3. **Carregue o loader** nos HTMLs (opcional, mas recomendado):
   ```html
   <script src="config.js"></script>
   <script src="js/config-loader.js"></script>
   ```

### Para Produção no GitHub

**Opção 1: Usar config.local.js (Recomendado)**
- Crie `config.local.js` localmente
- Não faça commit (já está no .gitignore)
- Configure via GitHub Secrets ou variáveis de ambiente no servidor

**Opção 2: Variáveis de Ambiente**
- Use `getEnvVar()` no `config.js`
- Configure via GitHub Secrets
- Ou use `window.ENV` para injetar variáveis

**Opção 3: Remover Credenciais do config.js**
- Remova valores padrão hardcoded
- Use apenas `getEnvVar()` sem fallback
- Configure tudo via ambiente

## 📝 Como Integrar (Opcional)

Os módulos são **opcionais** e não quebram funcionalidade existente. Para usar:

### 1. Adicionar Scripts nos HTMLs

```html
<!-- Antes de outros scripts -->
<script src="js/security.js"></script>
<script src="js/logger.js"></script>
<script src="js/api.js"></script>
```

### 2. Substituir console.log por Logger

**Antes:**
```javascript
console.log('Enviando para:', APPS_SCRIPT_URL);
```

**Depois:**
```javascript
Logger.log('Enviando requisição', { url: APPS_SCRIPT_URL });
```

### 3. Usar API Module para Requisições

**Antes:**
```javascript
const response = await fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  body: 'data=' + encodeURIComponent(JSON.stringify(dados))
});
```

**Depois:**
```javascript
const result = await API.call('auth', { action: 'login', email, password });
```

### 4. Sanitizar Inputs

**Antes:**
```javascript
const userInput = document.getElementById('input').value;
```

**Depois:**
```javascript
const userInput = Security.sanitizeString(document.getElementById('input').value);
```

## ⚠️ Importante

- ✅ **Os módulos são opcionais** - o sistema continua funcionando sem eles
- ✅ **Compatibilidade mantida** - não quebra código existente
- ✅ **Integração gradual** - pode ser feita aos poucos
- ✅ **Funcionalidade preservada** - tudo continua funcionando igual

## 🎯 Boas Práticas Implementadas

1. **Sanitização de Inputs**
   - Todos os dados do usuário são sanitizados antes de processar
   - Prevenção de XSS e injeção de código

2. **Validação de Dados**
   - Validação de email, URL, data, idade
   - Validação de tipos e formatos

3. **Proteção de Logs**
   - Informações sensíveis são removidas dos logs
   - Logs condicionais (só em modo debug)

4. **Validação de URLs**
   - Apenas HTTP/HTTPS permitidos
   - Validação antes de fazer requisições

5. **Timeout em Requisições**
   - Previne requisições infinitas
   - Configurável via CONFIG.REQUEST_TIMEOUT

6. **Tratamento de Erros**
   - Erros padronizados e informativos
   - Sem exposição de detalhes internos

## 📚 Documentação Adicional

- Ver código-fonte dos módulos para documentação completa
- Cada função tem comentários JSDoc explicando uso
- Exemplos de uso estão nos comentários

## 🔄 Migração Gradual

Você pode migrar gradualmente:

1. **Fase 1:** Adicione os scripts, mas não use ainda
2. **Fase 2:** Substitua console.log por Logger em novos códigos
3. **Fase 3:** Use Security para sanitizar novos inputs
4. **Fase 4:** Migre requisições antigas para API module
5. **Fase 5:** Complete a migração

Tudo continua funcionando em cada fase!

