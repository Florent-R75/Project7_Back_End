const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');

const sequelize = require('./src/sequelize');

const bodyParser = require('body-parser');
const path = require('path');
const reTweetRoutes = require('./src/routes/reTweetRoutes');
const tweetRoutes = require('./src/routes/tweetRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use(bodyParser.json());

// MIDDLEWARE*************

// Middleware de log

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

sequelize.initDB();

// ------DEFINITION DES HEADERS----------

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Middleware de securite

app.use(helmet());

// ROUTES - CONNECTION AU ROUTEUR

app.use('/api/tweets', tweetRoutes);
app.use('/api/retweets', reTweetRoutes);
app.use('/api/auth', userRoutes);

// GESTION DES ERREURS SI LE CLIENT SE TROMPE URL

app.use(({ res }) => {
  const message =
    'Impossible de trouver la ressource demandé! Vous pouvez essayer une autre URL';
  res.status(404).json(message);
});

module.exports = app;
