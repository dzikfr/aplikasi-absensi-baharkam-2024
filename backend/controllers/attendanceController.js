const Attendance = require("../models/attendanceModel");
const Employee = require("../models/employeeModel");
const Division = require("../models/divisionModel");
const fs = require("fs");
const path = require("path");

const createAttendance = async (req, res) => {
    try {
        const { date, employee_id, status } = req.body;
        const newAttendance = new Attendance({ date, employee_id, status });
        const attendance = await Attendance.create(newAttendance);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find().populate("employee_id").populate("employee_id.employee_division");
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id).populate("employee_id").populate("employee_id.employee_division");
        if (!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(
                                                    req.params.id, 
                                                    req.body, 
                                                    { new: true, runValidators: true }
                                                );
        if (!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance not found" });
        }
        res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAttendance,
    getAllAttendances,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
};