const userRepository = require('../repositories/user.repository');

exports.login = async (email, password) => {
	if (!email || !password) {
		throw new Error('Email and password are required.');
	}

	const user = await userRepository.findByEmail(email);
	if (!user) {
		throw new Error('Invalid credentials.');
	}

	if (user.password !== password) {
		throw new Error('Invalid credentials.');
	}

	const { password: _pwd, ...userWithoutPassword } = user;
	const token = `Bearer ${user.role}`;

	return { token, user: userWithoutPassword };
};

exports.register = async (data) => {
	if (!data || !data.email || !data.password) {
		throw new Error('Email and password are required.');
	}

	const existing = await userRepository.findByEmail(data.email);
	if (existing) {
		throw new Error('Email already in use.');
	}

	const created = await userRepository.create(data);
	const { password, ...userWithoutPassword } = created;
	return userWithoutPassword;
};

exports.forgotPassword = async () => {

};

exports.resetPassword = async () => {
    
};