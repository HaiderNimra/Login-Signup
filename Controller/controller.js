const express= require('express');
const router=express.Router();
const { users }= require("../models/users");
const Otp = require('../models/otp')
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const getUser = require('../middlewares/getUser');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
require('dotenv').config(); 


const emailSend= async (req, res)=>{
    let data= await users.findOne({email:req.body.email});
    const responseType = {};
    if(data){
        let otpCode = Math.floor((Math.random()*10000)+1);
        let otpData = new Otp ({
            email: req.body.email,
            code:otpCode,
            expire: new Date().getTime() + 300*1000
        })

        let otpResponse = await otpData.save();
        responseType.statusText= 'success';
        responseType.message ='Check Email';
    }
    else{
        responseType.statusText= 'Error';
        responseType.message ='Wrong Email';
    }
    res.status(200).json(responseType);
}





const changePass= async (req, res)=>{
    let data= await Otp.findOne({email:req.body.email, code:req.body.code});
    const responseType = {};
    if(data){
        let currentTime= new Date().getTime;
        let diff =data.expire - currentTime;
        if(diff < 0){
            responseType.statusText= 'Error';
            responseType.message ='OTP expired';
        }
        else{
            let user= await users.findOne({email:req.body.email});
            user.password= req.body.password;
            user.save();
            responseType.statusText= 'Success';
            responseType.message ='Password Changed';
        }
    }
    else{
        responseType.statusText= 'Error';
        responseType.message ='Invalid OTP';
    }
    res.status(200).json(responseType);
}


module.exports={
    emailSend,
    changePass
}