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

const loginAdmin = async (req, res) => {
    try {
        const { admin_username, admin_password } = req.body;
        const admin = await Admin.findOne({ admin_username });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        if (admin_password !== admin.admin_password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Login successful", data: admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
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
    loginAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
}