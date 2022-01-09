const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer')


// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/users/:id', auth, multer, userCtrl.updateUser);
router.delete('/users/:id', auth, multer, userCtrl.delete);
router.get('/users/', auth, userCtrl.findAllUsers);
router.get('/users/:id', auth, userCtrl.findUserByPk);

module.exports = router;
