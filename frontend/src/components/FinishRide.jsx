import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate = useNavigate()

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: props.ride._id
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    if (response.status === 200) navigate('/captain-home')
  }

  return (
    <div>
      <div className='panel-handle' />
      <div className='flex items-center gap-3 mb-5'>
        <div className='w-10 h-10 bg-green-400/10 border border-green-400/30 rounded-xl flex items-center justify-center'>
          <i className='ri-flag-line text-green-400'></i>
        </div>
        <div>
          <h3 className='text-white text-xl font-bold leading-tight'>Finish Ride</h3>
          <p className='text-white/40 text-xs'>Confirm to complete this trip</p>
        </div>
      </div>

      {/* Rider card */}
      <div className='flex items-center justify-between bg-[#18181F] border border-[#27272F] rounded-2xl p-4 mb-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-xl object-cover' src='https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg' alt='' />
          <div>
            <h2 className='text-white font-semibold capitalize'>{props.ride?.user.fullname.firstname}</h2>
            <p className='text-white/40 text-xs'>Passenger</p>
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
            <p className='text-white/40 text-xs mb-0.5'>Fare Collected</p>
            <p className='text-white text-lg font-bold'>₹{props.ride?.fare}</p>
          </div>
          <span className='ml-auto text-white/30 text-xs bg-[#27272F] rounded-lg px-2 py-1'>Cash</span>
        </div>
      </div>

      <button
        onClick={endRide}
        className='w-full bg-amber-400 text-black font-bold py-4 rounded-xl text-base active:scale-[0.98] transition-transform flex items-center justify-center gap-2'
      >
        <i className='ri-check-double-line'></i>
        Complete Ride
      </button>
    </div>
  )
}

export default FinishRide
