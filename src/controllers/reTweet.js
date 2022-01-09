const { ReTweet } = require('../sequelize');
const fs = require('fs');

// CREATE A RETWEET
// TODO Implementer les proprietes du corps des requêtes

exports.create = (req, res) => {
  // Si l'utilisateur n'envoie pas d'image

  if (!req.file) {
    ReTweet.create({
      content: req.body.content,
      UserId: req.body.userId,
      TweetId: req.body.tweetId,
    })
      .then((retweet) => {
        const message = 'Le ReTweet a bien été crée';
        res.json({ message, data: retweet });
      })
      .catch((error) => {
        const message =
          'Une erreur est survenue! Veuillez réessayer dans quelques instants';
        res.status(500).json({ message, error: error });
      });
  } else {
    // Si l'utilisateur envoie une image

    ReTweet.create({
      content: req.body.content,
      UserId: req.body.userId,
      TweetId: req.body.tweetId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    })
      .then((retweet) => {
        const message = 'Le ReTweet a bien été crée';
        res.json({ message, data: retweet });
      })
      .catch((error) => {
        const message =
          'Une erreur est survenue! Veuillez réessayer dans quelques instants';
        res.status(500).json({ message, data: error });
      });
  }
};
// EFFACE UN RETWEET

exports.delete = (req, res) => {
  ReTweet.findByPk(req.params.id)
    .then((retweet) => {
      if (retweet === null) {
        const message =
          "Le Tweet demandé n'existe pas. Réessayer avec un autre identifiant";
        return res.status(403).json(message);
      } else {
        const filename = retweet.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => err);
        const retweetDeleted = retweet;
        return retweet
          .destroy({
            where: { id: retweet.id },
          })
          .then(() => {
            const message = `Le reTweet ${retweetDeleted.id} a bien été supprimé`;
            res.status(200).json({ message, data: retweetDeleted });
          });
      }
    })
    .catch((error) => {
      const message =
        "Le retweet n'a pas pu être supprimé. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

// TODO CREER DEUX AFFICHAGE, PAR DATE ET PAR UTILISATEUR DE MANIERE DECROISSANTE
// AFFICHER TOUT LES RETWEETS

exports.findAll = (req, res) => {
  ReTweet.findAll()
    .then((reTweets) => {
      const message = 'La liste des reTweets a été récupérée';
      res.json({ message, data: reTweets });
    })
    .catch((error) => {
      const message =
        'Un probleme est survenu, veuillez reessayer dans quelques instants';
      res.status(500).json({ message, data: error });
    });
};

// AFFICHE UN SEUL RETWEET

exports.findOne = (req, res) => {
  ReTweet.findByPk(req.params.id)
    .then((reTweet) => {
      if (reTweet === null) {
        const message =
          "Le reTweet n'existe pas, Veuillez rentrer un identifiant reTweet valide";
        res.status(403).json({ message });
      }
      const message2 = `le reTweet ${reTweet.id} a été trouvé`;
      res.json({ message2, data: reTweet });
    })
    .catch((error) => {
      const message =
        "Le reTweet n'a pas été trouvée. Réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
};

exports.updateOne = (req, res) => {
  // Si l'utilisateur ne modifie pas l'image

  if (!req.file) {
    const id = req.params.id;
    ReTweet.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        return ReTweet.findByPk(id).then((retweet) => {
          if (retweet === null) {
            const message =
              "Le retweet demandé n'existe pas. Réessayer avec un autre identifiant";
            return res.status(403).json(message);
          } else {
            const message = `Le ReTweet ${retweet.id} a bien été modifié`;
            res.json({ message, data: retweet });
          }
        });
      })
      .catch((error) => {
        const message =
          "Le ReTweet n'a pas pu être modifié. Réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  } else {
    // Recherche du chemin  et suppression de l'image de la sauce
    const id = req.params.id;

    ReTweet.findByPk(id)
      .then((retweet) => {
        const filename = retweet.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, (err) => err);

        // Modification du nouvel objet, et creation d'une nouvelle imageURL

        ReTweet.update(
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
        return ReTweet.findByPk(id).then((retweet) => {
          if (retweet === null) {
            const message =
              "Le retweet demandé n'existe pas. Réessayer avec un autre identifiant";
            return res.status(403).json(message);
          } else {
            const message = `Le ReTweet ${retweet.id} a bien été modifié`;
            return res.json({ message, data: retweet });
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
