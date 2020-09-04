var express = require('express');
var router = express.Router();
const Member = require("./usermodel");

//Get all users
router.get("/", async function(req, res){
    try{
        const users = await Member.find();
        res.json(users);
    }catch (err){
        res.status("400").json({message: "Error"});
    }
});

// Get a specific user from their google ID
router.get("/:google_id", async function(req, res){ 
    try{
        const user = await Member.find({google_id: `${req.params.google_id}`});
        res.json(user);
    } catch(err){
        res.status("400").json({message: "Error"});
    }
});

// Create a new user
router.post("/", async (req, res) =>{
    try{
        const newMember = new Member ({
            google_id: req.body.google_id,
            notes: req.body.notes
        });
        const savepost = await newMember.save();
        res.json(savepost);
    } catch(err) {
        res.status("400").json({message: "Error"});
    }
});

//Delete user based on their google ID
router.delete("/:google_id", async(req, res) => {
    try{
        const deleted = await Member.remove({google_id: req.params.google_id});
        res.json(deleted);
    } catch(err){
        res.status("400").json({message: "Error"});
    }
});


//Add user's note and the corresponding video link 
router.patch("/:google_id", async(req, res) =>{
    try{
        const userInfo = await Member.find({google_id: `${req.params.google_id}`});
        if(!userInfo){
            res.sendStatus(401);
        }
        userInfo[0].notes.push(req.body.url);
        userInfo[0].notes.push(req.body.video_name);
        userInfo[0].notes.push(req.body.video_id);
        userInfo[0].notes.push(req.body.note);

        const newInfo = await Member.updateOne(
            {google_id: req.params.google_id},
            {$set: {notes: userInfo[0].notes}}
        )
        res.json(userInfo[0]);
    } catch(err){
        res.status("400").json({message: "Error"});
    }
});



module.exports = router;