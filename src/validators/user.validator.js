const allowedRoles = ['ADMIN', 'SECRETAIRE', 'ENSEIGNANT'];

const isString = (value) => typeof value === 'string' && value.trim().length > 0;
const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isBoolean = (value) => typeof value === 'boolean';
const isUrl = (value) => typeof value === 'string' && /^(https?:\/\/)?[\w.-]+(\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(value);

const buildErrors = (req) => {
  const errors = [];
  const { nom, prenom, email, password, role, telephone, photoUrl, actif } = req.body;

  if (!isString(nom)) errors.push('Le champ "nom" est requis et doit être une chaîne non vide.');
  if (!isString(prenom)) errors.push('Le champ "prenom" est requis et doit être une chaîne non vide.');
  if (!isEmail(email)) errors.push('Le champ "email" est requis et doit être une adresse email valide.');
  if (!isString(password) || password.length < 8) errors.push('Le champ "password" est requis et doit contenir au moins 8 caractères.');
  if (!isString(role) || !allowedRoles.includes(role.toUpperCase())) {
    errors.push(`Le champ "role" est requis et doit être l’un des rôles suivants : ${allowedRoles.join(', ')}.`);
  }

  if (telephone !== undefined && !isString(telephone)) {
    errors.push('Le champ "telephone" doit être une chaîne lorsque fourni.');
  }
  if (photoUrl !== undefined && !isUrl(photoUrl)) {
    errors.push('Le champ "photoUrl" doit être une URL valide lorsque fourni.');
  }
  if (actif !== undefined && !isBoolean(actif)) {
    errors.push('Le champ "actif" doit être un booléen lorsque fourni.');
  }

  return errors;
};

exports.validateCreateUser = (req, res, next) => {
  const errors = buildErrors(req);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  req.body.role = req.body.role.toUpperCase();
  next();
};

exports.validateUpdateUser = (req, res, next) => {
  const { nom, prenom, email, password, role, telephone, photoUrl, actif } = req.body;
  const errors = [];

  if (nom !== undefined && !isString(nom)) errors.push('Le champ "nom" doit être une chaîne non vide lorsqu’il est fourni.');
  if (prenom !== undefined && !isString(prenom)) errors.push('Le champ "prenom" doit être une chaîne non vide lorsqu’il est fourni.');
  if (email !== undefined && !isEmail(email)) errors.push('Le champ "email" doit être une adresse email valide lorsqu’il est fourni.');
  if (password !== undefined && (!isString(password) || password.length < 8)) {
    errors.push('Le champ "password" doit contenir au moins 8 caractères lorsqu’il est fourni.');
  }
  if (role !== undefined && (!isString(role) || !allowedRoles.includes(role.toUpperCase()))) {
    errors.push(`Le champ "role" doit être l’un des rôles suivants lorsqu’il est fourni : ${allowedRoles.join(', ')}.`);
  }
  if (telephone !== undefined && !isString(telephone)) {
    errors.push('Le champ "telephone" doit être une chaîne lorsqu’il est fourni.');
  }
  if (photoUrl !== undefined && !isUrl(photoUrl)) {
    errors.push('Le champ "photoUrl" doit être une URL valide lorsqu’il est fourni.');
  }
  if (actif !== undefined && !isBoolean(actif)) {
    errors.push('Le champ "actif" doit être un booléen lorsqu’il est fourni.');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  if (role !== undefined) {
    req.body.role = role.toUpperCase();
  }

  next();
};

exports.validateUserIdParam = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'L’identifiant utilisateur doit être un nombre entier positif.' });
  }
  req.params.id = id;
  next();
};

exports.allowedRoles = allowedRoles;
