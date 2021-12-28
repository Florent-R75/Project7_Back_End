const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./models/User');

// Connection a la DB

const sequelize = new Sequelize('groupomania', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,

  logging: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});

//   Initialisation de la DB

const User = UserModel(sequelize, DataTypes);

const initDB = () => {
  return sequelize
    .sync({ force: true })
    .then(() => {
      User.create({
        name: 'Jean',
        password: '12345678',
      })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((err) => console.log(err));
      console.log('La base de donnée a bien été initialisée ');
      User.create({
        name: 'Paul',
        password: '12345678',
      })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((err) => console.log(err));
      console.log('La base de donnée a bien été initialisée ');
      User.create({
        name: 'Luc',
        password: '12345678',
      })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((err) => console.log(err));
      console.log('La base de donnée a bien été initialisée ');
      User.create({
        name: 'Pierre',
        password: '12345678',
      })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((err) => console.log(err));
      console.log('La base de donnée a bien été initialisée ');
    })
    
    .catch((err) => console.log(err));
    
};

module.exports = {
  initDB,
  User,
};
