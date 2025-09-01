import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function AdminDashboard(){
  const [users,setUsers]=useState([])
  const [form,setForm]=useState({name:'',email:'',role:'student',password:''})

  async function fetchUsers(){
    const {data} = await API.get('/admin/users')
    setUsers(data)
  }
  useEffect(()=>{ fetchUsers() }, [])

  async function create(){
    try{
      await API.post('/admin/user', form)
      setForm({name:'',email:'',role:'student',password:''})
      fetchUsers()
    }catch(e){ alert(e.response?.data?.message || 'Error') }
  }

  async function remove(id){
    if(!confirm('Delete?')) return
    await API.delete('/admin/user/'+id)
    fetchUsers()
  }

  return (
    <div className="p-4">
      <h2 className="text-xl">Admin Dashboard</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <h3>Create user</h3>
          <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 border" placeholder="Name" />
          <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 border" placeholder="Email" />
          <input value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full p-2 border" placeholder="Password (optional)" />
          <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})} className="w-full p-2 border">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={create} className="mt-2 px-4 py-2 bg-blue-500 text-white">Create</button>
        </div>

        <div>
          <h3>Users</h3>
          <ul>
            {users.map(u => (
              <li key={u.id} className="flex justify-between p-2 border my-1">
                <div>{u.name} — {u.email} — {u.role}</div>
                <div><button onClick={()=>remove(u.id)} className="text-red-500">Delete</button></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
