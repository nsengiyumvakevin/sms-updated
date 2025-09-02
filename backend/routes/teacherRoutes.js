const express = require("express");
const Subject = require("../models/Subject");

const router = express.Router();

// Add Subject
router.post("/subject", async (req, res) => {
  try {
    const { name, teacherId } = req.body;

    const newSubject = new Subject({ name, teacher: teacherId });
    await newSubject.save();

    res.status(201).json({ message: "Subject added", subject: newSubject }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Subject
router.put("/subject/:id", async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Subject not found" });

    res.json({ message: "Subject updated", subject: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Subject
router.delete("/subject/:id", async (req, res) => {
  try {
    const deleted = await Subject.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Subject not found" });

    res.json({ message: "Subject deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
