# ⚡ COMANDOS RÁPIDOS - DEPLOY NO RENDER

## 🚀 PASSO A PASSO RÁPIDO

### 1️⃣ Preparar MongoDB Atlas
```
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie cluster gratuito (M0)
3. Crie usuário do banco
4. Libere IP: 0.0.0.0/0
5. Copie a string de conexão
```

### 2️⃣ Configurar Git e GitHub

#### Inicializar Git (se necessário)
```powershell
git init
git add .
git commit -m "API completa de gerenciamento de tarefas"
```

#### Criar repositório no GitHub
```
1. Acesse: https://github.com/new
2. Nome: api-tarefas
3. Não adicione README
4. Clique em "Create repository"
```

#### Enviar código para GitHub
```powershell
# Substitua SEU_USUARIO pelo seu username do GitHub
git remote add origin https://github.com/SEU_USUARIO/api-tarefas.git
git branch -M main
git push -u origin main
```

**Se pedir senha:**
- Use um Personal Access Token (não a senha da conta)
- Criar token: https://github.com/settings/tokens
  - "Generate new token (classic)"
  - Marque "repo"
  - Copie e use como senha

### 3️⃣ Deploy no Render

#### Criar conta
```
1. Acesse: https://render.com
2. Login com GitHub (recomendado)
```

#### Criar Web Service
```
1. Clique em "New +" → "Web Service"
2. Conecte seu repositório GitHub
3. Configure:
   - Name: api-tarefas
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
```

#### Adicionar Variáveis de Ambiente
```
MONGODB_URI = mongodb+srv://usuario:senha@cluster.mongodb.net/tarefas
JWT_SECRET = sua_chave_secreta_forte_12345
```

#### Finalizar
```
1. Clique em "Create Web Service"
2. Aguarde deploy (2-5 minutos)
3. Copie a URL fornecida
```

---

## 📋 CHECKLIST RÁPIDO

- [ ] MongoDB Atlas configurado
- [ ] String de conexão copiada
- [ ] Código commitado no Git
- [ ] Repositório criado no GitHub
- [ ] Código enviado para o GitHub
- [ ] Conta criada no Render
- [ ] Web Service criado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy concluído com sucesso
- [ ] URL da API copiada
- [ ] API testada e funcionando

---

## 🧪 TESTAR RAPIDAMENTE

### No navegador:
```
https://sua-api.onrender.com
```
Deve mostrar informações da API

### Com curl (PowerShell):

#### Registrar usuário
```powershell
curl -X POST https://sua-api.onrender.com/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"nome\":\"Teste\",\"email\":\"teste@email.com\",\"senha\":\"123456\"}'
```

#### Login (copie o token)
```powershell
curl -X POST https://sua-api.onrender.com/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"teste@email.com\",\"senha\":\"123456\"}'
```

#### Criar tarefa (substitua SEU_TOKEN)
```powershell
curl -X POST https://sua-api.onrender.com/tarefas `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer SEU_TOKEN" `
  -d '{\"titulo\":\"Teste\",\"status\":\"pendente\"}'
```

#### Listar tarefas
```powershell
curl https://sua-api.onrender.com/tarefas `
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## 🎯 ENTREGA

**Entregar apenas o link:**
```
https://api-tarefas.onrender.com
```

---

## ⚠️ PROBLEMAS COMUNS

### "Application failed to respond"
✅ Verifique variáveis de ambiente
✅ Confirme Start Command: npm start

### "Cannot connect to MongoDB"
✅ Verifique string de conexão
✅ Substitua <password> pela senha real
✅ Libere IP 0.0.0.0/0 no Atlas

### "Build failed"
✅ Confirme package.json no repo
✅ Verifique todas dependências

### API lenta na primeira requisição
✅ Normal no plano gratuito
✅ Render hiberna após 15min inativo
✅ Primeira chamada demora 30-60s

---

## 📞 LINKS ÚTEIS

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- GitHub: https://github.com
- Render: https://render.com
- Gerar Token GitHub: https://github.com/settings/tokens

---

## 🎉 PRONTO!

Siga estes passos e sua API estará no ar! 🚀
