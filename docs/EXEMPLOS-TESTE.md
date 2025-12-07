# 🧪 EXEMPLOS DE TESTE - COPIAR E COLAR

## 📌 IMPORTANTE
Substitua `https://sua-api.onrender.com` pela URL real da sua API no Render!

---

## 🔧 TESTE 1: Verificar API (Navegador)

Abra no navegador:
```
https://sua-api.onrender.com
```

**Resultado esperado:**
```json
{
  "message": "API de Gerenciamento de Tarefas",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

---

## 🔧 TESTE 2: Registrar Usuário

### Thunder Client / Postman
```
Método: POST
URL: https://sua-api.onrender.com/auth/register
Headers:
  Content-Type: application/json

Body (JSON):
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

### PowerShell (curl)
```powershell
curl -X POST https://sua-api.onrender.com/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"nome\":\"João Silva\",\"email\":\"joao@email.com\",\"senha\":\"123456\"}'
```

**Resultado esperado:**
```json
{
  "message": "Usuário registrado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

**⚠️ COPIE O TOKEN!**

---

## 🔧 TESTE 3: Login

### Thunder Client / Postman
```
Método: POST
URL: https://sua-api.onrender.com/auth/login
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

### PowerShell (curl)
```powershell
curl -X POST https://sua-api.onrender.com/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"joao@email.com\",\"senha\":\"123456\"}'
```

**Resultado esperado:**
```json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

---

## 🔧 TESTE 4: Listar Usuários (Sem token)

### Thunder Client / Postman
```
Método: GET
URL: https://sua-api.onrender.com/usuarios
```

### PowerShell (curl)
```powershell
curl https://sua-api.onrender.com/usuarios
```

**Resultado esperado:**
```json
{
  "total": 1,
  "usuarios": [
    {
      "_id": "...",
      "nome": "João Silva",
      "email": "joao@email.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

## 🔧 TESTE 5: Criar Tarefa (COM token)

### Thunder Client / Postman
```
Método: POST
URL: https://sua-api.onrender.com/tarefas
Headers:
  Content-Type: application/json
  Authorization: Bearer SEU_TOKEN_AQUI

Body (JSON):
{
  "titulo": "Estudar Node.js",
  "descricao": "Aprender Express e MongoDB",
  "status": "pendente"
}
```

### PowerShell (curl)
```powershell
# SUBSTITUA SEU_TOKEN_AQUI pelo token que você copiou!
curl -X POST https://sua-api.onrender.com/tarefas `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer SEU_TOKEN_AQUI" `
  -d '{\"titulo\":\"Estudar Node.js\",\"descricao\":\"Aprender Express e MongoDB\",\"status\":\"pendente\"}'
```

**Resultado esperado:**
```json
{
  "message": "Tarefa criada com sucesso!",
  "tarefa": {
    "_id": "...",
    "titulo": "Estudar Node.js",
    "descricao": "Aprender Express e MongoDB",
    "status": "pendente",
    "userId": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**⚠️ COPIE O _id DA TAREFA!**

---

## 🔧 TESTE 6: Listar Tarefas (COM token)

### Thunder Client / Postman
```
Método: GET
URL: https://sua-api.onrender.com/tarefas
Headers:
  Authorization: Bearer SEU_TOKEN_AQUI
```

### PowerShell (curl)
```powershell
curl https://sua-api.onrender.com/tarefas `
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resultado esperado:**
```json
{
  "total": 1,
  "tarefas": [
    {
      "_id": "...",
      "titulo": "Estudar Node.js",
      "descricao": "Aprender Express e MongoDB",
      "status": "pendente",
      "userId": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

## 🔧 TESTE 7: Buscar Tarefa Específica

### Thunder Client / Postman
```
Método: GET
URL: https://sua-api.onrender.com/tarefas/ID_DA_TAREFA
Headers:
  Authorization: Bearer SEU_TOKEN_AQUI
```

### PowerShell (curl)
```powershell
# SUBSTITUA ID_DA_TAREFA pelo _id que você copiou!
curl https://sua-api.onrender.com/tarefas/ID_DA_TAREFA `
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

---

## 🔧 TESTE 8: Atualizar Tarefa

### Thunder Client / Postman
```
Método: PUT
URL: https://sua-api.onrender.com/tarefas/ID_DA_TAREFA
Headers:
  Content-Type: application/json
  Authorization: Bearer SEU_TOKEN_AQUI

Body (JSON):
{
  "titulo": "Estudar Node.js - Atualizado",
  "descricao": "Já aprendi Express e MongoDB!",
  "status": "concluida"
}
```

### PowerShell (curl)
```powershell
curl -X PUT https://sua-api.onrender.com/tarefas/ID_DA_TAREFA `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer SEU_TOKEN_AQUI" `
  -d '{\"titulo\":\"Estudar Node.js - Atualizado\",\"descricao\":\"Já aprendi Express e MongoDB!\",\"status\":\"concluida\"}'
```

**Resultado esperado:**
```json
{
  "message": "Tarefa atualizada com sucesso!",
  "tarefa": {
    "_id": "...",
    "titulo": "Estudar Node.js - Atualizado",
    "descricao": "Já aprendi Express e MongoDB!",
    "status": "concluida",
    "userId": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

## 🔧 TESTE 9: Excluir Tarefa

### Thunder Client / Postman
```
Método: DELETE
URL: https://sua-api.onrender.com/tarefas/ID_DA_TAREFA
Headers:
  Authorization: Bearer SEU_TOKEN_AQUI
```

### PowerShell (curl)
```powershell
curl -X DELETE https://sua-api.onrender.com/tarefas/ID_DA_TAREFA `
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

**Resultado esperado:**
```json
{
  "message": "Tarefa excluída com sucesso!",
  "tarefa": { ... }
}
```

---

## 🔧 TESTE 10: Tentar Criar Tarefa SEM Token (Deve Falhar)

### Thunder Client / Postman
```
Método: POST
URL: https://sua-api.onrender.com/tarefas
Headers:
  Content-Type: application/json

Body (JSON):
{
  "titulo": "Teste sem token",
  "status": "pendente"
}
```

### PowerShell (curl)
```powershell
curl -X POST https://sua-api.onrender.com/tarefas `
  -H "Content-Type: application/json" `
  -d '{\"titulo\":\"Teste sem token\",\"status\":\"pendente\"}'
```

**Resultado esperado (ERRO 401):**
```json
{
  "error": "Acesso negado. Token não fornecido."
}
```

✅ **Isso prova que a segurança está funcionando!**

---

## 🔧 TESTE 11: Login com Senha Errada (Deve Falhar)

### Thunder Client / Postman
```
Método: POST
URL: https://sua-api.onrender.com/auth/login
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "joao@email.com",
  "senha": "senha_errada"
}
```

### PowerShell (curl)
```powershell
curl -X POST https://sua-api.onrender.com/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"joao@email.com\",\"senha\":\"senha_errada\"}'
```

**Resultado esperado (ERRO 401):**
```json
{
  "error": "Email ou senha incorretos."
}
```

---

## 📋 CHECKLIST DE TESTES

Execute os testes nesta ordem e marque:

- [ ] 1. API responde na URL raiz
- [ ] 2. Registrar novo usuário (recebe token)
- [ ] 3. Fazer login (recebe token)
- [ ] 4. Listar usuários (sem token)
- [ ] 5. Criar tarefa COM token (funciona)
- [ ] 6. Listar tarefas COM token (funciona)
- [ ] 7. Buscar tarefa específica COM token
- [ ] 8. Atualizar tarefa COM token
- [ ] 9. Excluir tarefa COM token
- [ ] 10. Tentar criar tarefa SEM token (erro 401)
- [ ] 11. Login com senha errada (erro 401)

---

## 🎯 TODOS OS TESTES PASSARAM?

✅ **Sua API está funcionando perfeitamente!**
✅ **Pronta para ser entregue!**

**Link para entregar:**
```
https://sua-api.onrender.com
```

🎉 **Parabéns! Trabalho completo!**
