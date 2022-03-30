const express= require('express');
const router=express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const getUser = require('../middlewares/getUser');
var useCtrl = require('../Controller/controller');
var viewUser = require('../Controller/viewUser');
var Reg = require('../Controller/register');
var logIn = require('../Controller/login');
var Delete = require('../Controller/delete');
var Update = require('../Controller/update');
require('dotenv').config(); 


//get all
router.get('/', auth, viewUser.getAll);

//get one 
router.get('/:id', getUser, viewUser.getOne);

//create or register request
router.post('/register', Reg.register);

//login request
router.post('/login', logIn.logIn);

//update
router.patch('/:id',getUser, auth, Update.edit);

//delete
router.delete ('/:id', auth, admin, getUser, Delete.del);

// send email
router.post('/email-send', useCtrl.emailSend);

//change password
router.post('/change-pass', useCtrl.changePass);

module.exports = router;