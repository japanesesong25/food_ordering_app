const express = require('express')

const router = express.Router()

const mailSender = require("../utils/mailSender")

const User = require('../models/userModel')

const Otp = require("../models/otpModel")
const otpModel = require('../models/otpModel')

router.get('/generate-otp', (req, res) => {
    const email = req.query.email
    const otp = Math.floor(100000 + Math.random() * 900000)

    const newOTP = new Otp({
        email: email,
        otp: otp.toString()
    })

    newOTP.save((err, newOTP) => {
        if (!err) {

           mailSender(email,otp )
                res.json({
                    "message": `OTP Emailed successfully`,
                    "status": "success",
    
                })

            }
        else{

            res.json({
                "message": "Error while generating OTP",
                "status": "failed"
            })
        }
    })

})

router.post('/create-user', async (req, res) => {
    console.log(req.body)

   const email = req.body.email
   const otp = req.body.otp

   const savedOTP = await otpModel.findOne({email: email, otp: otp})

   if(!savedOTP){
    res.json({
        "message": "OTP does not match"
    })
   }


    const user = new User({
        name: req.body.name,
        email: req.body.email,
        //_id: req.body._id,
        admin: req.body.admin,
        password: req.body.password
    })


    user.save((err, user) => {
        if (err) {
            res.status(400).send({ error : err})
        } else {
            res.status(200).send({ data: user})
        }
    })


})

router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
        try {
        
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid =user.password === password;

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            return res.status(200).json({ message: 'Login successful', id: user.id });
        } 
        catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({ message: 'Internal server errorsssss',error });
        }
    } else {
        return res.status(400).json({ message: 'Email and password are required' });
    }
});

module.exports = router