const mongoose = require("mongoose");

const DivisionSchema = new mongoose.Schema({
    division_id: {
        type: Number,
        required: true
    },

    division_name: {
        type: String,   
        required: true          
    }
});

module.exports = mongoose.model("Division", DivisionSchema);