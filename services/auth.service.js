const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { hashText } = require("../utils");

const User = db.user;
const Role = db.role;
const UserToken = db.userToken

const registerUser = async ({ name, email, password, roleTitle }) => {
  const role = await Role.findOne({ title: roleTitle || "user", status: "active" });
  if (!role) throw new Error("Role not found");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
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

  const tokenSignature = await hashText(token.split(".")[2]);

  await UserToken.create({
    userId: user._id,
    tokenSignature,
    expiredAt: tokenExpiresAt,
  });

//    const userChannel = `user:${user._id}`;

//   global.pubsub.subscribe(userChannel, (msg) => {
//     console.log(`[PubSub][${userChannel}]`, msg);
//   });

//   global.pubsub.publish(userChannel, {
//     event: "login",
//     message: "User logged in successfully",
//     userId: user._id,
//     time: new Date().toISOString(),
//   });

  return {
    user,
    token,
  };
};

module.exports = { registerUser, loginUser };
