import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function StudentDashboard(){
  const [subjects,setSubjects] = useState([])
  useEffect(()=>{
    API.get('/student/subjects').then(r=>setSubjects(r.data)).catch(()=>{})
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl">Student Dashboard</h2>
      <ul className="mt-4">
        {subjects.map(s=> (
          <li key={s.id} className="p-3 border my-1">
            <div className="font-bold">{s.title} <span className="text-sm text-gray-600">— {s.teacher_name || 'Unknown'}</span></div>
            <div>{s.description}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
