const userService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const { name, email, password, roleTitle } = req.body;
    const user = await userService.registerUser({ name, email, password, roleTitle });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await userService.loginUser({ email, password });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.roleId.title,
        },
      });
  } catch (err) {
    console.log("🚀 ~ login ~ err:", err)
    res.status(401).json({ error: err.message });
  }
};

const getAll = async (_req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { register, login ,getAll,getById,update,remove};