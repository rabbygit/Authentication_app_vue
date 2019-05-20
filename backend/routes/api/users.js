var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var passport = require('passport');
const secret = require('../../config/keys').secret ;
var User = require('../../models/Users');

router.post('/register' , (req,res) => {
    console.log('from backend')
    let {
        name,
        username,
        email,
        password,
        confirm_password
    } = req.body ;

    // Check matched password
    if(password != confirm_password){
        return res.status(400).json({
            msg : "password doesn't match"
        })
    }

    //check unique username
    User.findOne({username : username}).then(user =>{
        if(user){
            return res.status(400).json({
                msg : "username is already taken"
            })
        }
    })

    //check unique email address
    User.findOne({email : email}).then(user =>{
        if(user){
            return res.status(400).json({
                msg : "email is already taken"
            })
        }
    })

    //Create new user
    let newUser = new User({
        name,
        username,
        email,
        password
    })

    //Hash the password
    bcrypt.genSalt(10 , (err , salt) =>{
        bcrypt.hash(newUser.password , salt , (err , hash) =>{
            if(err) throw err ;
            newUser.password = hash ;
            newUser.save().then(user =>{
                return res.status(201).json({
                    success : true ,
                    msg: "New User is created successfully !"
                })
            })
        })
    })
} )

router.post('/login' , (req,res) =>{
    User.findOne({ username : req.body.username }).then(user => {
        if(!user){
            return res.status(404).json({
                success: false ,
                msg : "username is not found"
            })
        }

        bcrypt.compare(req.body.password , user.password).then(isMatch => {
            if(isMatch){
                //everything is fine.we are going to give a token
                const payload = {
                    _id : user._id ,
                    name : user.name ,
                    username : user.username ,
                    email : user.email
                }
                jwt.sign(payload , secret , { 
                    expiresIn : 604800 
                },(err,token)=>{
                    res.status(200).json({
                        success: true ,
                        user : user ,
                        token: `Bearer ${token}`,
                        msg:"successfully logged in !!"
                    })
                } )
            }else{
                return res.status(404).json({
                    success: false ,
                    msg : "Incorrect password"
                })
            }
        })
    })
})

router.get('/profile' , passport.authenticate('jwt' , { session : false }) , (req,res)=>{
    return res.json({
        user: req.user
    });
})
module.exports = router;
