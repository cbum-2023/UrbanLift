import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: { rideId: props.ride._id, otp },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false)
      props.setRidePopupPanel(false)
      navigate('/captain-riding', { state: { ride: props.ride } })
    }
  }

  return (
    <div className='min-h-screen bg-[#111118]'>
      <div className='panel-handle pt-4' />

      <div className='px-1 pt-2'>
        <h3 className='text-white text-xl font-bold mb-1'>Start this ride</h3>
        <p className='text-white/40 text-sm mb-5'>Verify the passenger's OTP to begin</p>

        {/* Rider card */}
        <div className='flex items-center justify-between bg-amber-400/5 border border-amber-400/20 rounded-2xl p-4 mb-5'>
          <div className='flex items-center gap-3'>
            <img className='h-12 w-12 rounded-xl object-cover' src='https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg' alt='' />
            <div>
              <h2 className='text-white font-semibold capitalize'>{props.ride?.user.fullname.firstname}</h2>
              <div className='flex items-center gap-1 mt-0.5'>
                <i className='ri-star-fill text-amber-400 text-xs'></i>
                <span className='text-white/40 text-xs'>4.8 · Rider</span>
              </div>
            </div>
          </div>
          <div className='bg-[#27272F] rounded-xl px-3 py-1.5 text-right'>
            <p className='text-white/40 text-xs'>Distance</p>
            <h5 className='text-white font-bold text-sm'>2.2 km</h5>
          </div>
        </div>

        {/* Trip details */}
        <div className='bg-[#18181F] rounded-2xl border border-[#27272F] overflow-hidden mb-5'>
          <div className='flex items-center gap-4 p-4 border-b border-[#27272F]'>
            <div className='w-9 h-9 bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0'>
              <i className='ri-map-pin-user-fill text-amber-400 text-sm'></i>
            </div>
            <div className='min-w-0'>
              <p className='text-white/40 text-xs mb-0.5'>Pickup</p>
              <p className='text-white text-sm font-medium truncate'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4 border-b border-[#27272F]'>
            <div className='w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0'>
              <i className='ri-map-pin-2-fill text-white/60 text-sm'></i>
            </div>
            <div className='min-w-0'>
              <p className='text-white/40 text-xs mb-0.5'>Destination</p>
              <p className='text-white text-sm font-medium truncate'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4'>
            <div className='w-9 h-9 bg-green-400/10 rounded-xl flex items-center justify-center flex-shrink-0'>
              <i className='ri-currency-line text-green-400 text-sm'></i>
            </div>
            <div>
              <p className='text-white/40 text-xs mb-0.5'>Fare</p>
              <p className='text-white text-lg font-bold'>₹{props.ride?.fare}</p>
            </div>
            <span className='ml-auto text-white/30 text-xs bg-[#27272F] rounded-lg px-2 py-1'>Cash</span>
          </div>
        </div>

        {/* OTP input */}
        <form onSubmit={submitHandler}>
          <div className='mb-4'>
            <label className='text-white/60 text-xs font-semibold uppercase tracking-wider mb-2 block'>Enter Passenger OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type='text'
              maxLength={6}
              className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/20 rounded-xl px-5 py-4 text-2xl font-bold tracking-[0.3em] text-center focus:outline-none focus:border-amber-400/50 transition-all'
              placeholder='- - - - - -'
            />
          </div>

          <button className='w-full bg-amber-400 text-black font-bold py-4 rounded-xl text-base active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mb-3'>
            <i className='ri-car-fill'></i>
            Start Ride
          </button>

          <button
            type='button'
            onClick={() => {
              props.setConfirmRidePopupPanel(false)
              props.setRidePopupPanel(false)
            }}
            className='w-full bg-[#27272F] text-white/60 font-semibold py-4 rounded-xl text-base active:scale-[0.98] transition-transform'
          >
            Cancel Ride
          </button>
        </form>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp
