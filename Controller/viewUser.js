
const { users }= require("../models/users");
var _ = require('lodash');
require('dotenv').config(); 


let getAll = async(req, res) => {
    try{
        const user = await users.find();
        res.json(user);
    } catch(err){
        res.status(500).json({message: err.message});
    }

}


let getOne = (req, res) => {

    res.json(res.user);
    
}


module.exports= {
    getAll,
    getOne
}