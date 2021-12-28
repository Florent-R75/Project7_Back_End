const { User } = require('../../connection');

module.exports = (app) => {
  app.get('/api/users/:id', (req, res) => {
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
  });
};
