const { users }= require("../models/users");
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
require('dotenv').config(); 



let logIn =async(req, res) => {
    let User = await users.findOne({email:req.body.email});
    if(!User) return res.status(400).send("User NOT Exists");

    try{
        let isValid=await bcrypt.compare(req.body.password, User.password);
        if(!isValid) return res.status(401).send('InValid Password');
        let token = jwt.sign(
            {_id: User._id, name: User.name},
            process.env.Key
        );
        res.status(200).send(token);
    } catch (err){
        return res.status(400).json({message: err.message}); 
    }
}


/*router.post('/login', async(req, res) => {

    let user = await users.findOne({email: req.body.email});
    if(!user) return res.status(400).send("User NOT Exists");
    let isValid=await bcrypt.compare(req.body.password, user.password);
    if(!isValid) return res.status(401).send('InValid Password');


});*/

module.exports = {logIn}