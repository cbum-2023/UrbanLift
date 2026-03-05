import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = { email, password }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)
    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail('')
    setPassword('')
  }

  return (
    <div className='min-h-screen bg-[#09090F] flex flex-col'>
      {/* Header */}
      <div className='px-7 pt-12 pb-4'>
        <Link to='/' className='flex items-center gap-2 w-fit'>
          <div className='w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center'>
            <i className='ri-car-fill text-black text-lg'></i>
          </div>
          <span className='text-white text-xl font-bold tracking-tight'>UrbanLift</span>
        </Link>
      </div>

      {/* Form area */}
      <div className='flex-1 px-7 pt-8'>
        <h2 className='text-white text-3xl font-bold mb-1'>Welcome back</h2>
        <p className='text-white/40 text-sm mb-8'>Sign in to continue your journey</p>

        <form onSubmit={submitHandler} className='space-y-4'>
          <div>
            <label className='text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block'>Email Address</label>
            <div className='relative'>
              <i className='ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg'></i>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 pl-11 text-base focus:outline-none focus:border-amber-400/50 focus:bg-[#1E1E28] transition-all'
                type='email'
                placeholder='you@example.com'
              />
            </div>
          </div>

          <div>
            <label className='text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block'>Password</label>
            <div className='relative'>
              <i className='ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg'></i>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 pl-11 text-base focus:outline-none focus:border-amber-400/50 focus:bg-[#1E1E28] transition-all'
                type='password'
                placeholder='••••••••'
              />
            </div>
          </div>

          <button className='w-full bg-amber-400 text-black font-bold py-4 rounded-xl text-base mt-2 active:scale-[0.98] transition-transform'>
            Sign In
          </button>
        </form>

        <p className='text-center text-white/40 text-sm mt-6'>
          New here?{' '}
          <Link to='/signup' className='text-amber-400 font-semibold'>Create an account</Link>
        </p>
      </div>

      {/* Captain switch */}
      <div className='px-7 pb-10 pt-4'>
        <div className='h-px bg-[#27272F] mb-6' />
        <Link
          to='/captain-login'
          className='flex items-center justify-center gap-3 w-full border border-[#27272F] bg-[#18181F] text-white font-semibold py-4 rounded-xl text-base active:scale-[0.98] transition-transform'
        >
          <i className='ri-steering-2-line text-amber-400 text-xl'></i>
          <span>Sign in as Captain</span>
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
