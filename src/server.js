require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, '../public')));

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado ao MongoDB'))
  .catch((err) => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Rotas
const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios');
const tarefasRoutes = require('./routes/tarefas');

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/tarefas', tarefasRoutes);

// Rota da API (informações JSON)
app.get('/api', (req, res) => {
  res.json({
    message: 'API de Gerenciamento de Tarefas',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login'
      },
      usuarios: {
        list: 'GET /usuarios'
      },
      tarefas: {
        create: 'POST /tarefas (JWT)',
        list: 'GET /tarefas (JWT)',
        get: 'GET /tarefas/:id (JWT)',
        update: 'PUT /tarefas/:id (JWT)',
        delete: 'DELETE /tarefas/:id (JWT)'
      }
    }
  });
});

// Rota raiz serve o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
