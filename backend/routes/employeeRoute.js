const express = require("express");
const router = express.Router();
const { 
    getEmployee, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee, 
    deleteEmployee 
} = require("../controllers/employeeController");

router.get("/", getEmployee);   
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;