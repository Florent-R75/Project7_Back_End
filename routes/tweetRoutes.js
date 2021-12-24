const express = require('express');
const router = express.Router();
const exchangeCtrl = require('../controllers/exchangeControllers');

router.route('/').post();

router.route('/:id').get();

module.exports = router;