exports.validateIdParam = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'L identifiant doit etre un nombre entier positif.' });
  }

  req.params.id = id;
  next();
};
