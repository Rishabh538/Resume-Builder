require('dotenv').config();

const express = require("express");
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const User = require('./public/models/user');
require('./public/javascript/google')
const mongoose  = require('mongoose');
const session =  require('express-session');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

mongoose.connect('mongodb://localhost:27017/resume-builder', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }  
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {

    
    //  res.locals.name= 
    //  console.log(req.user.displayName);
    //  res.locals.pic = 
    //  console.log( req.user.photos[0].value);
    //  res.locals.email = 
    //  console.log( req.user.emails[0].value);

    // console.log(req.user);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

const requireLogin = (req, res, next) => {
    if(!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
      return res.redirect('/login');
    }
    next();
}


app.get("/", (req, res) => {
    res.render("home");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get("/resume", (req, res) => {
    res.render("resume");
});

app.get("/createresume", requireLogin, (req, res) => {
    res.render("createResume");
});


//Auth
app.get("/register", (req, res) => {
    res.render("register");
});

app.post('/register', async (req, res) => {
    try{
    const { password, username, email } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success', 'Welcome to Resume Builder!');
        res.redirect("/index");
    })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect("/register");
    }
});

app.get("/login", (req, res) => { 
    res.render("login");
});

app.post("/login", passport.authenticate('local', {failureFlash: true, failureRedirect:'/login' }), (req, res) => { 
    const redirectUrl = req.session.returnTo || "/resume";
    delete req.session.returnTo;
    req.flash('success', 'Yeahh Welcome back!');
    res.redirect(redirectUrl);
});


//GOOGLE AUTH
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', {failureFlash:true, failureRedirect: '/login', successRedirect: '/resume'}));


app.get("/logout", (req, res) => {
    req.logout();
    req.flash('success', 'See you later!');
    res.redirect('/index');
}) 


app.listen(3000, () => {
    console.log("Resume Builder app has started!");
});




