const express = require('express');
const router = express.Router();
const reTweetCtrl = require('../controllers/reTweet');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');

// Routes
router.post('/', auth, multer, reTweetCtrl.create);
router.put('/:id', auth, multer, reTweetCtrl.updateOne);
router.delete('/:id', auth, multer, reTweetCtrl.delete);
router.get('/', auth, reTweetCtrl.findAll);
router.get('/:id', auth, reTweetCtrl.findOne);

module.exports = router;
