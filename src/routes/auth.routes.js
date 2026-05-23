const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateUser } = require('../middlewares/auth.middleware');

// Public routes (no authentication required)
router.post('/login', authController.login);
router.post('/register', authController.register);

// Protected routes (authentication required)
router.get('/profile', authenticateUser, authController.profile);

module.exports = router;
