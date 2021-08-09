const express = require('express')
const path = require('path')
const User = require('../models/users')
const router = express.Router()
//const User = require('../models/users')
//const bcrypt = require('bcryptjs')
const { userRegister, userLogin, userAuth, serializeUser, checkRole } = require("../utils/Auth")


//Users database display
router.get('/', userAuth, checkRole(['admin']), async(req, res) => {
    try {
        const users = await User.find({},{"password": 0, "createdAt": 0, "updatedAt": 0})
        res.json(users)
        
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
});

//Users registeration
router.post('/register', userAuth, checkRole(['admin']), async(req, res) => {
    await userRegister(req.body,req.body.role, res)
})

//DELETE USER BY ID
router.delete('/:id', getUser, userAuth, checkRole(['admin']), async(req, res) => {
    try{
        await res.user.remove()
        res.json({message: 'Deleted user'})
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//UPDATING USER BY ID
router.put('/:id', userAuth, checkRole(['admin']), getUser, async(req, res) => {
  if (req.body.username != null) {res.user.username = req.body.username}
  if (req.body.password != null) {res.user.password = req.body.password}
  if (req.body.email != null) {res.user.email = req.body.email}
  if (req.body.role != null) {res.user.role = req.body.role}

  try {
      const updatedUser = await res.user.save()
      console.log(res.user)
      res.json(updatedUser)
    } catch (err){
      res.status(400).json({ message: err.message })
    } 
})

router.post('/login', async (req,res)=>{
  await userLogin(req.body, res);
})
//User Logout
router.get('/logout', async (req, res)=> {
    res.sendFile(path.join(__dirname, '../views/logout.html'))
})


//Users protected
router.get('/user-dash', userAuth, checkRole(['user']), async(req, res) => {
    res.render("dash", {title: "User Dashboard", nav: "user-dash", metric: "user-report"})
})
//Users protected
router.get('/user-report', userAuth, checkRole(['user']), async(req, res) => {
  res.render("activity", {title:"Report",metric: "user-report", nav: "user-dash",})
})



//Admins Protected
router.get('/admin-dash', userAuth, checkRole(['admin']), async(req, res) => {
    res.render("dash", {title: "Admin Dashboard", nav: "admin-dash", metric: "admin-report", allowed: "true"})
})


//Admins Protected
router.get('/admin-report', userAuth, checkRole(['admin']), async(req, res) => {
  res.render("activity", {title:"Report",metric: "admin-report", nav: "admin-dash", allowed: "true"})
})


async function getUser(req, res, next) {
    try {
      user = await User.findById(req.params.id)
      if (user == null) {
        return res.status(404).json({ message: 'Cant find User'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user
    next()
  }

module.exports = router