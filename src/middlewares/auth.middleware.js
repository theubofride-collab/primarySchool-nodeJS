const { allowedRoles } = require('../validators/user.validator');

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const roleHeader = req.header('x-user-role');
  let role = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    role = authHeader.slice(7).trim().toUpperCase();
  } else if (roleHeader) {
    role = roleHeader.trim().toUpperCase();
  }

  if (!role || !allowedRoles.includes(role)) {
    return res.status(401).json({ error: 'Authentification requise ou rôle invalide.' });
  }

  req.user = { role };
  next();
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
