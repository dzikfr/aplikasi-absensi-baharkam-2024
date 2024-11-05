const Division = require('../models/Division');
const fs = require('fs');
const path = require('path');

const getDivision = async (req, res) => {   
    try {
        const divisions = await Division.find();
        res.status(200).json(divisions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDivisionById = async (req, res) => {
    try {
        const division = await Division.findById(req.params.id);
        if (!division) {
            return res.status(404).json({ message: "Division not found" });
        }
        res.status(200).json(division);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDivision = async (req, res) => {
    try {
        const { division_id, division_name } = req.body;
        const newDivision = new Division({ division_id, division_name });
        const division = await Division.create(newDivision);
        res.status(201).json(division);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateDivision = async (req, res) => {
    try {
        const division = await Division.findByIdAndUpdate(
                                                req.params.id, 
                                                req.body, 
                                                { new: true, runValidators: true }
                                            );
        if (!division) {
            return res.status(404).json({ message: "Division not found" });
        }
        res.status(200).json(division);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDivision = async (req, res) => {
    try {
        const division = await Division.findByIdAndDelete(req.params.id);
        if (!division) {
            return res.status(404).json({ message: "Division not found" });
        }
        res.status(200).json({ message: "Division deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getDivision, 
    getDivisionById, 
    createDivision, 
    updateDivision, 
    deleteDivision 
};