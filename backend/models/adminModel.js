const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    satuan: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Division",
    },
});

module.exports = mongoose.model("User", UserSchema);
