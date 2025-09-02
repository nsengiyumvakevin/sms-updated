const User = require("../models/User");
const bcrypt = require("bcryptjs");

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) return;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash("admin123", salt);

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPass,
      role: "admin",
    });

    await admin.save();
    console.log("✅ Default admin created");
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
  }
};

module.exports = seedAdmin;
