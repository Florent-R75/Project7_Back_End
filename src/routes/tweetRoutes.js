const express = require('express');
const router = express.Router();
const tweetCtrl = require('../controllers/tweet.js');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

// Routes
router.post('/', auth,multer, tweetCtrl.create);
router.put('/:id', auth, multer, tweetCtrl.updateTweetByPk);
router.delete('/:id', auth, multer, tweetCtrl.deleteTweetByPk);
router.get('/', auth, tweetCtrl.findAllTweets);
router.get('/:id', auth, tweetCtrl.findTweetByPk);

module.exports = router;
