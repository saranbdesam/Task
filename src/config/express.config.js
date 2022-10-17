const express = require('express');
const app = express();
const router = require('../router/index')
require('dotenv').config();
const multer = require('multer');
const session = require('express-session');
const passport = require('passport')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('src/output'));

app.use('/api', (req, res, next) => {
    next();
}, router);





module.exports = app;