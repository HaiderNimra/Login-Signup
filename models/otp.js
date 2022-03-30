const mongoose = require('mongoose');

const otpSchema= new mongoose.Schema({
    email:String,
    code:String,
    expire:Number
},{
    timestamps:true
})

let otp= mongoose.model('otp', otpSchema, 'otp');

module.exports = otp;