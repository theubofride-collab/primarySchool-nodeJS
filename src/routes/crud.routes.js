const express = require('express');
const createCrudController = require('../controllers/crud.controller');
const { authenticateUser, authorizeRoles } = require('../middlewares/auth.middleware');
const { validateIdParam } = require('../validators/id.validator');

const createCrudRoutes = (modelName, label) => {
  const router = express.Router();
  const controller = createCrudController(modelName, label);

  router.post('/', authenticateUser, authorizeRoles('ADMIN', 'SECRETAIRE'), controller.create);
  router.get('/', authenticateUser, authorizeRoles('ADMIN', 'SECRETAIRE'), controller.getAll);
  router.get('/:id', authenticateUser, authorizeRoles('ADMIN', 'SECRETAIRE', 'ENSEIGNANT'), validateIdParam, controller.getById);
  router.put('/:id', authenticateUser, authorizeRoles('ADMIN'), validateIdParam, controller.update);
  router.delete('/:id', authenticateUser, authorizeRoles('ADMIN'), validateIdParam, controller.delete);

  return router;
};

module.exports = createCrudRoutes;
