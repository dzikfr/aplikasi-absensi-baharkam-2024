const mongoose = require('mongoose');

const MasterSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Master', MasterSchema);