require('dotenv').config()

const express = require('express');
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongodbStore = require('connect-mongo')(session);
const passport = require('passport');


const app = express();

const PORT = process.env.PORT || 3300;

// Database Connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongoose connected...');
})
.catch(err => {
    console.log('connection failed...');
})


// Session Store
let mongoStore = new MongodbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }     // 24 hours
}))


// Passport config
const passportInit = require('./app/config/passport');
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash());

// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


// Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');


// import web.js and call it...
require('./routes/web')(app);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})