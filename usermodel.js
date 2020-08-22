const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    google_id: String,
    email: String,
    active: Boolean
})

module.exports = mongoose.model("Member", userSchema);