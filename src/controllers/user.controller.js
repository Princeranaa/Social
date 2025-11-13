const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "please enter all required fields",
      });
    }

    const existingUser = await UserModel.findOne({ userName });

    if (existingUser) {
      return res.status(409).json({
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      userName,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);

    res.status(201).json({
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log("something went wrong while registering user", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "please enter all required fields",
      });
    }

    const user = await UserModel.findOne({
      userName,
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);

    res.status(200).json({
        message: "User logged in successfully",
        user
    });
    

  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};
