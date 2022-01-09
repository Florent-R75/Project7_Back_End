const { Tweet } = require('../sequelize');
const fs = require('fs');

// CREATE A TWEET

exports.create = (req, res) => {
  // Si l'utilisateur n'envoie pas d'image

  if (!req.file) {
    Tweet.create({ content: req.body.content, UserId:req.body.userId, })
      .then((tweet) => {
        const message = 'Le Tweet a bien été crée';
        res.json({ message, data: tweet });
      })
      .catch((error) => {
        const message =
          'Une erreur est survenue! Veuillez réessayer dans quelques instants';
        res.status(500).json({ message, error: error });
      });
  } else {
    // Si l'utilisateur envoie une image

    Tweet.create({
      content: req.body.content,
      UserId:req.body.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    })
      .then((tweet) => {
        const message = 'Le Tweet a bien été crée';
        res.json({ message, data: tweet });
      }).catch((error) => {
        const message =
          'Une erreur est survenue! Veuillez réessayer dans quelques instants';
        res.status(500).json({ message, data: error });
      });
  }
};
// EFFACER TOUT LES TWEETS

exports.deleteTweetByPk = (req, res) => {
  Tweet.findByPk(req.params.id)
    .then((tweet) => {
      if (tweet === null) {
        const message =
          "Le Tweet demandé n'existe pas. Réessayer avec un autre identifiant";
        return res.status(403).json(message);
      } else {
        const filename = tweet.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => err);
        const tweetDeleted = tweet;
        return tweet
          .destroy({
            where: { id: tweet.id },
          })
          .then(() => {
            const message = `Le Tweet ${tweetDeleted.id} a bien été supprimé`;
            res.status(200).json({ message, data: tweetDeleted });
          });
      }
    })
    .catch((error) => {
      const message =
        "Le tweet n'a pas pu être supprimé. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};
// TODO CREER DEUX AFFICHAGE, PAR DATE ET PAR UTILISATEUR DE MANIERE DECROISSANTE
// AFFICHER TOUT LES TWEETS

exports.findAllTweets = (req, res) => {
  Tweet.findAll()
    .then((tweets) => {
      const message = 'La liste des Tweets a été récupérée';
      res.json({ message, data: tweets });
    })
    .catch((error) => {
      const message =
        'Un probleme est survenu, veuillez reessayer dans quelques instants';
      res.status(500).json({ message, data: error });
    });
};

// AFFICHER UN SEUL TWEET

exports.findTweetByPk = (req, res) => {
  Tweet.findByPk(req.params.id)
    .then((tweet) => {
      if (tweet === null) {
        const message =
          "Le Tweet n'existe pas, Veuillez rentrer un identifiant Tweet valide";
        res.status(403).json({ message });
      }
      const message2 = `le Tweet ${tweet.id} a été trouvé`;
      res.json({ message2, data: tweet });
    })
    .catch((error) => {
      const message =
        "Le Tweet n'a pas été trouvée. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

// UPDATE A TWEET

exports.updateTweetByPk = (req, res) => {
  // Si l'utilisateur ne modifie pas l'image

  if (!req.file) {
    const id = req.params.id;
    Tweet.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return Tweet.findByPk(id).then((tweet) => {
          if (tweet === null) {
            const message =
              "Le tweet demandé n'existe pas. Réessayer avec un autre identifiant";
            return res.status(403).json(message);
          } else {
            const message = `Le Tweet ${tweet.id} a bien été modifié`;
            res.json({ message, data: tweet });
          }
        });
      })
      .catch((error) => {
        const message =
          "Le Tweet n'a pas pu être modifié. Réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  } else {
    // Recherche du chemin  et suppression de l'image de la sauce
    const id = req.params.id;

    Tweet.findByPk(id)
      .then((tweet) => {
        const filename = tweet.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => err);

        // Modification du nouvel objet, et creation d'une nouvelle imageURL

        Tweet.update(
          {
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${
              req.file.filename
            }`,
          },
          {
            where: { id: id },
          }
        );
      })
      .then(() => {
        return Tweet.findByPk(id).then((tweet) => {
          if (tweet === null) {
            const message =
              "Le tweet demandé n'existe pas. Réessayer avec un autre identifiant";
            return res.status(403).json(message);
          } else {
            const message = `Le Tweet ${tweet.id} a bien été modifié`;
            return res.json({ message, data: tweet });
          }
        });
      })
      .catch((error) => {
        const message =
          "Le Tweet n'a pas pu être modifié. Réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  }
};
