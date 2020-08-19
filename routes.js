var express = require('express');
var router = express.Router();
const Member = require("./usermodel");
const uuid = require("uuid");


//Get all users
router.get("/", async function(req, res){
    try{
        const users = await Member.find();
        res.json(users);
    }catch (err){
        res.status("400").json({message: "Error"});
    }
});

// Get a specific user from their ID
router.get("/:id", async function(req, res){ 
    try{
        const user = await Member.findById(req.params.id);
        res.json(user);
    }catch(err){
        res.status("400").json({message: "Error"});
    }
});

// Create a new user
router.post("/", async (req, res) =>{
    try{
        const newMember = new Member ({
            username: req.body.username,
            email: req.body.email
        });
        const savepost = await newMember.save();
        res.json(savepost);
        console.log("ez");
    }catch (err) {
        res.status("400").json({message: "Error"});
    }
});

//Delete user based on their ID
router.delete("/:id", async(req, res) => {
    try{
        const deleted = await Member.remove({_id: req.params.id});
        res.json(deleted);
    } catch (err){
        res.status("400").json({message: "Error"});
    }
});


//router.put("/:id", function(req, res){
  //  const exist = users.some(user => user.id === parseInt(req.params.id));
   // if (!exist){
    //    res.status(400).send("Asd");
   // }  else{
   //     res.json(users.filter(user => user.id === parseInt(req.params.id)));
   // }
    
//})


module.exports = router;