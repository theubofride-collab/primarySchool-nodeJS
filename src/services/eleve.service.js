const eleveRepository = require('../repositories/eleve.repository');

exports.getEleveDetails = async (id) => {
  return eleveRepository.findByIdWithRelations(Number(id));
};
