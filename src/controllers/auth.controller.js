const authService = require('../services/auth.service');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email et mot de passe sont requis.' 
      });
    }

    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({ 
      error: error.message || 'Erreur lors de l\'authentification.' 
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password, role, telephone, photoUrl, actif } = req.body;

    // Validate required fields
    if (!nom || !prenom || !email || !password || !role) {
      return res.status(400).json({ 
        error: 'Nom, prénom, email, mot de passe et rôle sont requis.' 
      });
    }

    const result = await authService.register({
      nom,
      prenom,
      email,
      password,
      role,
      telephone: telephone || null,
      photoUrl: photoUrl || null,
      actif: actif !== undefined ? actif : true
    });

    return res.status(201).json(result);
  } catch (error) {
    if (error.message.includes('Email déjà utilisé')) {
      return res.status(409).json({ error: error.message });
    }
    return res.status(400).json({ 
      error: error.message || 'Erreur lors de l\'inscription.' 
    });
  }
};

exports.profile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentification requise.' });
    }
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
