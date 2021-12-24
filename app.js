const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const joy = require('joy');
const mysql =require('mysql2');
const Sequelize  = require('sequelize');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes.js');
const tweetRoutes = require('./routes/tweetRoutes');

// MIDDLEWARE*************

// Middleware de log

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}




// Connection a la DB 

const sequelize = new Sequelize('groupomania', 'root', 'jesuis', {
  host: 'localhost',
  dialect:  'mysql',
  operatorAliases:false,

  pool:{
    max:5,
    min:0,
    acquire:3000,
    idle:10000
  },
});

// Test de connexion

sequelize.authenticate().then(() =>{
console.log('Connexion a MySql réussie !');
}).catch(err =>{
  console.log('Connexion à MySql échouée !');
});


const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

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

app.use(bodyParser.json());

// Middleware de securite

app.use(helmet());

app.use('/api/tweets', tweetRoutes);

app.use('/api/auth', userRoutes);
// app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;