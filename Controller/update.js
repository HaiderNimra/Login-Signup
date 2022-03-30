var _ = require('lodash');
require('dotenv').config(); 



let edit = async(req, res) => {
    if(req.body.name !=null){
        res.user.name =req.body.name;
    }
    if(req.body.password != null){
        res.user.password= req.body.password;
    }
    try{
        const updateUser= await res.user.save();
        res.json(updateUser);
    } catch(err){
        res.status(400).json({message: err.messaage});
    }
    
}

module.exports = { edit }
