const { verifyToken } = require('../services/auth.service');
const { allowedRoles } = require('../validators/user.validator');

exports.authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token d\'authentification manquant ou invalide.' });
    }

    const token = authHeader.slice(7).trim();
    const payload = verifyToken(token);

    if (!payload.role || !allowedRoles.includes(payload.role)) {
      return res.status(403).json({ error: 'Role invalide ou non autorise.' });
    }

    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: `Authentification echouee: ${error.message}` });
  }
};

exports.authorizeRoles = (...allowed) => {
  return (req, res, next) => {
    if (!req.user || !allowed.includes(req.user.role)) {
      return res.status(403).json({ error: 'Accès refusé : rôle insuffisant.' });
    }
    next();
  };
};

exports.authorizeSelfOrRoles = (...allowed) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentification requise.' });
    }

    const requestedId = Number(req.params.id);
    if (req.user.role === 'ADMIN' || allowed.includes(req.user.role)) {
      return next();
    }

    if (!Number.isNaN(requestedId) && req.user.id === requestedId) {
      return next();
    }

    return res.status(403).json({ error: 'Accès refusé : vous n’avez pas les droits pour cette opération.' });
  };
};
