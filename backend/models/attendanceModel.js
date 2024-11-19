const mongoose = require("mongoose");

function formatDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
}

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    default: () => formatDate(Date.now()),
  },

  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },

  status: {
    type: String,
    enum: ["Present", "Sick", "Permission", "Leave", "Absent"],
    required: true,
  },
});


AttendanceSchema.pre("save", function (next) {
  this.date = formatDate(this.date || Date.now());
  next();
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
