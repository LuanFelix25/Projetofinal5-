# 🧪 TESTAR API LOCALMENTE

## 📝 PASSO A PASSO

### 1. Configurar MongoDB Atlas

Antes de testar, você precisa configurar o MongoDB Atlas:

1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie conta e cluster gratuito (M0)
3. Crie um usuário no banco de dados
4. Libere acesso de rede (0.0.0.0/0)
5. Copie a string de conexão

### 2. Configurar o arquivo .env

Edite o arquivo `.env` com suas credenciais:

```env
PORT=5000
MONGODB_URI=mongodb+srv://SEU_USUARIO:SUA_SENHA@cluster0.xxxxx.mongodb.net/tarefas?retryWrites=true&w=majority
JWT_SECRET=seu_segredo_jwt_aqui_12345
```

**IMPORTANTE:** Substitua os valores acima pelos seus dados reais do MongoDB Atlas!

### 3. Instalar dependências (se ainda não instalou)

```bash
npm install
```

### 4. Iniciar o servidor

```bash
npm start
```

Você deve ver:
```
🚀 Servidor rodando na porta 5000
✅ Conectado ao MongoDB
```

### 5. Testar os endpoints

Use o **Postman**, **Insomnia**, **Thunder Client** ou **curl**.

---

## 🔧 TESTES COM THUNDER CLIENT (VS CODE)

### Instalar Thunder Client
1. No VS Code, vá em Extensions (Ctrl+Shift+X)
2. Busque "Thunder Client"
3. Instale e abra (ícone de raio na barra lateral)

### Teste 1: Verificar API
**GET** `http://localhost:5000/`

Resposta esperada: JSON com informações da API

### Teste 2: Registrar usuário
**POST** `http://localhost:5000/auth/register`

Headers:
```
Content-Type: application/json
```

Body (JSON):
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

Resposta esperada:
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

**IMPORTANTE:** Copie o `token` para usar nos próximos testes!

### Teste 3: Fazer login
**POST** `http://localhost:5000/auth/login`

Headers:
```
Content-Type: application/json
```

Body (JSON):
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

Resposta esperada: token e dados do usuário

### Teste 4: Listar usuários
**GET** `http://localhost:5000/usuarios`

Resposta esperada: Array com todos os usuários cadastrados

### Teste 5: Criar tarefa (precisa de token!)
**POST** `http://localhost:5000/tarefas`

Headers:
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

Body (JSON):
```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Aprender Express e MongoDB",
  "status": "pendente"
}
```

Resposta esperada:
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

### Teste 6: Listar tarefas do usuário
**GET** `http://localhost:5000/tarefas`

Headers:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

Resposta esperada: Array com todas as tarefas do usuário logado

### Teste 7: Atualizar tarefa
**PUT** `http://localhost:5000/tarefas/ID_DA_TAREFA`

Headers:
```
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_AQUI
```

Body (JSON):
```json
{
  "titulo": "Estudar Node.js - Atualizado",
  "descricao": "Já aprendi Express e MongoDB!",
  "status": "concluida"
}
```

### Teste 8: Excluir tarefa
**DELETE** `http://localhost:5000/tarefas/ID_DA_TAREFA`

Headers:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

### Teste 9: Tentar acessar sem token (deve falhar)
**GET** `http://localhost:5000/tarefas`

(Sem o header Authorization)

Resposta esperada:
```json
{
  "error": "Acesso negado. Token não fornecido."
}
```

---

## 🔧 TESTES COM CURL (PowerShell)

### Registrar usuário
```powershell
curl -X POST http://localhost:5000/auth/register `
  -H "Content-Type: application/json" `
  -d '{\"nome\":\"João Silva\",\"email\":\"joao@email.com\",\"senha\":\"123456\"}'
```

### Login
```powershell
curl -X POST http://localhost:5000/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"joao@email.com\",\"senha\":\"123456\"}'
```

### Criar tarefa (substitua SEU_TOKEN)
```powershell
curl -X POST http://localhost:5000/tarefas `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer SEU_TOKEN" `
  -d '{\"titulo\":\"Estudar Node.js\",\"status\":\"pendente\"}'
```

### Listar tarefas
```powershell
curl -X GET http://localhost:5000/tarefas `
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## ✅ CHECKLIST DE TESTES

Marque cada teste conforme fizer:

- [ ] API responde em `http://localhost:5000/`
- [ ] Consegue registrar novo usuário
- [ ] Consegue fazer login
- [ ] Recebe token JWT no login
- [ ] Consegue listar usuários
- [ ] Consegue criar tarefa COM token
- [ ] NÃO consegue criar tarefa SEM token (erro 401)
- [ ] Consegue listar tarefas do usuário COM token
- [ ] NÃO consegue listar tarefas SEM token (erro 401)
- [ ] Consegue atualizar tarefa COM token
- [ ] Consegue excluir tarefa COM token
- [ ] Usuário só vê suas próprias tarefas

---

## 🎉 PRÓXIMOS PASSOS

Se todos os testes passaram, você está pronto para:

1. ✅ Fazer commit do código
2. ✅ Enviar para o GitHub
3. ✅ Fazer deploy no Render

Consulte o arquivo `GUIA-DEPLOY-RENDER.md` para instruções completas!
