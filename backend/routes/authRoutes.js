// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { getUserProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdminMiddleware = require('../middleware/isAdminMiddleware');

router.post('/login', authController.login);
router.post('/register', authController.register); // Nueva ruta para el registro
router.get('/profile', authMiddleware, getUserProfile); // Nueva ruta protegida
router.get('/admin', authMiddleware, isAdminMiddleware, (req, res) => {
    res.json({ message: 'Bienvenido, administrador' });
  });
module.exports = router;