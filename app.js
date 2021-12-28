const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const joy = require('joy');
const mysql2 = require('mysql2');
const sequelize = require('./src/connection');
// const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const path = require('path');
// const UserModel = require('./models/User');
// const TweetModel = require('./models/Tweet');
// const userRoutes = require('./routes/userRoutes');
// const tweetRoutes = require('./routes/tweetRoutes');
// const User=require(('./src/connection'));
// const initDB=require('./src/connection');

app.use(bodyParser.json());
// MIDDLEWARE*************

// Middleware de log

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

sequelize.initDB();

// Routes

require('./routes/findAllUsers')(app);
require('./routes/findUserByPk')(app);
require('./routes/createUser')(app);
require('./routes/updateUser')(app);
require('./routes/deleteUser')(app);

// GESTION DES ERREURS

// Erreurs 404

app.use(({res})=>{
  const message = 'Impossible de trouver la ressource demandé! Vous pouvez essayer une autre URL'
  res.status(404).json(message)
})





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

// app.post('/api/auth/signup', (req, res, next) => {
//   res.send('Hello from the server side');
// });

// app.use('/api/tweets', tweetRoutes);

// app.use('/api/auth', userRoutes);

module.exports = app;
