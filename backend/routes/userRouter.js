const express = require('express');
const router = express.Router();
const {
    createUser, 
    getAllUser, 
    getUser, 
    updateUser, 
    deleteUser
} = require('../controllers/userController.js');


router.post('/user/', createUser );
router.get('/user/', getAllUser);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id',deleteUser);


module.exports = router;