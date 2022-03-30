const Joi = require('joi');
const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
       type: String,
       required:true
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'user',
    }
});




                             // file name and schema name

var users= mongoose.model('users', peopleSchema);

//for Sign Up
function validateUser(data){
    const schema= Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data,{abortEarly:false});
}

//for Log In
function validateUserLogin(data){
    const schema= Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data,{abortEarly:false});
}

module.exports.users= users; 
module.exports.validate= validateUser;
module.exports.validateUserLogin= validateUserLogin;