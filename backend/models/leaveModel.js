const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },

    start_date: {
        type: Date,
        required: true
    },

    end_date: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending',
        required: true
    }
});

module.exports = mongoose.model("Leave", LeaveSchema)