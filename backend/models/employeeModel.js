const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    nip:{
        type: Number,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    
    pangkat:{
        type: String,
        required: [true,'pangkat must be filled'],
        enum: ['test']
    },

    jabatan: {
        type: String,
        required: [true, 'jabatan must be filled'],
        enum: ['test']
    },

    satuan:{
        type: String,
        required: [true, 'satuan must be filled'],
        enum: ['test']
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);