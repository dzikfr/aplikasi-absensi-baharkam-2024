const Employee = require('../models/employeeModel');
const Division = require('../models/divisionModel');
const fs = require('fs');
const path = require('path');

const getAllEmployees = async (req, res) => {   
    try {
        const employees = await Employee.find().populate('employee_division');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate('employee_division');
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEmployee = async (req, res) => {
    try {
        const { 
            employee_nrp, 
            employee_name, 
            employee_rank, 
            employee_position, 
            employee_division 
        } = req.body;

        const newEmployee = new Employee({
            employee_nrp,
            employee_name,
            employee_rank,
            employee_position,
            employee_division
        })

        const employee = await Employee.create(newEmployee);

        res.status(201).json({ message: "Employee created successfully", data: employee });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
                                                req.params.id, 
                                                req.body, 
                                                { new: true, runValidators: true }
                                            );
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};