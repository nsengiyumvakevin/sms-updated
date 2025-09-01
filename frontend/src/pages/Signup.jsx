import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import '../index.css'

export default function Signup(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [role,setRole]=useState('student')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      await API.post('/auth/signup', { name, email, password, role })
      alert('Registered. Please login')
      navigate('/login')
    }catch(err){
      alert(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-green-500 rounded-xl">
      <h2 className="text-xl mb-4">Signup</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="w-full p-2 border text-xl rounded-xl" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-2 border text-xl rounded-xl" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 border text-xl rounded-xl" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border text-xl rounded-xl">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded" type="submit">Signup</button>
      </form>
    </div>
  )
}
