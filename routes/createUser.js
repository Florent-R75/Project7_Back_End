const { User } = require('../src/connection');
const { ValidationError } = require('sequelize');

module.exports = (app) => {
  app.post('/api/auth/signup', (req, res) => {
    User.create({
      name: req.body.name,
      password: req.body.password,
    })
      .then((user) => {
        const message = `Un nouvel utilisateur ${user.name} a bien été crée`;
        res.status(200).json({ message, data: user });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if(error instanceof UniqueConstraintError){
            return res.status(400).json({message: error.message, data:error})
        }
        const message =
          "L'utilisateur n'a pas pu être crée. Réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
};
