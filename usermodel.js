const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    google_id: String,
    notes: Array
})

module.exports = mongoose.model("Member", userSchema);