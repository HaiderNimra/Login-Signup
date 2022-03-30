const jwt = require('jsonwebtoken');
require('dotenv').config(); 
const { users }= require('../models/users');

async function auth(req, res, next){
    let token = req.header('x-auth-token');
    if(!token) return res.status(400).send('Not Authorized');

    try{
        let user = jwt.verify(token, process.env.Key);
        req.user= await users.findById(user._id);
    } catch(err){
        return res.status(401).send('Invalid Token');
    }
    next();
}

module.exports = auth;