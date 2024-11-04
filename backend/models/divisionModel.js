const mongoose = require('mongoose');

const DivisionSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },

    nama_satuan: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Division', DivisionSchema);