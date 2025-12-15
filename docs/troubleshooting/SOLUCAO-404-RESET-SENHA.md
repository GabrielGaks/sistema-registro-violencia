# 🔧 Solução para Erro 404 em resetar-senha.html

## ❌ Problema
O servidor local (Live Server) está retornando 404 ao acessar `resetar-senha.html`.

## ✅ Soluções

### Solução 1: Verificar pasta do servidor (MAIS COMUM)

O servidor precisa estar rodando na pasta `FormularioRegistroV2`, não na pasta raiz do projeto.

**Passos:**
1. Feche o servidor atual (se estiver rodando)
2. No VS Code, clique com botão direito na pasta `FormularioRegistroV2`
3. Selecione **"Open with Live Server"** ou **"Open in Integrated Terminal"**
4. Se usar terminal, navegue até a pasta:
   ```powershell
   cd "FormularioRegistroV2"
   ```
5. Inicie o servidor na pasta correta

### Solução 2: Acessar com caminho completo

Se o servidor está na raiz do projeto, acesse:
```
http://127.0.0.1:5503/FormularioRegistroV2/resetar-senha.html?token=SEU_TOKEN
```

### Solução 3: Reiniciar o servidor

1. Pare o servidor (Ctrl+C no terminal ou clique no botão "Go Live" novamente)
2. Feche todas as abas do navegador com o servidor
3. Reinicie o servidor
4. Acesse novamente a página

### Solução 4: Verificar se o arquivo está na pasta correta

O arquivo deve estar em:
```
Projeto NAAM/
  └── FormularioRegistroV2/
      └── resetar-senha.html  ← Aqui!
```

## 🧪 Teste rápido

1. Acesse: `http://127.0.0.1:5503/index.html`
2. Se funcionar, o servidor está na pasta correta
3. Se não funcionar, o servidor está na pasta errada

## 📝 Nota sobre outros erros

Os erros relacionados a:
- `products.json` 
- `content.bundle.js`
- `.well-known/appspecific/com.chrome.devtools.json`

São de **extensões do navegador** (como extensões de desenvolvedor) e **não afetam** o funcionamento do seu sistema. Você pode ignorá-los.

## ✅ Checklist

- [ ] Servidor está rodando na pasta `FormularioRegistroV2`
- [ ] Arquivo `resetar-senha.html` existe na pasta
- [ ] Tentou acessar com o caminho completo se necessário
- [ ] Reiniciou o servidor após mudanças

