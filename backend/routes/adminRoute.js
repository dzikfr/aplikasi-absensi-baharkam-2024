const express = require("express");
const router = express.Router();
const { 
    registerAdmin, 
    loginAdmin, 
    getAllAdmin, 
    getAdminById, 
    updateAdmin, 
    deleteAdmin 
} = require("../controllers/adminController");

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", getAllAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;