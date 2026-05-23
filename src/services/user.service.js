const userRepository = require('../repositories/user.repository');

exports.createUser = async (data) => {
  return userRepository.create(data);
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
  return userRepository.update(userId, data);
};

exports.deleteUser = async (id) => {
  const userId = Number(id);
  const existing = await userRepository.findById(userId);
  if (!existing) {
    return null;
  }
  return userRepository.delete(userId);
};