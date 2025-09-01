const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Admin CRUD for Students
exports.createStudent = (req, res) => {
    const { name, email, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO students (name,email,password) VALUES (?,?,?)', [name,email,hashed], (err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Student created', id: result.insertId });
    });
};

exports.updateStudent = (req,res)=>{
    const { id } = req.params;
    const { name,email,password } = req.body;
    const hashed = bcrypt.hashSync(password,10);
    db.query('UPDATE students SET name=?, email=?, password=? WHERE id=?',[name,email,hashed,id],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Student updated' });
    });
};

exports.deleteStudent = (req,res)=>{
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id=?',[id],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Student deleted' });
    });
};

// Admin CRUD for Teachers
exports.createTeacher = (req,res)=>{
    const { name,email,password } = req.body;
    const hashed = bcrypt.hashSync(password,10);
    db.query('INSERT INTO teachers (name,email,password) VALUES (?,?,?)',[name,email,hashed],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Teacher created', id: result.insertId });
    });
};

exports.updateTeacher = (req,res)=>{
    const { id } = req.params;
    const { name,email,password } = req.body;
    const hashed = bcrypt.hashSync(password,10);
    db.query('UPDATE teachers SET name=?,email=?,password=? WHERE id=?',[name,email,hashed,id],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Teacher updated' });
    });
};

exports.deleteTeacher = (req,res)=>{
    const { id } = req.params;
    db.query('DELETE FROM teachers WHERE id=?',[id],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Teacher deleted' });
    });
};
