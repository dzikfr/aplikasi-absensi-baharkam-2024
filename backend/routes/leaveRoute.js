const express = require("express");
const router = express.Router();
const { 
    getLeave, 
    getLeaveById, 
    createLeave, 
    updateLeave, 
    deleteLeave 
} = require("../controllers/leaveController");

router.get("/", getLeave);
router.get("/:id", getLeaveById);
router.post("/", createLeave);  
router.put("/:id", updateLeave);
router.delete("/:id", deleteLeave);

module.exports = router;