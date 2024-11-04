const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },

    start_date: {
        type: Date,
        required: true,
    },

    end_date: {
        type: Date,
        required: true,
    },

    status:{
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    }
});