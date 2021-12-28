const { User } = require('../../connection');

module.exports = (app) => {
  app.get('/api/users', (req, res) => {
    User.findAll().then((users) => {
      const message = 'La liste des users a bien été récupérée';
      res.json({ message, data: users });
    }).catch((error) => {
        const message ="La liste des utilisateurs n'a pas été récupéré. Réessayer dans quelques instants";
        res.status(500).json({message, data:error})
    });
  });
};
