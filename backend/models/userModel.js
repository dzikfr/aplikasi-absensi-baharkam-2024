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

    role: {
        type: String,
        enum: ["admin", "master"],
        required: true,
    },

    satuan: {
        type: String,
        enum: [
            "urkeu",
            "taud",
            "urtu rorenmin",
            "urtu robinopsnal",
            "bagbinlat",
            "bagkerma",
            "baganev",
            "bagren",
            "bagsumda",
            "bagbinfung",
            "korpolairud",
            "korbinmas",
            "korsabhara",
        ],
        required: function () {
        return this.role === "admin";
        },
    },
});

module.exports = mongoose.model("User", UserSchema);
