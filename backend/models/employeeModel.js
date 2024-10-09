const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    position: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);