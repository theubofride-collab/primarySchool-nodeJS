const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

const ALLOWED_ROLES = ['ADMIN', 'SECRETAIRE', 'ENSEIGNANT'];
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const hashPassword = async (password) => bcrypt.hash(password, 10);

const comparePassword = async (password, hash) => bcrypt.compare(password, hash);

const generateToken = (userId, email, role) => {
  return jwt.sign({ userId, email, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email et mot de passe sont requis.');
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('Identifiants invalides.');
  }

  if (!(await comparePassword(password, user.password))) {
    throw new Error('Identifiants invalides.');
  }

  if (!user.actif) {
    throw new Error('Compte désactivé.');
  }

  const token = generateToken(user.id, user.email, user.role);
  const { password: _pwd, ...userWithoutPassword } = user;

  return { 
    token, 
    user: userWithoutPassword,
    message: 'Authentification réussie.'
  };
};

exports.register = async (data) => {
  if (!data || !data.email || !data.password) {
    throw new Error('Email et mot de passe sont requis.');
  }

  if (!data.nom || !data.prenom) {
    throw new Error('Nom et prénom sont requis.');
  }

  if (!data.role || !ALLOWED_ROLES.includes(data.role.toUpperCase())) {
    throw new Error(`Le rôle doit être l'un de: ${ALLOWED_ROLES.join(', ')}.`);
  }

  if (data.password.length < 8) {
    throw new Error('Le mot de passe doit contenir au moins 8 caractères.');
  }

  const existing = await userRepository.findByEmail(data.email);
  if (existing) {
    throw new Error('Email déjà utilisé.');
  }

  const hashedPassword = await hashPassword(data.password);
  const userData = {
    ...data,
    password: hashedPassword,
    role: data.role.toUpperCase(),
    actif: data.actif !== false // Default to true if not specified
  };

  const created = await userRepository.create(userData);
  const { password, ...userWithoutPassword } = created;
  
  return { 
    user: userWithoutPassword,
    message: 'Inscription réussie.'
  };
};

exports.verifyToken = verifyToken;

exports.forgotPassword = async () => {
  // TODO: Implement password reset email logic
};

exports.resetPassword = async () => {
  // TODO: Implement password reset with token
};
