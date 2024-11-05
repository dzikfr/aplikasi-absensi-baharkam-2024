const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    date: {
        type: Date, 
        default: Date.now,
        required: true
    },

    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },

    status: {
        type: String,
        enum: ['Present', 'Sick', 'Permission', 'Leave', 'Absent'],
        required: true
    }
});

module.exports = mongoose.model("Attendance", AttendanceSchema)
    