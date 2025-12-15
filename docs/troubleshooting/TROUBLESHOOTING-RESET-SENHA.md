# 🔧 Troubleshooting - Recuperação de Senha

## ❌ Erro: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

Este erro ocorre quando o servidor retorna HTML em vez de JSON. Isso geralmente acontece por:

### 1. Tabela não criada no Supabase

**Solução:**
1. Acesse o Supabase Dashboard
2. Vá em **SQL Editor**
3. Execute o arquivo `password-reset-tokens.sql`
4. Verifique se a tabela foi criada: vá em **Table Editor** e procure por `password_reset_tokens`

### 2. URL do Google Apps Script incorreta

**Solução:**
1. Abra o arquivo `config.js`
2. Verifique se `APPS_SCRIPT_AUTH` está correto
3. A URL deve ser algo como: `https://script.google.com/macros/s/SEU_ID/exec`
4. Para obter a URL correta:
   - Abra o projeto no Google Apps Script
   - Vá em **Implantar** > **Implantar como aplicativo da Web**
   - Copie a URL de **URL do aplicativo da Web**

### 3. Permissões do Google Apps Script

**Solução:**
1. No Google Apps Script, vá em **Implantar** > **Implantar como aplicativo da Web**
2. Em **Executar como**, escolha: **Eu mesmo**
3. Em **Quem tem acesso ao aplicativo**, escolha: **Qualquer pessoa, mesmo anônimo**
4. Clique em **Implantar** ou **Atualizar**

### 4. Verificar logs do Google Apps Script

**Solução:**
1. Abra o projeto no Google Apps Script
2. Vá em **Executar** > **testarConexaoSupabase** (se existir)
3. Ou vá em **Visualizar** > **Registros de execução**
4. Verifique se há erros relacionados à tabela `password_reset_tokens`

## 🔍 Como debugar

### No navegador (Console):
1. Abra o DevTools (F12)
2. Vá na aba **Console**
3. Procure por mensagens que começam com:
   - `🔄 Validando token...`
   - `📥 Status da resposta:`
   - `📄 Resposta recebida:`

### No Google Apps Script:
1. Abra o projeto
2. Vá em **Visualizar** > **Registros de execução**
3. Procure por logs que começam com:
   - `🔍 Validando token de reset:`
   - `📥 Response code:`
   - `❌ Erro:`

## ✅ Checklist de verificação

- [ ] Tabela `password_reset_tokens` foi criada no Supabase
- [ ] URL do `APPS_SCRIPT_AUTH` está correta em `config.js`
- [ ] Google Apps Script está implantado como aplicativo da Web
- [ ] Permissões do Google Apps Script estão configuradas corretamente
- [ ] Não há erros nos logs do Google Apps Script
- [ ] Cache do navegador foi limpo (Ctrl+Shift+Delete)

## 🧪 Teste manual

1. Acesse `recuperar-senha.html`
2. Digite um email cadastrado
3. Copie o token retornado (em desenvolvimento)
4. Acesse `resetar-senha.html?token=SEU_TOKEN`
5. Verifique o console do navegador para mensagens de erro

## 📝 Notas importantes

- **Em desenvolvimento**: O token é retornado na resposta para facilitar testes
- **Em produção**: Remova a linha que retorna `token` na função `solicitarRecuperacaoSenha()` e implemente envio de email
- Os tokens expiram após 1 hora
- Cada token só pode ser usado uma vez

