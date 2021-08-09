const cors = require('cors');
const express = require('express')
const cp = require('cookie-parser')
const mongoose = require('mongoose')
const bp = require('body-parser')
const passport = require('passport')
const path = require('path')
const exphbs = require('express-handlebars')
const {  userAuth, checkRole } = require("./utils/Auth")

const {DB, PORT } = require("./config")
//const { navA, footerA } = require ("./models/handle-models/admin")
//const { navU, footerU } = require ("./models/handle-models/user")

const app = express()

app.use(express.static(__dirname + '/public'));

app.use(cors())
app.use(cp())
app.use(bp.json())
app.use(passport.initialize())


app.set("view engine", "hbs")
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}))

require('./middleware/passport')(passport)

app.use('/user', require("./routes/users"))

mongoose.connect(DB, {
     useNewUrlParser: true, 
     useUnifiedTopology:true,
     useFindAndModify: true})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))
console.log(app.currentUser?.id)
app.use(express.json());

app.get('/', function (req,res){
    res.sendFile(path.join(__dirname, '/views/login.html'))
})

const static=require('./routes/static')
app.use('/static', static)
const perf = require('./routes/perform')
app.use('/perform', perf)
const active = require('./routes/active')
app.use('/active',active)



app.get('/users', userAuth, checkRole(['admin']), async(req, res) => {
    res.render("user-manage", {title: "User Management", nav: "user/admin-dash",metric: "user/admin-report", allowed: "true"})
})

app.get('/wrong_user', function(req,res){
    res.sendFile(path.join(__dirname, '/views/incorrect.html'))
})

app.get('*', function (req,res){
    res.sendFile(path.join(__dirname, '/views/error.html'))
})



app.listen(PORT, ()=> console.log('server started at port 8080'))