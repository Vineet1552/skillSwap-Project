const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateToken = (userId) => {
    //jwt.sign(payload, secret, options) 
    return jwt.sign({userId}, process.env.JWT_KEY, {expiresIn:'7d'});
};

// register
const registerUser = async(req, res) => {
    try {
        // taking the fields from user
        const {name, email, password} = req.body;

        // check if user email is already present
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(409).json({
                message: "user is already present"
            })
        }

        // hasing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        });

    } catch(error) {
        res.status(500).json({
            message: "user registration fail",
            error: error.message
        })
    }
}



// login
const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            res.status(404).json({
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(401).json({
                message: "invalid credentails"
            })
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });

    } catch(error) {
        res.status(500).json({
            message: "user login failed",
            error: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}