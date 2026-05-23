const crypto = require('crypto');
const userRepository = require('../repositories/user.repository');

const ALLOWED_ROLES = ['ADMIN', 'SECRETAIRE', 'ENSEIGNANT'];
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Hash password using SHA256 (simple approach, use bcryptjs in production)
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// Compare password with hash
const comparePassword = (password, hash) => {
  return hashPassword(password) === hash;
};

// Create JWT token (simple base64 + signature approach)
const generateToken = (userId, email, role) => {
  const payload = {
    userId,
    email,
    role,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  };
  
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64');
  
  return `${header}.${body}.${signature}`;
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token format.');
    
    const [header, body, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64');
    
    if (signature !== expectedSignature) {
      throw new Error('Invalid token signature.');
    }
    
    const payload = JSON.parse(Buffer.from(body, 'base64').toString());
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      throw new Error('Token expired.');
    }
    
    return payload;
  } catch (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }
};

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email et mot de passe sont requis.');
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('Identifiants invalides.');
  }

  // Compare plaintext password with stored hash
  if (!comparePassword(password, user.password)) {
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

  // Hash password before saving
  const hashedPassword = hashPassword(data.password);
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