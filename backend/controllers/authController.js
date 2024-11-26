const Admin = require('../models/adminModel.js');

const login = async (req, res) => {
    try {
      const { admin_username, admin_password } = req.body;
  
      // Cari admin dengan populasi admin_division
      const admin = await Admin.findOne({ admin_username }).populate({
        path: "admin_division", // Field yang akan dipopulasi
        select: "division_name", // Pilih hanya field yang diperlukan
      });
  
      // Periksa apakah admin ditemukan
      if (!admin) {
        return res.status(404).json({ message: "Username tidak ditemukan" });
      }
  
      // Periksa password
      if (admin.admin_password !== admin_password) {
        return res.status(401).json({ message: "Password salah" });
      }
  
      // Berhasil login
      res.status(200).json({
        message: "Login berhasil",
        admin: {
          _id: admin._id,
          admin_username: admin.admin_username,
          admin_division: admin.admin_division, // Data division sudah terisi
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
  };

const register = async (req, res) => {
    try {
        const { admin_username, admin_password } = req.body;

        const existingAdmin = await Admin.findOne({ where: { ad_username } });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Username sudah digunakan' });
        }

        const newAdmin = await Admin.create({ ad_username, ad_password });

        res.status(201).json({ message: 'Register successfull', newAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error', error });
    }
}

module.exports = { login, register };