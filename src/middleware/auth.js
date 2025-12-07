const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // Pegar o token do header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        error: 'Acesso negado. Token não fornecido.' 
      });
    }

    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    res.status(401).json({ 
      error: 'Token inválido ou expirado.' 
    });
  }
};

module.exports = authMiddleware;
