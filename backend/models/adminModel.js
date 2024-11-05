const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    admin_username: {
        type: String,
        required: true
    },

    admin_password: {
        type: String,
        required: true
    },

    admin_division:{
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

AdminSchema.pre('save', function(next) {
    this.update_at = Date.now();
    next();
});

module.exports = mongoose.model('Admin', AdminSchema);