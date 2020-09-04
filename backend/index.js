const express = require("express");

const cors = require("cors");

const router = require("./routes");

const mongoose = require("mongoose");


const app = express();

app.use(cors());

const uri = "mongodb+srv://nassim:passwordy@cluster0.4116f.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("Server up and running"))


app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/api/users", router);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));