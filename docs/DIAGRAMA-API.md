# 📊 DIAGRAMA DA API - VISÃO GERAL

## 🏗️ ARQUITETURA DA API

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTE                              │
│  (Navegador, Postman, Thunder Client, Frontend)            │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     RENDER (Cloud)                          │
│  URL: https://api-tarefas.onrender.com                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVER.JS (Express)                       │
│  - Middlewares (CORS, JSON)                                 │
│  - Conexão MongoDB                                          │
│  - Rotas                                                    │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  /auth   │    │/usuarios │    │/tarefas  │
    │ (rotas)  │    │ (rotas)  │    │ (rotas)  │
    └──────────┘    └──────────┘    └──────────┘
            │               │               │
            │               │               │ (protegido)
            │               │               ▼
            │               │       ┌──────────────┐
            │               │       │ Middleware   │
            │               │       │    JWT       │
            │               │       └──────────────┘
            │               │               │
            └───────────────┴───────────────┘
                            │
                            ▼
            ┌───────────────────────────────┐
            │         MODELS                │
            │  - User.js (Mongoose)        │
            │  - Tarefa.js (Mongoose)      │
            └───────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              MONGODB ATLAS (Cloud Database)                 │
│  - Collections: users, tarefas                             │
│  - Dados criptografados                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 FLUXO DE AUTENTICAÇÃO

```
1. REGISTRO
   Cliente → POST /auth/register → Server
   ↓
   Validar dados
   ↓
   Hash da senha (bcryptjs)
   ↓
   Salvar no MongoDB
   ↓
   Gerar JWT token
   ↓
   Retornar: { token, user }

2. LOGIN
   Cliente → POST /auth/login → Server
   ↓
   Buscar usuário no MongoDB
   ↓
   Comparar senha com hash
   ↓
   Senha correta? ──┐
   │               │
   Sim            Não
   │               │
   Gerar JWT      Retornar erro 401
   │
   Retornar: { token, user }
```

---

## 🔐 FLUXO DE REQUISIÇÃO PROTEGIDA

```
Cliente envia requisição com token
   │
   ▼
POST /tarefas
Headers: Authorization: Bearer TOKEN_JWT
   │
   ▼
Middleware de Autenticação
   │
   ├─── Token existe? ──────────────┐
   │                                │
   Sim                             Não
   │                                │
   ▼                                ▼
Verificar token (jwt.verify)    Retornar erro 401
   │
   ├─── Token válido? ─────────────┐
   │                               │
   Sim                            Não
   │                               │
   ▼                               ▼
req.userId = decoded.userId    Retornar erro 401
   │
   ▼
Processar requisição
   │
   ▼
Acessar MongoDB
   │
   ▼
Retornar resposta
```

---

## 📊 ESTRUTURA DO BANCO DE DADOS

### Collection: users
```javascript
{
  _id: ObjectId,
  nome: String,
  email: String (único),
  senha: String (hash bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: tarefas
```javascript
{
  _id: ObjectId,
  titulo: String,
  descricao: String,
  status: String (pendente|em_andamento|concluida),
  userId: ObjectId (referência para users),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛣️ MAPA DE ROTAS

### 🔓 ROTAS PÚBLICAS (Sem token)

```
GET  /                → Informações da API
POST /auth/register   → Registrar novo usuário
POST /auth/login      → Fazer login
GET  /usuarios        → Listar todos usuários
```

### 🔒 ROTAS PROTEGIDAS (Requer token JWT)

```
POST   /tarefas       → Criar tarefa
GET    /tarefas       → Listar tarefas do usuário
GET    /tarefas/:id   → Buscar tarefa específica
PUT    /tarefas/:id   → Atualizar tarefa
DELETE /tarefas/:id   → Excluir tarefa
```

---

## 🎯 FLUXO COMPLETO: CRIAR TAREFA

```
1. Cliente faz login
   │
   ▼
2. Recebe token JWT
   │
   ▼
3. Envia requisição:
   POST /tarefas
   Headers: {
     Authorization: Bearer TOKEN,
     Content-Type: application/json
   }
   Body: {
     titulo: "Minha tarefa",
     descricao: "Descrição",
     status: "pendente"
   }
   │
   ▼
4. Middleware verifica token
   │
   ▼
5. Token válido → extrai userId
   │
   ▼
6. Controller cria tarefa:
   {
     titulo: "Minha tarefa",
     descricao: "Descrição",
     status: "pendente",
     userId: "id_do_usuario_logado"
   }
   │
   ▼
7. Salva no MongoDB
   │
   ▼
8. Retorna tarefa criada
```

---

## 🔧 TECNOLOGIAS E RESPONSABILIDADES

```
┌─────────────────────────────────────────┐
│ Express                                  │
│ ✓ Roteamento                            │
│ ✓ Middlewares                           │
│ ✓ Request/Response                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Mongoose                                 │
│ ✓ Conexão com MongoDB                   │
│ ✓ Schemas/Models                        │
│ ✓ Validações                            │
│ ✓ Queries                               │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ JSON Web Token (JWT)                     │
│ ✓ Gerar tokens                          │
│ ✓ Verificar tokens                      │
│ ✓ Expiração automática                  │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ BCryptjs                                 │
│ ✓ Hash de senhas                        │
│ ✓ Comparar senhas                       │
│ ✓ Salt rounds                           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ CORS                                     │
│ ✓ Permitir requisições cross-origin     │
│ ✓ Habilitar frontend separado           │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Dotenv                                   │
│ ✓ Variáveis de ambiente                 │
│ ✓ Configurações sensíveis               │
└─────────────────────────────────────────┘
```

---

## 📈 ESCALABILIDADE E SEGURANÇA

### ✅ Implementado:
- ✓ Senhas nunca armazenadas em texto plano
- ✓ Tokens com expiração (7 dias)
- ✓ Validação de dados no Mongoose
- ✓ Isolamento de tarefas por usuário
- ✓ Headers de segurança (CORS)
- ✓ Variáveis de ambiente (.env)
- ✓ Git ignore para arquivos sensíveis

### 🚀 Possíveis melhorias futuras:
- Rate limiting (limitar requisições)
- Refresh tokens
- Confirmação de email
- Recuperação de senha
- Paginação de resultados
- Cache com Redis
- Logs estruturados
- Testes automatizados

---

## 🎯 RESUMO

Esta API é uma solução completa e profissional para gerenciamento de tarefas, implementando todas as melhores práticas de segurança e desenvolvimento back-end com Node.js.

**Pronta para produção! 🚀**
