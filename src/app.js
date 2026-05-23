const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Auth routes (public)
app.use('/auth', authRoutes);

// User routes (protected)
app.use('/users', userRoutes);

app.use(errorHandler);

module.exports = app;