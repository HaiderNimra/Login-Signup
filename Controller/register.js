const { users }= require("../models/users");
var bcrypt = require('bcryptjs');
var _ = require('lodash');
require('dotenv').config(); 


let register = async(req, res) => {
    let User = await users.findOne({email:req.body.email});
    if(User) return res.status(400).send("User Already Exists");

        User = new users({
        name: req.body.name,
        email: req.body.email, 
        password: req.body.password,

    })

    try{
        let salt= await bcrypt.genSalt(10);
        User.password=await bcrypt.hash(User.password, salt);
        const newUser = await User.save();
        res.status(201).json(_.pick(User,['name', 'email']));
    } catch (err){
       res.status(400).json({message: err.message}); 
    }
}


module.exports={register};
