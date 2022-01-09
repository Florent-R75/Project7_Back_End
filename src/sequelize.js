const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./models/User');
const TweetModel = require('./models/Tweet');
const ReTweetModel = require('./models/ReTweet');
const bcrypt = require('bcrypt');

//  Connection a la DB

const sequelize = new Sequelize('groupomania', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});

//   Initialisation de la DB User

const User = UserModel(sequelize, DataTypes);
const Tweet = TweetModel(sequelize, DataTypes);
const ReTweet = ReTweetModel(sequelize, DataTypes);

// **********************
// ASSOCIATION DES TABLES

//  Relation ONE TO ONE : FOREIGN KEY sur la target Tweet

User.hasOne(Tweet, { onDelete: 'CASCADE' });
Tweet.belongsTo(User, { onDelete: 'CASCADE' });

//  Relation One to Many: FOREIGN KEY sur la target reTweet

Tweet.hasMany(ReTweet, { onDelete: 'CASCADE' });
ReTweet.belongsTo(Tweet, { onDelete: 'CASCADE' });

//  Relation One to Many : FOREIGN KEY sur la target reTweet

User.hasMany(ReTweet, { onDelete: 'CASCADE' });
ReTweet.belongsTo(User, { onDelete: 'CASCADE' });

// CONCLUSION ASSOCIATION TABLES, Tweet a 1 FOREIGN KEY UserId, Retweet a 2 FOREIGN KEYS UserId et TweetId

// ********************

// Initialisation de la DB
// TODO changer la synchronisation

const initDB = () => {
  return sequelize
    .sync({ force: true })
    .then(() => {
      console.log('INIT DB');

      bcrypt.hash('pikachu', 10).then((hash) => {
        User.create({
          name: 'Pauline',
          password: hash,
        })
          .then((user) => {
            console.log(user.toJSON());
          })
          .catch((err) => console.log(err));
      });

      User.create({
        name: 'Paul',
        password: '12345678',
      })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((err) => console.log(err));

      User.create({
        name: 'JeanPaul',
        password: '12345678',
      })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((err) => console.log(err));

      User.create({
        name: 'Pauland',
        password: '12345678',
      })
        .then((user) => {
          console.log(user.toJSON());
        })
        .catch((err) => console.log(err));
      console.log('La table Users a bien été initialisée ');

      Tweet.create({
        content: 'Hello World',
        UserId: 1,
      }).then((tweet) => {
        console.log(tweet.toJSON());
      });

      Tweet.create({
        content: 'GoodBye',
        UserId: 2,
      }).then((tweet) => {
        console.log(tweet.toJSON());
      });
      console.log('La table Tweets a bien été initialisée ');

      ReTweet.create({
        content: 'Bonjour',
        
        // TweetId: 2,
        // UserId: 1,
      }).then((reTweet) => {
        console.log(reTweet.toJSON());
      });

      ReTweet.create({
        content: 'Salut',
        // UserId: 2,
        // TweetId: 1,
      }).then((reTweet) => {
        console.log(reTweet.toJSON());
      });
      console.log('La table ReTweet a bien été initialisée ');
    })

    .catch((err) => console.log(err));
};

// Exports des variables

module.exports = {
  initDB,
  User,
  Tweet,
  ReTweet,
};
