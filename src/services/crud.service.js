const createCrudRepository = require('../repositories/crud.repository');

const createCrudService = (modelName) => {
  const repository = createCrudRepository(modelName);

  return {
    create: async (data) => {
      return repository.create(data);
    },

    getAll: async () => {
      return repository.findAll();
    },

    getById: async (id) => {
      return repository.findById(Number(id));
    },

    update: async (id, data) => {
      const entityId = Number(id);
      const existing = await repository.findById(entityId);

      if (!existing) {
        return null;
      }

      return repository.update(entityId, data);
    },

    delete: async (id) => {
      const entityId = Number(id);
      const existing = await repository.findById(entityId);

      if (!existing) {
        return null;
      }

      return repository.delete(entityId);
    },
  };
};

module.exports = createCrudService;
