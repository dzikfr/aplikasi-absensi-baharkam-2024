const express = require('express');
const router = express.Router();
const {
    createEmployee, 
    getAllEmployee, 
    getEmployee, 
    updateEmployee, 
    deleteEmployee
} = require('../controllers/employeeController.js');


router.post('/employee', createEmployee);
router.get('/employee', getAllEmployee);
router.get('/employee/:id', getEmployee);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);


module.exports = router;