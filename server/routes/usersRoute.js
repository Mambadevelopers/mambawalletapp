const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

//======================================
//Register account
//=====================
router.post("/register", async (req, res) => {
  try {
    //check the duplicate users(user already exist);
    let user = await User.findOne({email: req.body.email});
    if(user) {
      return res.send({
        success: false,
        message: "User already exists"
      })
    }
    //Lets hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
      data: null,
      success: true,
    })
  } catch (error) {
    res.send({
      message: error.message,
      success: false
    });
  }
});

//======================================
//Login account
//=====================
router.post("/login", async (req, res) => {
  try {
    //Check if the user exist
    let user = await User.findOne({email: req.body.email});
    if(!user) {
      return res.send({
        success: false,
        message: "User does not exist"
      });
    }

    //Check if password is correct(These are the conditions you need before allowing user to login)
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
      return res.send({
        success: false,
        message: "Invalid password",
      })
    }
    //Check if user is verified
    if(!user.isVerified){
      return res.send({
        success: false,
        message: "User is not verified yet or has been suspended",
      })
    }

    //Generate Token for user
    const token = jwt.sign({userId: user._id}, process.env.jwt_secret, {expiresIn: "1d"});
    res.send({
      message: "User logged in successfully",
      data: token,
      success: true,
    })
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

//======================================
//====Get user info endpoint
//=====================
router.post("/get-user-info", authMiddleware, async(req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.password = ""
    res.send({
      message: "User info fetched successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
    });
  }
});

//======================================
//====Get all users info
//=====================
router.post("/get-all-users", authMiddleware, async(req, res) => {
  try {
    const users = await User.find();
    res.send({
      message: "Users fetched successfully",
      data: users,
      success: true,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: CSSFontFeatureValuesRule,
    });
  }
});

//update user verified status
router.post("/update-user-verified-status", authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.body.selectedUser, {
      isVerified: req.body.isVerified,
    });
    res.send({
      data: null,
      message: "User verified status updated successfully",
      success: true,
    });
  } catch (error) {
    res.send({
      data: error,
      message: error.message,
      success: false,
    });
  }
});



module.exports = router;
