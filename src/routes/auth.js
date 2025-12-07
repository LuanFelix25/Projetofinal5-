const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registrar novo usuário
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        error: 'Email já cadastrado.' 
      });
    }

    // Criar novo usuário
    const user = new User({ nome, email, senha });
    await user.save();

    // Gerar token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao registrar usuário.',
      details: error.message 
    });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        error: 'Email ou senha incorretos.' 
      });
    }

    // Verificar senha
    const isMatch = await user.comparePassword(senha);
    if (!isMatch) {
      return res.status(401).json({ 
        error: 'Email ou senha incorretos.' 
      });
    }

    // Gerar token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso!',
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao fazer login.',
      details: error.message 
    });
  }
});

module.exports = router;
