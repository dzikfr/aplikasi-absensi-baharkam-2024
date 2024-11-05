const express = require("express");
const router = express.Router();
const { 
    getAttendance, 
    getAttendanceById, 
    createAttendance, 
    updateAttendance, 
    deleteAttendance 
} = require("../controllers/attendanceController");

router.get("/", getAttendance);
router.get("/:id", getAttendanceById);
router.post("/", createAttendance);
router.put("/:id", updateAttendance);
router.delete("/:id", deleteAttendance);

module.exports = router;