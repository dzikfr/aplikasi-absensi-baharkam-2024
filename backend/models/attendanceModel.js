const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },

    status: {
        type: String,
        enum: ['Hadir', 'Sakit', 'Cuti', 'Izin', 'Alpa'],
        required: true,
    },

    date: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);