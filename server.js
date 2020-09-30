const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT  = process.env.PORT || 3000
const mongoose = require('mongoose')
//Database connection

const url = 'mongodb://localhost/order';
mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true })
const connection  = mongoose.connection;
connection.once('open' , () => {
    console.log('Database connected...');
}).catch( err => {
    console.log('Connection failed...');
})



// Assets(tai san)
app.use(express.static('public'))

// set teamlate engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'./resources/views'))
app.set('view engine', 'ejs')

require('./routes/web.js')(app)







app.listen(PORT , () => {
    console.log('Listening on port ',PORT)
})