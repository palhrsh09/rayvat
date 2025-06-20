const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { hashText } = require("../utils");
const mongoose = require("mongoose")

const User = db.user;
const Role = db.role;
const UserToken = db.userToken

const registerUser = async ({ name, email, password, roleTitle }) => {
  const role = await Role.findOne({ title: roleTitle || "user", status: "active" });
  if (!role) throw new Error("Role not found");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const newUser = new User({
    name,
    email,
    password,
    roleId: role._id,
  });

  await newUser.save();
  return newUser;
};

const loginUser = async ({ email, password }, res) => {
  const user = await User.findOne({ email }).populate("roleId");
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const payload = {
    userId: user._id,
    email: user.email,
    role: user.roleId.title,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
  const tokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const tokenSignature = await hashText(token.split(".")[2])
  console.log("🚀 ~ loginUser ~ tokenSignature:", tokenSignature)

  await UserToken.findOneAndUpdate(
  { userId: new mongoose.Types.ObjectId(user._id) },
  {
    tokenSignature,
    expiredAt: tokenExpiresAt,
  },
  { upsert: true, new: true }
);


  return {
    user,
    token,
  };
};

const getAllUsers = async () => {
  return await User.find().populate("roleId", "title").select("-password");
};

const getUserById = async (id) => {
  const user = await User.findById(id).populate("roleId", "title").select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

const updateUser = async (id, updateData) => {
  if (updateData.password) delete updateData.password;

  const updated = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
    .populate("roleId", "title")
    .select("-password");

  if (!updated) throw new Error("User not found or update failed");
  return updated;
};

const deleteUser = async (id) => {
  const deleted = await User.findByIdAndDelete(id).select("-password");
  if (!deleted) throw new Error("User not found or already deleted");
  return deleted;
};

module.exports = { registerUser, loginUser ,getAllUsers,getUserById,updateUser,deleteUser};
