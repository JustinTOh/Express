const bcrypt = require('bcryptjs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const {SECRET} = require ('../config')
const passport = require('passport')

const userRegister = async(userDets, role, res) =>{
    try{
        let usernameNotTaken = await(validateUsername(userDets.username))
        if (!usernameNotTaken){
            return res.status(400).json({
                message: `Username is alerady taken.`,
                success: false
            })
        }
        let emailNotRegistered = await(validateEmail(userDets.email))
        if (!emailNotRegistered){
            return res.status(400).json({
                message: `Email is already registered.`,
                success: false
            })
        }
    
        //HASH password
        const hashed = await bcrypt.hash(userDets.password, 12)
        //create a new user
        const newUser = new User({
            username: userDets.username,
            email: userDets.email,
            password: hashed,
            role: role
        })
    
        await newUser.save();
        return res.status(201).json({
            message: "You have successfully registered. Please now login.",
            success: true
        })
    }
    catch(error){
        return res.status(500).json({
            message: "Unable to create account.",
            success: false
        })    
    }
}

const userLogin = async (userCreds, res) =>{
    let { username,  password } = userCreds;
    //check username is in database
    var user = await User.findOne({username: username })
    if(!user){
        var euser = await User.findOne({email: username})
        if(!euser){
            return res.status(404).json({
                message: "Username is not found. Invalid login credentials.",
                success: false
            })
        }
        user = euser
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            email:user.email
        }, SECRET, { expiresIn: "7 days" })

        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `${token}`,
            expiresIn: 168
        }

        return res.status(200).json({
            ... result,
            message: "You are now logged in.",
            success: true
        })

    }else{
        return res.status(403).json({
            message: "Incorrect Password.",
            success: false
        })
    }

}

const userAuth = passport.authenticate('jwt', {failureRedirect:'/',session:false})


const checkRole = roles => (req, res, next) => 
    !roles.includes(req.user.role) 
    ? res.redirect('/wrong_user')
    : next()



const validateUsername = async username=>{
    let user = await User.findOne({username: username})
    return user ? false : true;
}

const validateEmail = async email=>{
    let user = await User.findOne({email: email})
    return user ? false : true;
}

const serializeUser = user => {
    return {
        username: user.username,
        email: user.email,
        _id: user._id
    }
}

module.exports = {
    checkRole,
    userAuth,
    serializeUser,
    userRegister,
    userLogin
}