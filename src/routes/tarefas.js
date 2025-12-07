const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');
const authMiddleware = require('../middleware/auth');

// Todas as rotas de tarefas são protegidas
router.use(authMiddleware);

// Criar nova tarefa
router.post('/', async (req, res) => {
  try {
    const { titulo, descricao, status } = req.body;

    const tarefa = new Tarefa({
      titulo,
      descricao,
      status,
      userId: req.userId
    });

    await tarefa.save();

    res.status(201).json({
      message: 'Tarefa criada com sucesso!',
      tarefa
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao criar tarefa.',
      details: error.message 
    });
  }
});

// Listar tarefas do usuário logado
router.get('/', async (req, res) => {
  try {
    const tarefas = await Tarefa.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json({
      total: tarefas.length,
      tarefas
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar tarefas.',
      details: error.message 
    });
  }
});

// Buscar tarefa específica
router.get('/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!tarefa) {
      return res.status(404).json({ 
        error: 'Tarefa não encontrada.' 
      });
    }

    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao buscar tarefa.',
      details: error.message 
    });
  }
});

// Alterar tarefa
router.put('/:id', async (req, res) => {
  try {
    const { titulo, descricao, status } = req.body;

    const tarefa = await Tarefa.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { titulo, descricao, status },
      { new: true, runValidators: true }
    );

    if (!tarefa) {
      return res.status(404).json({ 
        error: 'Tarefa não encontrada.' 
      });
    }

    res.json({
      message: 'Tarefa atualizada com sucesso!',
      tarefa
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao atualizar tarefa.',
      details: error.message 
    });
  }
});

// Excluir tarefa
router.delete('/:id', async (req, res) => {
  try {
    const tarefa = await Tarefa.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!tarefa) {
      return res.status(404).json({ 
        error: 'Tarefa não encontrada.' 
      });
    }

    res.json({
      message: 'Tarefa excluída com sucesso!',
      tarefa
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Erro ao excluir tarefa.',
      details: error.message 
    });
  }
});

module.exports = router;
