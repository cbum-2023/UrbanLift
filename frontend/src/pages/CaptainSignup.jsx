import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const { setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email, password,
      vehicle: { color: vehicleColor, plate: vehiclePlate, capacity: vehicleCapacity, vehicleType },
    }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    setEmail(''); setFirstName(''); setLastName(''); setPassword('')
    setVehicleColor(''); setVehiclePlate(''); setVehicleCapacity(''); setVehicleType('')
  }

  const inputClass = 'w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all'
  const labelClass = 'text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block'

  return (
    <div className='min-h-screen bg-[#09090F] flex flex-col'>
      <div className='px-7 pt-12 pb-4'>
        <Link to='/' className='flex items-center gap-2 w-fit'>
          <div className='w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center'>
            <i className='ri-steering-2-line text-black text-lg'></i>
          </div>
          <span className='text-white text-xl font-bold tracking-tight'>UrbanLift</span>
        </Link>
      </div>

      <div className='flex-1 px-7 pt-6 overflow-y-auto pb-8'>
        <div className='inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-6'>
          <i className='ri-steering-2-line text-amber-400 text-sm'></i>
          <span className='text-amber-400 text-xs font-semibold uppercase tracking-wider'>Captain Registration</span>
        </div>

        <h2 className='text-white text-3xl font-bold mb-1'>Join the fleet</h2>
        <p className='text-white/40 text-sm mb-8'>Start earning with UrbanLift today</p>

        <form onSubmit={submitHandler} className='space-y-5'>
          {/* Personal Info */}
          <div>
            <label className={labelClass}>Full Name</label>
            <div className='flex gap-3'>
              <input required value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className='w-1/2 bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                type='text' placeholder='First' />
              <input required value={lastName} onChange={(e) => setLastName(e.target.value)}
                className='w-1/2 bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                type='text' placeholder='Last' />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email Address</label>
            <div className='relative'>
              <i className='ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg'></i>
              <input required value={email} onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 pl-11 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                type='email' placeholder='you@example.com' />
            </div>
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <div className='relative'>
              <i className='ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg'></i>
              <input required value={password} onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 pl-11 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                type='password' placeholder='Min. 8 characters' />
            </div>
          </div>

          {/* Vehicle Section */}
          <div className='pt-2'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='h-px flex-1 bg-[#27272F]' />
              <span className='text-white/40 text-xs font-semibold uppercase tracking-wider px-2'>Vehicle Details</span>
              <div className='h-px flex-1 bg-[#27272F]' />
            </div>

            <div className='space-y-4'>
              <div className='flex gap-3'>
                <div className='w-1/2'>
                  <label className={labelClass}>Color</label>
                  <input required value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)}
                    className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                    type='text' placeholder='e.g. Black' />
                </div>
                <div className='w-1/2'>
                  <label className={labelClass}>Plate No.</label>
                  <input required value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)}
                    className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                    type='text' placeholder='MH 01 AB 1234' />
                </div>
              </div>

              <div className='flex gap-3'>
                <div className='w-1/2'>
                  <label className={labelClass}>Capacity</label>
                  <input required value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)}
                    className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all'
                    type='number' placeholder='4' />
                </div>
                <div className='w-1/2'>
                  <label className={labelClass}>Type</label>
                  <select required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
                    className='w-full bg-[#18181F] border border-[#27272F] text-white rounded-xl px-4 py-4 text-base focus:outline-none focus:border-amber-400/50 transition-all appearance-none'>
                    <option value='' disabled className='text-white/20'>Select</option>
                    <option value='car' className='text-white bg-[#18181F]'>Car</option>
                    <option value='auto' className='text-white bg-[#18181F]'>Auto</option>
                    <option value='moto' className='text-white bg-[#18181F]'>Moto</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button className='w-full bg-amber-400 text-black font-bold py-4 rounded-xl text-base active:scale-[0.98] transition-transform'>
            Create Captain Account
          </button>
        </form>

        <p className='text-center text-white/40 text-sm mt-6'>
          Already registered?{' '}
          <Link to='/captain-login' className='text-amber-400 font-semibold'>Sign in</Link>
        </p>

        <p className='text-white/20 text-[10px] text-center mt-4 leading-relaxed'>
          Protected by reCAPTCHA — <span className='underline'>Privacy Policy</span> &{' '}
          <span className='underline'>Terms of Service</span> apply.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
