import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if (response.status === 201) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    setEmail(''); setFirstName(''); setLastName(''); setPassword('')
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

      <div className='flex-1 px-7 pt-6 overflow-y-auto pb-6'>
        <h2 className='text-white text-3xl font-bold mb-1'>Create account</h2>
        <p className='text-white/40 text-sm mb-8'>Join UrbanLift and start riding today</p>

        <form onSubmit={submitHandler} className='space-y-4'>
          {/* Name row */}
          <div>
            <label className='text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block'>Full Name</label>
            <div className='flex gap-3'>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='w-1/2 bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                type='text'
                placeholder='First'
              />
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='w-1/2 bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                type='text'
                placeholder='Last'
              />
            </div>
          </div>

          <div>
            <label className='text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block'>Email Address</label>
            <div className='relative'>
              <i className='ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg'></i>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 pl-11 text-base focus:outline-none focus:border-amber-400/50 transition-all'
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
                className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 pl-11 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                type='password'
                placeholder='Min. 8 characters'
              />
            </div>
          </div>

          <button className='w-full bg-amber-400 text-black font-bold py-4 rounded-xl text-base active:scale-[0.98] transition-transform mt-2'>
            Create Account
          </button>
        </form>

        <p className='text-center text-white/40 text-sm mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='text-amber-400 font-semibold'>Sign in</Link>
        </p>

        <p className='text-white/20 text-[10px] text-center mt-6 leading-relaxed'>
          By creating an account, you agree to our{' '}
          <span className='underline'>Terms of Service</span> and{' '}
          <span className='underline'>Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}

export default UserSignup
