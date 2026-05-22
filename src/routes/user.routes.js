const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateUser, authorizeRoles } = require('../middlewares/auth.middleware');
const { validateCreateUser, validateUpdateUser, validateUserIdParam } = require('../validators/user.validator');

router.post('/', authenticateUser, authorizeRoles('ADMIN', 'SECRETAIRE'), validateCreateUser, userController.createUser);
router.get('/', authenticateUser, authorizeRoles('ADMIN', 'SECRETAIRE'), userController.getAllUsers);
router.get('/:id', authenticateUser, authorizeRoles('ADMIN', 'SECRETAIRE', 'ENSEIGNANT'), validateUserIdParam, userController.getUserById);
router.put('/:id', authenticateUser, authorizeRoles('ADMIN'), validateUserIdParam, validateUpdateUser, userController.updateUser);
router.delete('/:id', authenticateUser, authorizeRoles('ADMIN'), validateUserIdParam, userController.deleteUser);

module.exports = router;