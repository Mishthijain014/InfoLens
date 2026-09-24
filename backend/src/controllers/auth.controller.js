const {
  registerUser,
  loginUser,
  getUserById
} = require("../services/auth.service");

const signup = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await loginUser(req.body);

    res.status(200).json({
      message: "Login successful",
      ...result
    });
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await getUserById(req.userId);

    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  getMe
};