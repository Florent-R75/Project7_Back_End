const { User } = require('../src/connection');

module.exports = (app) => {
  app.delete('/api/users/:id', (req, res) => {
      
      User.findByPk(req.params.id).then((user) => {
        if (user === null){
          const message = "l'utilisateur demandé n'existe pas. Réessayer avec un autre identifiant";
          return res.status(403).json(message);  
        }else{
            const userDeleted = user;
            return User.destroy({
                where:{id:user.id}
            })
            .then(() => {
            const message = `L'utilisateur ${userDeleted.id} a bien été supprimé`;
            res.status(200).json({ message, data: userDeleted });
        });
        }
    
    })
      .catch((error) => {
        const message =
          "L' utilisateur n'a pas pu être modifié. Réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
};
