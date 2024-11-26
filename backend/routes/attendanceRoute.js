const express = require("express");
const Attendance = require("../models/attendanceModel");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { employee_id, status, date } = req.body;
    const newAttendance = new Attendance({ employee_id, status, date });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:employeeId/:year/:month", async (req, res) => {
  try {
    const { employeeId, year, month } = req.params;
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const attendances = await Attendance.find({
      employee_id: employeeId,
      date: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });
    res.status(200).json(attendances);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/bulk-update", async (req, res) => {
  try {
    const attendanceUpdates = req.body.attendance; 
    for (let update of attendanceUpdates) {
      await Attendance.findOneAndUpdate(
        { employee_id: update.employee_id, date: update.date },
        { status: update.status },
        { upsert: true } 
      );
    }
    res.status(200).json({ message: "Absensi berhasil diperbarui" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat memperbarui absensi", error });
  }
});

router.get("/:year/:month", async (req, res) => {
  try {
    const { year, month } = req.params;
    const startOfMonth = new Date(year, month - 1, 1); 
    const endOfMonth = new Date(year, month, 0); 

    const attendances = await Attendance.find({
      date: {
        $gte: startOfMonth, 
        $lt: endOfMonth, 
      },
    });

    res.status(200).json(attendances); 
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
