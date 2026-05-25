const createCrudService = require('../services/crud.service');

const getStatusCode = (error) => {
  if (error.code === 'P2002') {
    return 409;
  }

  if (error.code === 'P2025') {
    return 404;
  }

  if (error.code && String(error.code).startsWith('P2')) {
    return 400;
  }

  return 500;
};

const createCrudController = (modelName, label) => {
  const service = createCrudService(modelName);

  return {
    create: async (req, res) => {
      try {
        const created = await service.create(req.body || {});
        return res.status(201).json(created);
      } catch (error) {
        return res.status(getStatusCode(error)).json({ error: error.message });
      }
    },

    getAll: async (req, res) => {
      try {
        const items = await service.getAll();
        return res.status(200).json(items);
      } catch (error) {
        return res.status(getStatusCode(error)).json({ error: error.message });
      }
    },

    getById: async (req, res) => {
      try {
        const item = await service.getById(req.params.id);

        if (!item) {
          return res.status(404).json({ error: `${label} introuvable.` });
        }

        return res.status(200).json(item);
      } catch (error) {
        return res.status(getStatusCode(error)).json({ error: error.message });
      }
    },

    update: async (req, res) => {
      try {
        const updated = await service.update(req.params.id, req.body || {});

        if (!updated) {
          return res.status(404).json({ error: `${label} introuvable.` });
        }

        return res.status(200).json(updated);
      } catch (error) {
        return res.status(getStatusCode(error)).json({ error: error.message });
      }
    },

    delete: async (req, res) => {
      try {
        const deleted = await service.delete(req.params.id);

        if (!deleted) {
          return res.status(404).json({ error: `${label} introuvable.` });
        }

        return res.status(200).json({ message: `${label} supprime avec succes.` });
      } catch (error) {
        return res.status(getStatusCode(error)).json({ error: error.message });
      }
    },
  };
};

module.exports = createCrudController;
