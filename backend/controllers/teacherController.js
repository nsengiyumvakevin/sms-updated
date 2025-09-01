const db = require('../config/db');

// CRUD Subjects
exports.addSubject = (req,res)=>{
    const { title, teacher_id } = req.body;
    db.query('INSERT INTO subjects (title,teacher_id) VALUES (?,?)',[title,teacher_id],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Subject added', id: result.insertId });
    });
};

exports.updateSubject = (req,res)=>{
    const { id } = req.params;
    const { title } = req.body;
    db.query('UPDATE subjects SET title=? WHERE id=?',[title,id],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Subject updated' });
    });
};

exports.deleteSubject = (req,res)=>{
    const { id } = req.params;
    db.query('DELETE FROM subjects WHERE id=?',[id],(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json({ message:'Subject deleted' });
    });
};
