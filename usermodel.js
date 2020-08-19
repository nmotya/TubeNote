const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: String,
    email: String
})

module.exports = mongoose.model("Member", userSchema);