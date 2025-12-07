# 🚀 GUIA COMPLETO DE PUBLICAÇÃO NO RENDER

## ✅ ANTES DE COMEÇAR

Você precisa de:
1. ✅ Conta no GitHub (para hospedar o código)
2. ✅ Conta no MongoDB Atlas (banco de dados gratuito)
3. ✅ Conta no Render (hospedagem gratuita)

---

## 📝 PASSO 1: CRIAR BANCO DE DADOS NO MONGODB ATLAS

### 1.1 Criar Conta e Cluster
1. Acesse: https://www.mongodb.com/cloud/atlas/register
2. Crie uma conta gratuita
3. Crie um novo projeto (ex: "API Tarefas")
4. Clique em **"Build a Database"**
5. Escolha **FREE (M0)** 
6. Escolha a região mais próxima (ex: São Paulo)
7. Clique em **"Create"**

### 1.2 Criar Usuário do Banco
1. Em **"Database Access"** (menu lateral):
   - Clique em **"Add New Database User"**
   - Username: `apiuser` (ou qualquer nome)
   - Password: Gere uma senha forte (ANOTE ESSA SENHA!)
   - Database User Privileges: **Read and write to any database**
   - Clique em **"Add User"**

### 1.3 Liberar Acesso de Rede
1. Em **"Network Access"** (menu lateral):
   - Clique em **"Add IP Address"**
   - Clique em **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Clique em **"Confirm"**

### 1.4 Obter String de Conexão
1. Volte para **"Database"** (menu lateral)
2. Clique em **"Connect"** no seu cluster
3. Escolha **"Connect your application"**
4. Copie a string de conexão (algo como):
   ```
   mongodb+srv://apiuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANTE**: Substitua `<password>` pela senha que você criou
6. Adicione o nome do banco após `.net/` (ex: `/tarefas`)
   ```
   mongodb+srv://apiuser:SuaSenha123@cluster0.xxxxx.mongodb.net/tarefas?retryWrites=true&w=majority
   ```

---

## 📦 PASSO 2: PREPARAR CÓDIGO PARA O GITHUB

### 2.1 Inicializar Git (se ainda não fez)
```bash
git init
git add .
git commit -m "API completa para gerenciamento de tarefas"
```

### 2.2 Criar Repositório no GitHub
1. Acesse: https://github.com/new
2. Nome do repositório: `api-tarefas` (ou qualquer nome)
3. **NÃO** marque "Add a README"
4. Clique em **"Create repository"**

### 2.3 Enviar Código para o GitHub
```bash
git remote add origin https://github.com/SEU_USUARIO/api-tarefas.git
git branch -M main
git push -u origin main
```

**Se pedir login:**
- Use seu username do GitHub
- Como senha, use um **Personal Access Token** (não a senha da conta)
- Para criar token: https://github.com/settings/tokens
  - Generate new token (classic)
  - Marque "repo"
  - Copie o token e use como senha

---

## ☁️ PASSO 3: DEPLOY NO RENDER

### 3.1 Criar Conta no Render
1. Acesse: https://render.com
2. Clique em **"Get Started"**
3. Faça login com GitHub (recomendado) ou crie uma conta

### 3.2 Criar Web Service
1. No dashboard, clique em **"New +"** → **"Web Service"**
2. Conecte seu repositório GitHub:
   - Se for a primeira vez, clique em **"Connect account"**
   - Autorize o Render no GitHub
   - Selecione o repositório `api-tarefas`

### 3.3 Configurar o Serviço
Preencha os campos:

- **Name**: `api-tarefas` (ou outro nome único)
- **Region**: Escolha a mais próxima
- **Branch**: `main`
- **Root Directory**: (deixe em branco)
- **Environment**: **Node**
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free**

### 3.4 Adicionar Variáveis de Ambiente
Role para baixo até **"Environment Variables"**

Clique em **"Add Environment Variable"** e adicione:

**Variável 1:**
- Key: `MONGODB_URI`
- Value: (cole sua string de conexão do MongoDB Atlas)
  ```
  mongodb+srv://apiuser:SuaSenha123@cluster0.xxxxx.mongodb.net/tarefas?retryWrites=true&w=majority
  ```

**Variável 2:**
- Key: `JWT_SECRET`
- Value: (crie uma string aleatória forte, ex:)
  ```
  minha_chave_secreta_super_forte_12345_xyz
  ```

**Variável 3 (opcional, o Render já define):**
- Key: `PORT`
- Value: `5000`

### 3.5 Criar o Serviço
1. Clique em **"Create Web Service"**
2. Aguarde o deploy (pode levar 2-5 minutos)
3. Quando terminar, você verá: **"Your service is live 🎉"**

---

## 🎯 PASSO 4: OBTER E TESTAR O LINK DA API

### 4.1 Copiar URL da API
No topo da página do Render, você verá a URL:
```
https://api-tarefas.onrender.com
```
**(Esse é o link que você vai entregar!)**

### 4.2 Testar a API

#### Teste 1: Verificar se está rodando
Abra no navegador:
```
https://api-tarefas.onrender.com
```
Deve retornar um JSON com informações da API.

#### Teste 2: Registrar um usuário
Use o Postman, Insomnia ou Thunder Client:

**POST** `https://api-tarefas.onrender.com/auth/register`
```json
{
  "nome": "João Teste",
  "email": "joao@teste.com",
  "senha": "123456"
}
```
Deve retornar: `{ token, user }`

#### Teste 3: Fazer login
**POST** `https://api-tarefas.onrender.com/auth/login`
```json
{
  "email": "joao@teste.com",
  "senha": "123456"
}
```
**COPIE O TOKEN RETORNADO!**

#### Teste 4: Criar uma tarefa
**POST** `https://api-tarefas.onrender.com/tarefas`

Headers:
```
Authorization: Bearer SEU_TOKEN_AQUI
Content-Type: application/json
```

Body:
```json
{
  "titulo": "Minha primeira tarefa",
  "descricao": "Testar a API",
  "status": "pendente"
}
```

#### Teste 5: Listar tarefas
**GET** `https://api-tarefas.onrender.com/tarefas`

Headers:
```
Authorization: Bearer SEU_TOKEN_AQUI
```

#### Teste 6: Listar usuários
**GET** `https://api-tarefas.onrender.com/usuarios`

(Não precisa de token)

---

## 📋 CHECKLIST FINAL

Antes de entregar, verifique:

✅ MongoDB Atlas criado e funcionando
✅ Código no GitHub
✅ Deploy no Render concluído
✅ Variáveis de ambiente configuradas corretamente
✅ API respondendo na URL do Render
✅ Consegue registrar usuário
✅ Consegue fazer login e recebe token
✅ Consegue criar tarefa com token
✅ Consegue listar tarefas com token
✅ Consegue alterar tarefa com token
✅ Consegue excluir tarefa com token
✅ Consegue listar usuários (sem token)
✅ Endpoints de tarefas rejeitam requests sem token

---

## 🎓 O QUE ENTREGAR

**Você deve entregar apenas:**

✅ **O LINK DA API RODANDO NO RENDER**

Exemplo:
```
https://api-tarefas.onrender.com
```

---

## ⚠️ PROBLEMAS COMUNS E SOLUÇÕES

### Problema: "Application failed to respond"
**Solução:** Verifique se:
- O `Start Command` está como `npm start`
- O arquivo `server.js` existe
- A variável `PORT` está configurada ou o código usa `process.env.PORT`

### Problema: "Cannot connect to MongoDB"
**Solução:**
- Verifique se a string de conexão está correta
- Confirme que substituiu `<password>` pela senha real
- Verifique se liberou acesso de rede (0.0.0.0/0) no MongoDB Atlas

### Problema: "Build failed"
**Solução:**
- Verifique se o `package.json` está no repositório
- Confirme que todas as dependências estão no `package.json`

### Problema: Deploy demora muito
**Solução:**
- Planos gratuitos do Render podem demorar 2-5 minutos
- Se demorar mais de 10 minutos, tente fazer novo deploy

### Problema: Render "hiberna" a API
**Solução:**
- Planos gratuitos hibernam após 15 minutos sem uso
- A primeira requisição após hibernação pode demorar 30-60 segundos
- É normal e esperado no plano gratuito

---

## 🎉 CONCLUSÃO

Depois de seguir todos os passos, sua API estará:
- ✅ Rodando na nuvem (Render)
- ✅ Conectada ao MongoDB Atlas
- ✅ Com todas as rotas funcionando
- ✅ Com autenticação JWT implementada
- ✅ Pronta para ser entregue!

**Bom trabalho! 🚀**
