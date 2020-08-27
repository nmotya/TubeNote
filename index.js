const express = require("express");

const cors = require("cors");

const router = require("./backend/routes");

const mongoose = require("mongoose");


const app = express();


//const  humongouspenis  = (req, res, next) => {
   // console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}${moment().format()}`);
   // next();
//}
//app.use(humongouspenis);

app.use(cors());

const uri = "mongodb+srv://nassim:passwordy@cluster0.4116f.mongodb.net/users?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("ezpz pp"))


app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/api/users", router);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));