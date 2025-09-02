const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // mongoose User model

const router = express.Router();

// 👉 Create Teacher or Student
router.post("/user", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["teacher", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 🔑 hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPass,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: `${role} created successfully`, user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Update Teacher or Student
router.put("/user/:id", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (role && ["teacher", "student"].includes(role)) user.role = role;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: `${user.role} updated successfully`, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Delete Teacher or Student
router.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: `${deletedUser.role} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👉 Get all Teachers & Students
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["teacher", "student"] } });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
