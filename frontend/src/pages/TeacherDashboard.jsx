import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function TeacherDashboard(){
  const [title,setTitle]=useState('')
  const [desc,setDesc]=useState('')
  const [subjects,setSubjects]=useState([])

  async function fetchSubjects(){
    const {data} = await API.get('/student/subjects')
    // filter to show teacher's own subjects if desired; here we show all but delete/update will be blocked server-side if not owner
    setSubjects(data)
  }
  useEffect(()=>{ fetchSubjects() }, [])

  async function create(){
    try{
      await API.post('/teacher/subject',{title,description:desc})
      setTitle(''); setDesc(''); fetchSubjects()
    }catch(e){ alert(e.response?.data?.message || 'Error') }
  }

  async function del(id){
    if(!confirm('Delete?')) return
    try{
      await API.delete('/teacher/subject/'+id)
      fetchSubjects()
    }catch(e){ alert(e.response?.data?.message || 'Error') }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl">Teacher Dashboard</h2>
      <div className="mt-4 p-2">
        <h3>Create Subject</h3>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded-xl" placeholder="Title" /><br/>
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} className="w-full p-2 border rounded-xl" placeholder="Description" />
        <button onClick={create} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Create</button>
      </div>

      <div className="mt-6">
        <h3>Your Subjects</h3>
        <ul>
          {subjects.map(s=> (
            <li key={s.id} className="p-2 border my-1 flex justify-between">
              <div>
                <div className="font-bold">{s.title}</div>
                <div className="text-sm">{s.description}</div>
                <div className="text-xs text-gray-600">Teacher: {s.teacher_name || 'Unknown'}</div>
              </div>
              <div>
                <button onClick={()=>del(s.id)} className="text-red-500">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
