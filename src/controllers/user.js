const { User } = require('../sequelize');
const { ValidationError } = require('sequelize');
const { UniqueConstraintError } = require('sequelize');
const bcrypt = require('bcrypt');
const privateKey = require('../middlewares/privateKey');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// SIGN UP AND CREATE USER

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      return User.create({
        name: req.body.name,
        password: hash,
      });
    })
    .catch((error) => {
      const message = 'Veuillez reessayer dans quelques instants';
      res.status(500).json(message);
    })
    .then((user) => {
      const message = `Un nouvel utilisateur ${user.name} a bien été crée`;
      return res.status(200).json({ message, data: user });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "L'utilisateur n'a pas pu être crée. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

// LOGIN USER

exports.login = (req, res) => {
  console.log('gogo');
  User.findOne({ where: { name: req.body.name } })
    .then((user) => {
      if (!user) {
        const message = "l'utilisateur n'existe pas, Veuillez réessayer!";
        return res.status(404).json({ message });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((isPasswordValid) => {
          if (!isPasswordValid) {
            const message = 'Le mot de passe est incorrect! Veuillez réessayer';
            return res.status(401).json({ message });
          }
          // Token JWT
          const token = jwt.sign({ userId: user.id }, privateKey, {
            expiresIn: '90d',
          });

          const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user, token });
        });
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu etre connecte! Veuillez reessayer dans quelques instants";
      return res.status(500).json({ message, data: error });
    });
};

// UPDATE USER

exports.updateUser = (req, res) => {
  console.log('gogo');
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then(() => {
      return User.findByPk(id).then((user) => {
        if (user === null) {
          const message =
            "L'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant";
          return res.status(403).json(message);
        } else {
          const message = `L'utilisateur ${user.name} a bien été modifié`;
          res.status(200).json({ message, data: user });
        }
      });
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ message: error.message, data: error });
      }
      const message =
        "L' utilisateur n'a pas pu être modifié. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

//   DELETE USER

exports.delete = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        const message =
          "l'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant";
        return res.status(403).json(message);
      } else {
        const userDeleted = user;
        return User.destroy({
          where: { id: user.id },
        }).then(() => {
          const message = `L'utilisateur ${userDeleted.id} a bien été supprimé`;
          res.status(200).json({ message, data: userDeleted });
        });
      }
    })
    .catch((error) => {
      const message =
        "L'utilisateur n'a pas pu être supprimé. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

//   GET ALL USERS

exports.findAllUsers = (req, res) => {
  if (req.query.name) {
    const name = req.query.name;
    return User.findAndCountAll({
      where: {
        name: {
          // 'name est la propriete du modele User
          [Op.like]: `%${name}%`, // 'name est le critere de recherche
        },
      },
      order: ['name'],
      limit: 2,
    }).then(({ count, rows }) => {
      const message = `Il y a ${count} utilisateurs qui correspondent au terme de la recherche ${name}.`;
      res.json({ message, data: rows });
    });
  }
  User.findAll({ order: ['name'] })
    .then((users) => {
      const message = 'La liste des users a bien été récupérée';
      res.json({ message, data: users });
    })
    .catch((error) => {
      const message =
        "La liste des utilisateurs n'a pas été récupéré. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

//   GET ONE USER

exports.findUserByPk = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        const message =
          "l'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant";
        return res.status(404).json({ message });
      } else {
        const message = `L\'utilisateur ${user.name} a bien été trouvée`;
        res.json({ message, data: user });
      }
    })
    .catch((error) => {
      const message =
        "L' utilisateur n'a pas été trouvée. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};
