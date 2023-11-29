const express = require("express");
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const router = express.Router();
require('../DB/connection')
const User = require("../Models/User_Schema");
const authenticate = require("../Middleware/authenticate");




router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please Fill the Data" });
        }

        const userLogin = await User.findOne({ email: email })

        // console.log(userLogin)
        if (userLogin == null) {
            console.log(userLogin)
            return await res.status(400).json({ message: "Login Unsccessfully" });
        }
        const unHashedPass = await bycrpt.compare(password, userLogin.password)

        if (unHashedPass) {
            const token = await userLogin.generateToken();

            res.cookie("JWToken", token, {
                expires: new Date(Date.now() + 259200000),
                httpOnly: true
                , secure: true
            })

            await User.findByIdAndUpdate(
                userLogin._id,
                { $push: { tokens: { 'token': token } } },
                { new: true }
            );

            // console.log(token);
            res.json({ message: "Login Successfully" });
        }
        else {
            res.status(400).json({ message: "Login Unsccessfully" });
        }
    }
    catch (error) {
        console.log("THis is Catch Block")
        console.log(error)
    }


})

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, passwordC } = req.body;

    if (!name || !email || !phone || !work || !password || !passwordC) {
        return res.status(422).json({ error: "Please fill the field properly" });
    }
    try {
        Data = await User.findOne({
            email: email
        })

        if (Data != null) {
            return await res.json({ message: "User Already Exists" })
        }

        const hashedPassword = await bycrpt.hash(password, 10);

        await User.create({
            name,
            email,
            phone,
            work,
            password: hashedPassword,
            passwordC: hashedPassword
        })

        res.json({}).status(200)
    } catch (error) {
        console.log(error)
    }

})



router.get('/', (req, res) => {
    res.cookie('name', "Niraj Lalwnai")
    res.send("Hello World MERN Project");
})

// About ka Page. 
router.get('/about', authenticate, (req, res) => {
    // console.log("Auth.js About")
    // res.send(req.rootUser)
    // res.json({value:"Hello About world from the server"})
    res.status(200).json(req.rootUser);
})

router.post('/contact', authenticate, async (req, res) => {

    try {
        const { name, email, phone, message } = req.body

        if (!name || !email || !phone || !message) {
            console.log("Error in contact form")
            return res.json({ error: "Please Fill the contact form" })
        }
        const user = req.rootUser;
        console.log(user)



        const userMessage = await user.insertMessage(name, email, phone, message)
        // if (userMessage === null) {
        //     res.status(401).json({"ERROR":"Ivalid Email"});
        // }

        res.status(200).json({})

        await user.save();




    }
    catch (error) {
        console.log(error)
    }




})

router.get('/home', authenticate, (req, res) => {
    res.status(200).json(req.rootUser)
})

router.get('/signin', (req, res) => {
    res.send("SignIN Hello World MERN Project");
})

router.get('/signup', (req, res) => {
    res.send("SignUP Hello World MERN Project");
})

router.get('/logout', (req, res) => {
    console.log("Hello My Logout page")
    res.status(200).clearCookie('JWToken').send("User Logout");
})



module.exports = router;