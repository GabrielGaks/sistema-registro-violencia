# 🛡️ Checklist de Segurança para GitHub

## ⚠️ ANTES DE FAZER COMMIT

Verifique se:

- [ ] **NÃO há credenciais reais** em `config.js`
- [ ] **`config.local.js` existe** e está no `.gitignore`
- [ ] **Arquivos `.gs`** estão no `.gitignore`
- [ ] **URLs de Apps Script** não estão hardcoded nos HTMLs
- [ ] **Chaves do Supabase** não estão expostas
- [ ] **IDs de planilhas** não estão em logs públicos

## 🔒 Arquivos que DEVEM estar no .gitignore

```
config.local.js          # Credenciais locais
config.js                # Se contiver credenciais reais
Code-Supabase.gs         # Contém credenciais
Code.gs                  # Contém IDs de planilhas
*.gs.bak                 # Backups
.env*                    # Variáveis de ambiente
```

## ✅ Arquivos SEGUROS para commit

```
config.local.example.js  # Template sem credenciais
js/security.js           # Módulo de segurança
js/api.js                # Módulo de API
js/logger.js             # Módulo de logging
*.html                   # Páginas HTML
styles-elegant.css       # Estilos
page-transitions.js      # Utilitários
```

## 🚨 Se Você Já Expôs Credenciais

1. **IMEDIATAMENTE** altere todas as credenciais:
   - Gere novas chaves no Supabase
   - Crie novos Apps Scripts
   - Atualize IDs de planilhas

2. **Remova do histórico do Git:**
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch config.js" \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **Force push** (⚠️ avise sua equipe):
   ```bash
   git push origin --force --all
   ```

## 📝 Configuração Segura para Produção

### Opção 1: config.local.js (Recomendado)

1. Crie `config.local.js` baseado em `config.local.example.js`
2. Preencha com suas credenciais
3. O arquivo está no `.gitignore` e não será commitado

### Opção 2: Variáveis de Ambiente

1. Use `getEnvVar()` no `config.js`
2. Configure via GitHub Secrets
3. Ou injete via `window.ENV` no build

### Opção 3: GitHub Secrets (CI/CD)

1. Configure secrets no GitHub
2. Use em GitHub Actions
3. Injete no build do projeto

## ✅ Verificação Final

Antes de publicar no GitHub:

```bash
# Verifica se há credenciais no código
grep -r "AKfyc" . --exclude-dir=.git
grep -r "eyJ" . --exclude-dir=.git
grep -r "@gmail.com" . --exclude-dir=.git

# Verifica arquivos que serão commitados
git status
git diff --cached
```

## 📚 Recursos

- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Supabase Security](https://supabase.com/docs/guides/platform/security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

