const prisma = require('../prisma/client');

exports.findAll = async () => {
  return prisma.user.findMany();
};

exports.findById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

exports.findByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

exports.create = async (data) => {
  return prisma.user.create({
    data,
  });
};

exports.update = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

exports.delete = async (id) => {
  return prisma.user.delete({
    where: { id },
  });
};

