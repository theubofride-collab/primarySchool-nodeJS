const prisma = require('../prisma/client');

const createCrudRepository = (modelName) => {
  const model = prisma[modelName];

  if (!model) {
    throw new Error(`Modele Prisma introuvable: ${modelName}`);
  }

  return {
    findAll: async () => {
      return model.findMany({
        orderBy: {
          id: 'asc',
        },
      });
    },

    findById: async (id) => {
      return model.findUnique({
        where: { id },
      });
    },

    create: async (data) => {
      return model.create({
        data,
      });
    },

    update: async (id, data) => {
      return model.update({
        where: { id },
        data,
      });
    },

    delete: async (id) => {
      return model.delete({
        where: { id },
      });
    },
  };
};

module.exports = createCrudRepository;
