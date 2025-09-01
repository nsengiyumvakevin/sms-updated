import React, { useState } from 'react'
import API from '../services/api'
import { useNavigate } from 'react-router-dom'
import '../index.css'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      const {data} = await API.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      if (data.user.role === 'admin') navigate('/admin')
      else if (data.user.role === 'teacher') navigate('/teacher')
      else navigate('/student')
    }catch(err){
      alert(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 py-6 px-5 bg-green-500 rounded-2xl">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="w-full p-3 border text-xl rounded-xl" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-3 border text-xl rounded-xl" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" type="submit">Login</button>
      </form>
    </div>
  )
}
