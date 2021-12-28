const { User } = require('../../connection');
const {ValidationError} = require('sequelize');

module.exports = (app) => {
  app.put('/api/users/:id', (req, res) => {
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
        if(error instanceof ValidationError){
            return res.status(400).json({message:error.message, data:error})
        }
        if (error instanceof UniqueConstraintError) {
            return res.status(400).json({message:error.message, data:error})
        }
        const message =
          "L' utilisateur n'a pas pu être modifié. Réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
};
