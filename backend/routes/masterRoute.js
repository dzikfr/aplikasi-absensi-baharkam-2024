const express = require("express");
const router = express.Router();
const { 
    registerMaster, 
    loginMaster, 
    getAllMaster, 
    getMasterById, 
    updateMaster, 
    deleteMaster 
} = require("../controllers/masterController");

router.post("/register", registerMaster);
router.post("/login", loginMaster);
router.get("/", getAllMaster);
router.get("/:id", getMasterById);
router.put("/:id", updateMaster);
router.delete("/:id", deleteMaster);

module.exports = router;