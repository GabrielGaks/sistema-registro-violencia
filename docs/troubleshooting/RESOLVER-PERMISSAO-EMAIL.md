# 🔐 Resolver Permissão de Envio de Email

## ❌ Erro Encontrado

```
Exception: You do not have permission to call MailApp.sendEmail
Required permissions: https://www.googleapis.com/auth/script.send_mail
```

## ✅ Solução Passo a Passo

### Método 1: Autorizar via Execução (RECOMENDADO)

1. **No Google Apps Script:**
   - Vá em **Executar** > **testarEnvioEmail**
   - Clique no botão **"Executar"** (▶️)

2. **Primeira Execução:**
   - Uma janela de autorização aparecerá
   - Clique em **"Revisar permissões"**

3. **Escolha sua Conta:**
   - Selecione a conta Google que você quer usar
   - Clique em **"Avançado"**

4. **Aceitar Aviso de Segurança:**
   - Você verá: *"O Google não verificou este app"*
   - Clique em **"Ir para [Nome do Projeto] (não seguro)"**
   - ⚠️ Isso é normal para apps não publicados

5. **Permitir Acesso:**
   - Clique em **"Permitir"**
   - Aguarde a autorização ser concluída

6. **Teste Novamente:**
   - Execute `testarEnvioEmail()` novamente
   - Agora deve funcionar! ✅

### Método 2: Autorizar via Manifest (ALTERNATIVA)

Se o Método 1 não funcionar:

1. **No Google Apps Script:**
   - Clique em **"Projeto"** (ícone de engrenagem) > **"Configurações do projeto"**
   - Ou vá em **"Ver"** > **"manifest.appsscript"**

2. **Adicionar Escopo:**
   - Se o arquivo `appsscript.json` existir, adicione:
   ```json
   {
     "oauthScopes": [
       "https://www.googleapis.com/auth/script.send_mail"
     ]
   }
   ```

3. **Salvar e Executar:**
   - Salve o arquivo
   - Execute `testarEnvioEmail()` novamente

### Método 3: Verificar Permissões Existentes

1. **Verificar Permissões:**
   - Vá em **"Executar"** > **"Gerenciar implantações"**
   - Ou acesse: https://myaccount.google.com/permissions
   - Procure por "Google Apps Script API"
   - Verifique se está autorizado

2. **Remover e Reautorizar:**
   - Se necessário, remova a autorização antiga
   - Execute o script novamente para reautorizar

## 🔍 Verificações Adicionais

### Verificar se a Conta está Correta

1. **No Google Apps Script:**
   - Verifique qual conta está logada (canto superior direito)
   - Certifique-se de que é a conta que você quer usar para enviar emails

### Verificar Quotas

O Google Apps Script tem limites:
- **100 emails por dia** (gratuito)
- **20 emails por execução**

Se você já enviou muitos emails hoje, pode estar no limite.

## 🧪 Teste Após Autorização

Após autorizar, execute novamente:

```javascript
testarEnvioEmail()
```

**Resultado esperado:**
```
✅ Email de teste enviado com sucesso!
📧 Verifique a caixa de entrada (e spam) de: gabriel.260902@gmail.com
```

## ⚠️ Problemas Comuns

### "Acesso negado" mesmo após autorizar
- **Solução:** Feche e reabra o Google Apps Script
- Execute o script novamente

### "App não verificado"
- **Isso é normal** para apps não publicados
- Clique em "Avançado" > "Ir para [Nome] (não seguro)"
- É seguro se você criou o script

### Email não chega
- Verifique a pasta de **Spam/Lixo Eletrônico**
- Verifique se o email de destino está correto
- Verifique os logs do Google Apps Script

## 📝 Nota Importante

⚠️ **IMPORTANTE:** Você também precisa configurar a URL base antes de usar em produção!

No arquivo `backend/Code-Supabase.gs`, linha ~15, altere:

```javascript
const SITE_BASE_URL = 'https://seu-usuario.github.io/seu-repo/FormularioRegistroV2';
```

Para a URL real do seu site.

## ✅ Checklist

- [ ] Executei `testarEnvioEmail()` e vi a tela de autorização
- [ ] Cliquei em "Revisar permissões"
- [ ] Escolhi minha conta Google
- [ ] Cliquei em "Avançado" > "Ir para [Nome] (não seguro)"
- [ ] Cliquei em "Permitir"
- [ ] Executei `testarEnvioEmail()` novamente
- [ ] Recebi o email de teste
- [ ] Configurei `SITE_BASE_URL` no código

## 🎉 Pronto!

Após seguir estes passos, o envio de email deve funcionar perfeitamente!

