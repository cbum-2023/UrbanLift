import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const captain = { email, password }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    setEmail(''); setPassword('')
  }

  return (
    <div className='min-h-screen bg-[#09090F] flex flex-col'>
      {/* Header */}
      <div className='px-7 pt-12 pb-4'>
        <Link to='/' className='flex items-center gap-2 w-fit'>
          <div className='w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center'>
            <i className='ri-steering-2-line text-black text-lg'></i>
          </div>
          <span className='text-white text-xl font-bold tracking-tight'>UrbanLift</span>
        </Link>
      </div>

      <div className='flex-1 px-7 pt-8'>
        {/* Captain badge */}
        <div className='inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-6'>
          <i className='ri-steering-2-line text-amber-400 text-sm'></i>
          <span className='text-amber-400 text-xs font-semibold uppercase tracking-wider'>Captain Portal</span>
        </div>

        <h2 className='text-white text-3xl font-bold mb-1'>Captain Login</h2>
        <p className='text-white/40 text-sm mb-8'>Ready to hit the road? Sign in.</p>

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
                placeholder='captain@example.com'
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

          <button className='w-full bg-amber-400 text-black font-bold py-4 rounded-xl text-base active:scale-[0.98] transition-transform mt-2'>
            Sign In as Captain
          </button>
        </form>

        <p className='text-center text-white/40 text-sm mt-6'>
          New captain?{' '}
          <Link to='/captain-signup' className='text-amber-400 font-semibold'>Register your fleet</Link>
        </p>
      </div>

      <div className='px-7 pb-10 pt-4'>
        <div className='h-px bg-[#27272F] mb-6' />
        <Link
          to='/login'
          className='flex items-center justify-center gap-3 w-full border border-[#27272F] bg-[#18181F] text-white font-semibold py-4 rounded-xl text-base active:scale-[0.98] transition-transform'
        >
          <i className='ri-user-line text-amber-400 text-xl'></i>
          <span>Sign in as Rider</span>
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin
