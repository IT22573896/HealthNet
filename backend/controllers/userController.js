import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });

  // Validate user already exist
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Validate required fields
  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Validate email format
  const emailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailAddress.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  // Validate password
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    // user.role = req.body.role || user.role;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Admin side
const addNewUser = asyncHandler(async (req, res) => {
  try {
    const userData = new User(req.body);

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    const savedData = await userData.save();
    res.status(200).json({ msg: "User Added Successfully", data: savedData });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const getOneUserById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const updateUserDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

const deleteUserDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const userExist = await User.findById(id);

    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  addNewUser,
  getAllUsers,
  getOneUserById,
  updateUserDetails,
  deleteUserDetails,
};
