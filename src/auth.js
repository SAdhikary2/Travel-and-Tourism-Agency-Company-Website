// const jwt=require('jsonwebtoken')
// const User=require('./app')

// const auth=async (req,res,next)=>{
// console.log(req.cookies.jwt);
// try{

//     const token=req.cookies.jwt;
//     const verifyUser=jwt.verify(token,'mynameissukalyanadhikaryiamasoftwareenginner');
//     console.log(verifyUser);
//     next();


// }catch(error){
//     res.status(401).send('error')

// }
// }

// module.exports=auth;

const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const User = require('./app');
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, 'mynameissukalyanadhikaryiamasoftwareenginner');
        console.log(verifyUser);
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).send('error')
        
    }
}

const app = express();
app.use(cookieParser());

module.exports = auth;

 