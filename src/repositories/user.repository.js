const userRepository = require('../prisma/client');

exports.findAll = async () => {
    return prisma.user.findMany();
}

