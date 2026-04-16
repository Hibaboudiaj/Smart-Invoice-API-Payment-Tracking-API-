const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // ila l9a user f db kayraj3 objet kaml dyalo or null
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({message: "User already exists",});
    }
    //10 salt round : 9owat tachefir
    //.hash(): method tab3a l bycrypt kadir tachefir
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({message: "User registered successfully",
      user: {
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({message: "Invalid email",});
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    //return true or false
    if (!isMatch) {
      return res.status(400).json({message: "Invalid password",});
    }
    //jwt: tari9a amna bach twaled token
    // .sign(): katwaled token
    const token = jwt.sign(
      {//payload les info li f token
        id: checkUser._id, 
        role: checkUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    //kayraj3 token o les info dyl user
    res.json({message: "Login successful", token,
      user: {
        _id: checkUser._id,
        name: checkUser.name,
        email: checkUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };