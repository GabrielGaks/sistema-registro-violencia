# 🔧 Solução: Popup de Autorização Não Aparece

## ❌ Problema
O popup de autorização não aparece ao executar o script.

## ✅ Soluções (Tente na Ordem)

### Solução 1: Usar Função de Forçar Autorização (RECOMENDADO)

1. **No Google Apps Script:**
   - Vá em **Executar** > **forcarAutorizacaoEmail**
   - Clique em **"Executar"** (▶️)
   - Esta função foi criada especificamente para forçar a autorização

2. **Aguarde o Popup:**
   - Deve aparecer a tela de autorização
   - Se não aparecer, tente a Solução 2

### Solução 2: Revogar Permissões e Reautorizar

1. **Revogar Permissões Antigas:**
   - Acesse: https://myaccount.google.com/permissions
   - Procure por **"Google Apps Script API"** ou **"Apps Script"**
   - Clique em **"Remover acesso"** ou **"Revogar"**

2. **No Google Apps Script:**
   - Feche e reabra o projeto
   - Execute **forcarAutorizacaoEmail()** novamente
   - O popup deve aparecer agora

### Solução 3: Executar Diretamente no Editor

1. **No Google Apps Script:**
   - Cole este código no editor:
   ```javascript
   function autorizarEmail() {
     MailApp.sendEmail({
       to: Session.getActiveUser().getEmail(),
       subject: 'Teste',
       body: 'Teste'
     });
   }
   ```

2. **Execute:**
   - Vá em **Executar** > **autorizarEmail**
   - O popup deve aparecer

### Solução 4: Verificar Configurações do Projeto

1. **No Google Apps Script:**
   - Clique em **"Projeto"** (ícone de engrenagem) > **"Configurações do projeto"**
   - Verifique se há alguma restrição de execução
   - Certifique-se de que está usando a conta correta

2. **Verificar Manifest:**
   - Vá em **"Ver"** > **"manifest.appsscript"**
   - Se o arquivo existir, verifique se há `oauthScopes`
   - Se não existir, crie um arquivo `appsscript.json`:
   ```json
   {
     "timeZone": "America/Sao_Paulo",
     "oauthScopes": [
       "https://www.googleapis.com/auth/script.send_mail"
     ]
   }
   ```

### Solução 5: Usar Conta Diferente

1. **Trocar Conta:**
   - No Google Apps Script, clique no seu perfil (canto superior direito)
   - Escolha **"Adicionar conta"** ou **"Trocar conta"**
   - Use uma conta diferente
   - Execute o script novamente

### Solução 6: Executar via doPost (Alternativa)

Se nada funcionar, você pode testar via requisição HTTP:

1. **No Google Apps Script:**
   - Vá em **Implantar** > **Implantar como aplicativo da Web**
   - Copie a URL
   - Use um cliente HTTP (Postman, curl, etc.) para fazer uma requisição POST:
   ```json
   {
     "action": "request_password_reset",
     "email": "seu-email@gmail.com"
   }
   ```
   - Isso pode forçar a autorização

## 🔍 Verificações Adicionais

### Verificar se já está autorizado

1. **Teste Simples:**
   - Execute este código no console do Apps Script:
   ```javascript
   try {
     MailApp.sendEmail({
       to: 'teste@teste.com',
       subject: 'Teste',
       body: 'Teste'
     });
   } catch(e) {
     Logger.log('Erro: ' + e.toString());
   }
   ```

2. **Se der erro de permissão:**
   - Precisa autorizar (siga as soluções acima)

3. **Se não der erro:**
   - Já está autorizado! O problema pode ser outro

### Verificar Logs

1. **No Google Apps Script:**
   - Vá em **Visualizar** > **Registros de execução**
   - Veja se há mensagens de erro
   - Procure por "permission" ou "authorization"

## 📝 Passo a Passo Completo

1. ✅ Execute **forcarAutorizacaoEmail()**
2. ✅ Se não aparecer popup, revogue permissões em https://myaccount.google.com/permissions
3. ✅ Feche e reabra o Google Apps Script
4. ✅ Execute **forcarAutorizacaoEmail()** novamente
5. ✅ Quando o popup aparecer:
   - Clique em **"Revisar permissões"**
   - Escolha sua conta
   - Clique em **"Avançado"**
   - Clique em **"Ir para [Nome] (não seguro)"**
   - Clique em **"Permitir"**
6. ✅ Execute **testarEnvioEmail()** para testar

## ⚠️ Importante

- O popup pode demorar alguns segundos para aparecer
- Certifique-se de que não há bloqueadores de popup ativos
- Use o navegador Chrome (recomendado)
- Certifique-se de que está logado na conta correta do Google

## 🆘 Se Nada Funcionar

1. **Criar Novo Projeto:**
   - Crie um novo projeto no Google Apps Script
   - Copie o código do `backend/Code-Supabase.gs`
   - Cole no novo projeto
   - Execute novamente

2. **Contatar Suporte:**
   - Verifique a documentação oficial: https://developers.google.com/apps-script/guides/support/troubleshooting#authorization

## ✅ Checklist

- [ ] Tentei executar `forcarAutorizacaoEmail()`
- [ ] Revoguei permissões antigas
- [ ] Fechei e reabri o Google Apps Script
- [ ] Verifiquei se estou usando a conta correta
- [ ] Tentei executar código simples de teste
- [ ] Verifiquei os logs de execução

