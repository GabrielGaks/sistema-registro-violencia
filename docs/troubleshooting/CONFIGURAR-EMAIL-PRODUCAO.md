# 📧 Configurar Envio de Email em Produção

## ✅ O que foi implementado

1. **Envio automático de email** quando alguém solicita recuperação de senha
2. **Template HTML bonito** para o email
3. **Remoção do token** da resposta (segurança)
4. **Link de reset** incluído no email

## 🔧 Configuração Necessária

### Passo 1: Configurar URL Base do Site

No arquivo `backend/Code-Supabase.gs`, encontre a linha:

```javascript
const SITE_BASE_URL = 'https://seu-usuario.github.io/seu-repo/FormularioRegistroV2';
```

**Substitua pela URL real do seu site:**

#### Se estiver no GitHub Pages:
```
https://SEU-USUARIO.github.io/SEU-REPO/FormularioRegistroV2
```

#### Se tiver domínio próprio:
```
https://seudominio.com
```

**Exemplo:**
```javascript
const SITE_BASE_URL = 'https://meusite.github.io/sistema-violencia/FormularioRegistroV2';
```

### Passo 2: Configurar Permissões do Google Apps Script

O Google Apps Script precisa de permissão para enviar emails:

1. Abra o projeto no Google Apps Script
2. Execute a função `testarEnvioEmail()` (menu Executar)
3. Na primeira execução, você verá uma tela de autorização
4. Clique em **"Revisar permissões"**
5. Escolha sua conta Google
6. Clique em **"Avançado"** > **"Ir para [Nome do Projeto] (não seguro)"**
7. Clique em **"Permitir"**

### Passo 3: Testar o Envio de Email

1. No Google Apps Script, vá em **Executar** > **testarEnvioEmail**
2. **IMPORTANTE:** Antes de executar, edite a função e coloque seu email:
   ```javascript
   const emailTeste = 'seu-email@gmail.com'; // ⚠️ Altere aqui
   ```
3. Execute a função
4. Verifique sua caixa de entrada (e spam)
5. Você deve receber um email com o template bonito

### Passo 4: Verificar se está funcionando

1. Acesse `recuperar-senha.html` no seu site
2. Digite um email cadastrado
3. Clique em "Enviar Solicitação"
4. Verifique a caixa de entrada do email
5. O email deve chegar em alguns segundos

## 📧 Template do Email

O email enviado contém:
- ✅ Design responsivo e moderno
- ✅ Botão grande para redefinir senha
- ✅ Link alternativo caso o botão não funcione
- ✅ Avisos de segurança (expiração, uso único)
- ✅ Instruções claras

## ⚠️ Importante

### Segurança
- ✅ Token **não é mais retornado** na resposta
- ✅ Email só é enviado se o usuário existir (mas não revela isso)
- ✅ Token expira em 1 hora
- ✅ Token só pode ser usado uma vez

### Limites do Google Apps Script
- **Quota diária**: 100 emails por dia (gratuito)
- **Quota por execução**: 20 emails por execução
- Se precisar de mais, considere usar Gmail API ou serviço de email externo

### Troubleshooting

#### Email não está chegando
1. Verifique a pasta de **Spam/Lixo Eletrônico**
2. Verifique os logs do Google Apps Script (Visualizar > Registros de execução)
3. Verifique se a função `enviarEmailRecuperacaoSenha` está sendo chamada
4. Teste com `testarEnvioEmail()` primeiro

#### Erro de permissão
1. Execute `testarEnvioEmail()` novamente
2. Revise as permissões no Google Apps Script
3. Verifique se está usando a conta correta do Google

#### Link não funciona
1. Verifique se `SITE_BASE_URL` está correto
2. Teste o link manualmente no navegador
3. Verifique se o site está acessível publicamente

## 🧪 Teste Completo

1. ✅ Configure `SITE_BASE_URL` no `backend/Code-Supabase.gs`
2. ✅ Execute `testarEnvioEmail()` e receba o email
3. ✅ Teste o fluxo completo:
   - Acesse `recuperar-senha.html`
   - Digite um email cadastrado
   - Receba o email
   - Clique no link
   - Redefina a senha

## 📝 Notas Finais

- O email é enviado **automaticamente** quando alguém solicita recuperação
- Não é mais necessário copiar/colar tokens manualmente
- O sistema está **pronto para produção** após configurar a URL base
- Mantenha a URL atualizada se mudar de domínio

