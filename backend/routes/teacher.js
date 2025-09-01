const express = require('express');
const pool = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate, authorize('teacher'));

// add subject
router.post('/subject', async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO subjects (title, description, teacher_id) VALUES (?, ?, ?)', [title, description, req.user.id]);
    res.json({ id: result.insertId, title, description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// update subject (owner)
router.put('/subject/:id', async (req, res) => {
  const { title, description } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM subjects WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Not found' });
    if (rows[0].teacher_id !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

    await pool.query('UPDATE subjects SET title = ?, description = ? WHERE id = ?', [title, description, req.params.id]);
    res.json({ message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete subject (owner)
router.delete('/subject/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM subjects WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ message: 'Not found' });
    if (rows[0].teacher_id !== req.user.id) return res.status(403).json({ message: 'Not allowed' });

    const [result] = await pool.query('DELETE FROM subjects WHERE id = ?', [req.params.id]);
    res.json({ affected: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
