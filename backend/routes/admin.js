const express = require('express');
const pool = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();
router.use(authenticate, authorize('admin'));

// create teacher or student or admin
router.post('/user', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !role) return res.status(400).json({ message: 'Missing fields' });
  if (!['teacher', 'student', 'admin'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  try {
    const bcrypt = require('bcryptjs');
    const hashed = bcrypt.hashSync(password || 'password', 10);
    const [result] = await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashed, role]);
    res.json({ id: result.insertId, name, email, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/user/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.json({ affected: result.affectedRows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/user/:id', async (req, res) => {
  const { name, email, role } = req.body;
  try {
    await pool.query('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, req.params.id]);
    res.json({ message: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
