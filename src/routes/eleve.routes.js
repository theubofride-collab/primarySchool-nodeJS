const createCrudRoutes = require('./crud.routes');
const eleveController = require('../controllers/eleve.controller');
const { authenticateUser, authorizeRoles } = require('../middlewares/auth.middleware');
const { validateIdParam } = require('../validators/id.validator');

const router = createCrudRoutes('eleve', 'Eleve');

router.get(
  '/:id/details',
  authenticateUser,
  authorizeRoles('ADMIN', 'SECRETAIRE', 'ENSEIGNANT'),
  validateIdParam,
  eleveController.getEleveDetails
);

module.exports = router;
