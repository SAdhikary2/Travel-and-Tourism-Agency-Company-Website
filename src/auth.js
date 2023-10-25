

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const jwt = require('jsonwebtoken');
const User = require('./app');
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtCookies;
        console.log(token);
        const verifyUser = jwt.verify(token, 'mynameissukalyanadhikaryiamasoftwareenginner');
        console.log(verifyUser);

       
        next();
    } catch (error) {
        // console.log(error.message);
        res.render('login')
      
        
    }
}



module.exports = auth;

 