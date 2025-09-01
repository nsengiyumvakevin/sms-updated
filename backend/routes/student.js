const express = require('express');
const pool = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// students + teachers + admin can view subjects
router.get('/subjects', authenticate, authorize('student', 'teacher', 'admin'), async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT s.id, s.title, s.description, u.name as teacher_name, s.teacher_id FROM subjects s LEFT JOIN users u ON s.teacher_id = u.id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
