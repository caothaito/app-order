require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport = require('passport')
//Database connection

const url = 'mongodb://localhost/order';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...');
})
//passport config
const passportId = require('./app/config/passport')
passportId(passport)
app.use(passport.initialize())
app.use(passport.session())

//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//session config
app.use(session({

    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {
        maxAge: 100 * 60 * 60 * 24
    } //24h

}))


app.use(flash());
// Assets(tai san)
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



//Global middlware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})


// set teamlate engine
app.use(expressLayout)
app.set('views', path.join(__dirname, './resources/views'))
app.set('view engine', 'ejs')

require('./routes/web.js')(app)







app.listen(PORT, () => {
    console.log('Listening on port ', PORT)
})