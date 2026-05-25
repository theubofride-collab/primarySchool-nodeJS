const bcrypt = require('bcryptjs');
const userRepository = require('../repositories/user.repository');

exports.createUser = async (data) => {
  const userData = { ...data };
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return userRepository.create(userData);
};

exports.getAllUsers = async () => {
  return userRepository.findAll();
};

exports.getUserById = async (id) => {
  return userRepository.findById(Number(id));
};

exports.updateUser = async (id, data) => {
  const userId = Number(id);
  const existing = await userRepository.findById(userId);
  if (!existing) {
    return null;
  }
  const userData = { ...data };
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return userRepository.update(userId, userData);
};

exports.deleteUser = async (id) => {
  const userId = Number(id);
  const existing = await userRepository.findById(userId);
  if (!existing) {
    return null;
  }
  return userRepository.delete(userId);
};
