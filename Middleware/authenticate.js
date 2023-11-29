var jwt = require('jsonwebtoken');
const User = require("../Models/User_Schema");


const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.JWToken;
        if (!token) {
            throw new Error("Token Not Found")
        }


        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken)

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })

        // console.log(rootUser)

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        if (!rootUser) {
            throw new Error("User Not Found")
        };
        next()



    } catch (error) {
        res.status(401).json({ "ERROR": "Ivalid User" });
        console.log(error, "Error");
    }
}

module.exports = authenticate;