# API de Gerenciamento de Tarefas

API RESTful desenvolvida com Node.js, Express e MongoDB para gerenciar tarefas com autenticação JWT.

## 🚀 Tecnologias

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- BCryptjs

## 📋 Endpoints

### Autenticação (auth)

#### Registrar Usuário
```
POST /auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "joao@email.com",
  "senha": "senha123"
}

Retorna: { token, user }
```

### Usuários (usuarios)

#### Listar Todos os Usuários
```
GET /usuarios
```

### Tarefas (tarefas) - 🔒 Protegido com JWT

Todas as rotas de tarefas requerem o header:
```
Authorization: Bearer SEU_TOKEN_JWT
```

#### Criar Tarefa
```
POST /tarefas
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "titulo": "Minha tarefa",
  "descricao": "Descrição da tarefa",
  "status": "pendente"
}
```

#### Listar Tarefas do Usuário
```
GET /tarefas
Authorization: Bearer TOKEN
```

#### Buscar Tarefa Específica
```
GET /tarefas/:id
Authorization: Bearer TOKEN
```

#### Alterar Tarefa
```
PUT /tarefas/:id
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "titulo": "Título atualizado",
  "descricao": "Nova descrição",
  "status": "concluida"
}
```

#### Excluir Tarefa
```
DELETE /tarefas/:id
Authorization: Bearer TOKEN
```

## 🔧 Instalação Local

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env` baseado no `.env.example`:
```env
PORT=5000
MONGODB_URI=sua_string_de_conexao_mongodb
JWT_SECRET=seu_segredo_jwt
```

4. Inicie o servidor:
```bash
npm start
```

## ☁️ Deploy no Render

### Passo 1: Criar conta MongoDB Atlas

1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie um cluster gratuito
3. Em "Database Access", crie um usuário
4. Em "Network Access", adicione `0.0.0.0/0` (permitir de qualquer lugar)
5. Copie a string de conexão

### Passo 2: Deploy no Render

1. Acesse [Render](https://render.com)
2. Crie uma conta (pode usar GitHub)
3. Clique em "New +" → "Web Service"
4. Conecte seu repositório GitHub ou use "Public Git repository"
5. Configure:
   - **Name**: api-tarefas (ou outro nome)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Em "Environment Variables", adicione:
   - `MONGODB_URI` = sua string de conexão do MongoDB
   - `JWT_SECRET` = um segredo aleatório (ex: `meu_segredo_super_secreto_12345`)
7. Clique em "Create Web Service"

### Passo 3: Aguardar Deploy

O Render vai:
- Instalar as dependências
- Iniciar o servidor
- Fornecer uma URL pública (ex: `https://api-tarefas.onrender.com`)

## 🧪 Testando a API

Você pode testar usando:
- **Postman**
- **Insomnia**
- **Thunder Client** (extensão VS Code)
- **curl**

Exemplo com curl:
```bash
# Registrar
curl -X POST https://sua-api.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com","senha":"123456"}'

# Login
curl -X POST https://sua-api.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"123456"}'

# Criar tarefa (use o token recebido)
curl -X POST https://sua-api.onrender.com/tarefas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"titulo":"Minha tarefa","status":"pendente"}'
```

## 📝 Status de Tarefas

- `pendente` - Tarefa ainda não iniciada
- `em_andamento` - Tarefa em execução
- `concluida` - Tarefa finalizada

## 🔐 Segurança

- Senhas são criptografadas com bcryptjs
- Autenticação via JWT com expiração de 7 dias
- Rotas de tarefas protegidas com middleware de autenticação
- Usuários só podem ver/editar suas próprias tarefas
