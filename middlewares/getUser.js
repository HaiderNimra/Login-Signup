const {users}=require('../models/users');
//middleware
async function getUser(req, res, next){
    try{
        user= await users.findById(req.params.id);
        if(user == null){
            return res.status(404).json({messaage: 'Cannot Find Person'});
        }
    } catch (err){
        return res.status(500).json({messaage: err.messaage});
    }

    res.user = user;
    next(); //will allow to move next part of middleware where actual resquest is

}

module.exports= getUser;