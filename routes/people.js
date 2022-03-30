const express= require('express');
const router=express.Router();
const { users }= require("../models/users");
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const getUser = require('../middlewares/getUser');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var useCtrl= require('../Controller/controller');
require('dotenv').config(); 


//get all
router.get('/', auth, async(req, res) => {
    try{
        const user = await users.find();
        res.json(user);
    } catch(err){
        res.status(500).json({message: err.message});
    }

});

//get one 
router.get('/:id', getUser, (req, res) => {

    res.json(res.user);
    
});

//create or register request
router.post('/register', async(req, res) => {
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
});

//login request

/*router.post('/login', async(req, res) => {

    let user = await users.findOne({email: req.body.email});
    if(!user) return res.status(400).send("User NOT Exists");
    let isValid=await bcrypt.compare(req.body.password, user.password);
    if(!isValid) return res.status(401).send('InValid Password');


});*/

router.post('/login', async(req, res) => {
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
});

//update
router.patch('/:id',getUser, auth, async(req, res) => {
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
    
});


//delete
router.delete ('/:id', auth, admin, getUser, async(req, res) => {
    try{
        await res.user.remove();
        res.json({message: 'Person Deleted'});
    } catch (err){
        res.status(500).json({message: err.message});
    }
    
});


// send email

router.post('/email-send', useCtrl.emailSend);

//change password
router.post('/change-pass', useCtrl.changePass);

module.exports = router;