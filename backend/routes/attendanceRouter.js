const express = require('express');
const router = express.Router();
const {
    createAttendance, 
    getAttendance, 
    updateAttendance, 
    deleteAttendance
} = require('../controllers/attendanceController.js');


router.post('/attendance', createAttendance);
router.get('/attendance', getAttendance);
router.put('/attendance/:id', updateAttendance);
router.delete('/attendance/:id', deleteAttendance);


module.exports = router;