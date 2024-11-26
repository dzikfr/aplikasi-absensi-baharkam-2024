const Admin = require("../models/adminModel");
const Division = require("../models/divisionModel");
const fs = require("fs");
const path = require("path");

//create Admin
const registerAdmin = async (req, res) => {
    try {
        const { admin_username, admin_password, admin_division } = req.body;
        const newAdmin = new Admin({
            admin_username,
            admin_password,
            admin_division
        });
        const admin = await Admin.create(newAdmin);

        res.status(201).json({ message: "Admin registered successfully", data : admin });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().populate("admin_division");
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).populate("admin_division");
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    registerAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}