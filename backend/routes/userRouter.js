const express = require('express');
const router = express.Router();
const {createUser, getAllUser, getUser, updateUser, deleteuser} = require('../controllers/userController.js');

router.post('/user/', createUser );
router.get('/user/', getAllUser);
router.get('/user/:id', getUser);
router.put('/user:id', updateUser);
router.delete('/user:id',deleteuser);

module.exports = router;