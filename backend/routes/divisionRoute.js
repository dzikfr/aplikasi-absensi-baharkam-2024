const express = require("express");
const router = express.Router();
const { 
    getDivision, 
    getDivisionById, 
    createDivision, 
    updateDivision, 
    deleteDivision 
} = require("../controllers/divisionController");

router.get("/", getDivision);
router.get("/:id", getDivisionById);
router.post("/", createDivision);
router.put("/:id", updateDivision);
router.delete("/:id", deleteDivision);

module.exports = router;