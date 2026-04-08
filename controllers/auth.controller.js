const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const req = require("express/lib/request");

const register = async (req, res) =>{
    try {
        const {name, email, password} = req.body;

        const userExist = await User.findOne({email});

        if (userExist) {
            return res.status(400).json({message:"User already exists"})
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({name,email,password: hashedpassword,});

        res.status(201).json({message:"User registered successfully", 
            createUser:{
                _id: createUser._id,
                name: createUser.name,
                email: createUser.email,
            },
    });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


const login = async(req, res)=> {
 try {
    const {email, password} = req.body;

    const checkUser = await User.findOne({email});
    if (!checkUser) {
      return res.status(400).json({message:"Invalid email"})
    }

    const itIsMatch = await bcrypt.compare(password, checkUser.password);
    if (!itIsMatch) {
      return res.status(400).json({ message: "Invalid password"});
    }

    const createToken = jwt.sign(
      { id: checkUser._id, role: checkUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({message: "Login successful", createToken, });
 } catch (error) {
    res.status(500).json({ message: error.message });
 }
}


module.exports = {register, login};