const eleveService = require('../services/eleve.service');

exports.getEleveDetails = async (req, res) => {
  try {
    const eleve = await eleveService.getEleveDetails(req.params.id);

    if (!eleve) {
      return res.status(404).json({ error: 'Eleve introuvable.' });
    }

    return res.status(200).json(eleve);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
