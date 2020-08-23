const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    google_id: String,
    email: String
})

module.exports = mongoose.model("Member", userSchema);