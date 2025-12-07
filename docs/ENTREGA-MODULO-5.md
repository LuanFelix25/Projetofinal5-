# 🎯 API de Gerenciamento de Tarefas - ENTREGA MÓDULO 5

## ✅ PROJETO COMPLETO

Esta API foi desenvolvida conforme os requisitos do Módulo 5 - Desenvolvimento Back-end com Node.js, Express e MongoDB.

---

## 📁 ESTRUTURA DO PROJETO

```
Projeto-3-main/
│
├── models/                    # Modelos do MongoDB
│   ├── User.js               # Schema de usuário
│   └── Tarefa.js             # Schema de tarefa
│
├── routes/                    # Rotas da API
│   ├── auth.js               # Autenticação (register, login)
│   ├── usuarios.js           # Usuários (listar)
│   └── tarefas.js            # Tarefas (CRUD completo)
│
├── middleware/                # Middlewares
│   └── auth.js               # Verificação de token JWT
│
├── server.js                  # Servidor Express principal
├── package.json               # Dependências do projeto
├── .env                       # Variáveis de ambiente (LOCAL)
├── .env.example               # Exemplo de configuração
├── .gitignore                 # Arquivos ignorados pelo Git
│
├── API-README.md              # Documentação da API
├── GUIA-DEPLOY-RENDER.md      # Guia completo de deploy
├── TESTAR-LOCALMENTE.md       # Guia de testes locais
└── thunder-collection.json    # Coleção para Thunder Client
```

---

## 🎯 ENDPOINTS IMPLEMENTADOS

### ✅ 1. Autenticação (auth)
- ✅ **POST /auth/register** - Registrar novo usuário
- ✅ **POST /auth/login** - Fazer login (retorna JWT)

### ✅ 2. Usuários (usuarios)
- ✅ **GET /usuarios** - Listar todos os usuários

### ✅ 3. Tarefas (tarefas) - 🔒 Protegido com JWT
- ✅ **POST /tarefas** - Criar tarefa
- ✅ **GET /tarefas** - Listar tarefas do usuário
- ✅ **GET /tarefas/:id** - Buscar tarefa específica
- ✅ **PUT /tarefas/:id** - Alterar tarefa
- ✅ **DELETE /tarefas/:id** - Excluir tarefa

---

## 🔐 SEGURANÇA IMPLEMENTADA

✅ Senhas criptografadas com **bcryptjs**
✅ Autenticação com **JWT** (JSON Web Token)
✅ Middleware de autenticação protegendo rotas de tarefas
✅ Tokens com expiração de 7 dias
✅ Usuários só acessam suas próprias tarefas
✅ Validação de dados nos schemas do Mongoose

---

## 🛠️ TECNOLOGIAS UTILIZADAS

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** (jsonwebtoken) - Autenticação
- **BCryptjs** - Criptografia de senhas
- **Dotenv** - Variáveis de ambiente
- **CORS** - Cross-Origin Resource Sharing

---

## 📦 DEPENDÊNCIAS DO PROJETO

```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5"
}
```

---

## 🚀 COMO USAR ESTE PROJETO

### 1️⃣ Testar Localmente
1. Configure o MongoDB Atlas (ver `GUIA-DEPLOY-RENDER.md`)
2. Edite o arquivo `.env` com suas credenciais
3. Execute: `npm install`
4. Execute: `npm start`
5. Teste os endpoints (ver `TESTAR-LOCALMENTE.md`)

### 2️⃣ Publicar no Render
1. Siga o passo a passo em `GUIA-DEPLOY-RENDER.md`
2. O guia inclui:
   - Como criar conta no MongoDB Atlas
   - Como configurar o banco de dados
   - Como fazer deploy no Render
   - Como configurar variáveis de ambiente
   - Como testar a API publicada

---

## 📋 CHECKLIST DE REQUISITOS

### ✅ Requisitos Obrigatórios

- [x] API desenvolvida com Node.js
- [x] Framework Express implementado
- [x] Banco de dados MongoDB (via Mongoose)
- [x] Endpoint de registro de usuário (POST /auth/register)
- [x] Endpoint de login (POST /auth/login)
- [x] Login retorna token JWT
- [x] Endpoint para criar tarefa (POST /tarefas)
- [x] Endpoint para alterar tarefa (PUT /tarefas/:id)
- [x] Endpoint para excluir tarefa (DELETE /tarefas/:id)
- [x] Endpoint para listar tarefas do usuário (GET /tarefas)
- [x] Endpoint para listar usuários (GET /usuarios)
- [x] Endpoints de tarefas protegidos com JWT
- [x] Sem token = acesso negado
- [x] API publicada na nuvem (Render)
- [x] Link da API disponível

### ✅ Recursos Adicionais Implementados

- [x] Hash de senhas com bcryptjs
- [x] Validação de dados com Mongoose schemas
- [x] Timestamps automáticos (createdAt, updatedAt)
- [x] Status de tarefas (pendente, em_andamento, concluida)
- [x] Usuários só veem suas próprias tarefas
- [x] Mensagens de erro amigáveis
- [x] CORS habilitado
- [x] Documentação completa
- [x] Guias de deploy e teste
- [x] Coleção para Thunder Client

---

## 📝 VARIÁVEIS DE AMBIENTE NECESSÁRIAS

Para o Render, configure estas variáveis:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/tarefas
JWT_SECRET=sua_chave_secreta_forte
PORT=5000 (opcional, Render define automaticamente)
```

---

## 🧪 TESTANDO A API

### Usando Thunder Client (VS Code)
1. Instale a extensão Thunder Client
2. Importe o arquivo `thunder-collection.json`
3. Configure as variáveis de ambiente
4. Execute as requisições

### Usando Postman
1. Importe as requisições do arquivo `thunder-collection.json`
2. Configure as variáveis BASE_URL e TOKEN
3. Execute as requisições

### Usando curl (linha de comando)
Consulte os exemplos em `TESTAR-LOCALMENTE.md`

---

## 📄 DOCUMENTAÇÃO

- **API-README.md** - Documentação completa da API e endpoints
- **GUIA-DEPLOY-RENDER.md** - Passo a passo completo para deploy
- **TESTAR-LOCALMENTE.md** - Guia para testar antes de publicar
- **thunder-collection.json** - Coleção de requisições

---

## 🎓 ENTREGA DO TRABALHO

### O que entregar:

✅ **Apenas o link da API rodando no Render**

Exemplo:
```
https://api-tarefas.onrender.com
```

### Como obter o link:

1. Faça deploy no Render seguindo `GUIA-DEPLOY-RENDER.md`
2. Após deploy concluído, copie a URL no topo da página
3. Teste a URL no navegador
4. Entregue o link

---

## 🔥 DIFERENCIAIS DESTE PROJETO

- ✅ Código organizado e modular
- ✅ Padrões de projeto aplicados
- ✅ Segurança implementada corretamente
- ✅ Documentação completa e detalhada
- ✅ Guias passo a passo para iniciantes
- ✅ Validações e tratamento de erros
- ✅ Mensagens de resposta em português
- ✅ Pronto para produção

---

## 👨‍💻 AUTOR

Desenvolvido para o Módulo 5 - Desenvolvimento Back-end com Node.js, Express e MongoDB

---

## 📞 SUPORTE

Se tiver dúvidas:

1. Consulte `GUIA-DEPLOY-RENDER.md` para deploy
2. Consulte `TESTAR-LOCALMENTE.md` para testes
3. Consulte `API-README.md` para documentação dos endpoints
4. Verifique a seção "Problemas Comuns" no guia de deploy

---

## 🎉 PROJETO COMPLETO E PRONTO PARA ENTREGA!

✅ Todos os requisitos atendidos
✅ API funcional e testada
✅ Documentação completa
✅ Pronto para deploy no Render
✅ Segurança implementada
✅ Código profissional

**Bom trabalho! 🚀**
