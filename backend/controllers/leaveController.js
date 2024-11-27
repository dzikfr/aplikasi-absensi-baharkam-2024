const Leave = require("../models/leaveModel");
const Employee = require("../models/employeeModel");
const Division = require("../models/divisionModel");
const fs = require("fs");
const path = require("path");

const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employee_id").exec();

    const leavesWithDivision = await Promise.all(
      leaves.map(async (leave) => {
        const employee = leave.employee_id;
        if (employee && employee.employee_division) {
          const division = await Division.findById(employee.employee_division);
          employee.employee_division = division;
        }
        return leave;
      })
    );

    res.status(200).json(leavesWithDivision);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate({
      path: "employee_id",
      populate: {
        path: "employee_division",
        model: "Division",
      },
    });

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createLeave = async (req, res) => {
  try {
    const { employee_id, start_date, end_date, status } = req.body;
    const newLeave = new Leave({ employee_id, start_date, end_date, status });
    const leave = await Leave.create(newLeave);
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllLeaves,
  getLeaveById,
  createLeave,
  updateLeave,
  deleteLeave,
};
