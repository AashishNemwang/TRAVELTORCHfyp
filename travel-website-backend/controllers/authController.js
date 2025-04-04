// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Using await instead of callback
    const existingUser = await User.findByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    await User.createUser({ username, email, password: hash, role });
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: err.message || "Registration failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.findByEmail(email);
    
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({user:user}, process.env.JWT_SECRET, {
      expiresIn: "1h" 
    });

    res.json({ 
      token, 
      user: { id: user.id, username: user.username, role: user.role } 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message || "Login failed" });
  }
};

exports.getTheLoginedUser=async(req,res)=>{
try{
  const {token}=req.body;
  //console.log(token);
  const userData=await jwt.verify(token,process.env.JWT_SECRET);
  if(userData){
    return res.status(200).json({message:"user found",user:userData});
  }
  return res.status(200).json({message:"user found",user:userData});

}
catch(error){

  console.log(error);
  return res.status(200).json({message:'no user is logined.',error:error?.message})
}
}

