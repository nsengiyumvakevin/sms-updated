const db = require('../config/db');

// View subjects
exports.viewSubjects = (req,res)=>{
    db.query('SELECT subjects.id, subjects.title, teachers.name AS teacher FROM subjects JOIN teachers ON subjects.teacher_id = teachers.id',(err,result)=>{
        if(err) return res.status(500).json(err);
        res.json(result);
    });
};
