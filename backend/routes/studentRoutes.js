const express = require("express");
const Subject = require("../models/Subject");

const router = express.Router();

// View All Subjects
router.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find().populate("teacher", "name email");
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
