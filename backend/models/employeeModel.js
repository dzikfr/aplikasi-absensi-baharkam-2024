const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employee_nrp: {
        type: Number,
        required: true
    },

    employee_name: {
        type: String,
        required: true
    },

    employee_rank: {
        type: String,        
        required: true
    },

    employee_position: {
        type: String,
        required: true     
    },

    employee_division: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division',
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    update_at: {
        type: Date,
        default: Date.now    
    }
});

EmployeeSchema.pre('save', function(next) {
    this.update_at = Date.now();
    next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);