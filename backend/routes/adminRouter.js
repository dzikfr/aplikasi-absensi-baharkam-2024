const express = require('express');
const router = express.Router();
const {
    createAdmin,
    getAllAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
} = require('../controllers/adminController.js');


router.post('/admin/', createAdmin );
router.get('/admin/', getAllAdmin);
router.get('/admin/:id', getAdmin);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id',deleteAdmin);


module.exports = router;