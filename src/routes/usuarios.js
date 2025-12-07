const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-senha');
    
    res.json({
      total: users.length,
      usuarios: users
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar usuários.',
      details: error.message 
    });
  }
});

module.exports = router;
