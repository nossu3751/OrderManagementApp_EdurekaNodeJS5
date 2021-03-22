const express = require('express');
const router = express.Router();
const cors = require('cors');
var dotenv = require('dotenv').config();


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var corsOption={
    origin:'*',
    optionsSuccessStatus:200
}

router.use((req,res,next)=>{
    console.log("Time", Date.now());
    next();
})

router.post('/', cors(corsOption) ,(req,res)=>{
    console.log("apiKey",process.env.SENDGRID_API_KEY);
    console.log(req.body);
    sgMail.send(req.body).then(()=>{
        console.log('email sent');
        res.send(req.body);
    }).catch((error)=>{
        console.error(error);
    })
})

module.exports = router;