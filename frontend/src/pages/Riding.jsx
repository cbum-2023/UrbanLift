import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  socket.on('ride-ended', () => navigate('/home'))

  return (
    <div className='h-screen bg-[#09090F] relative overflow-hidden'>
      {/* Home button */}
      <div className='absolute top-5 right-5 z-20'>
        <Link to='/home' className='w-11 h-11 bg-[#111118]/90 backdrop-blur-md border border-[#27272F] flex items-center justify-center rounded-2xl'>
          <i className='ri-home-5-line text-white text-lg'></i>
        </Link>
      </div>

      {/* Map */}
      <div className='h-[52%] relative'>
        <LiveTracking />
        {/* Status badge */}
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 text-black text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5'>
          <span className='w-1.5 h-1.5 bg-black rounded-full animate-pulse'></span>
          Ride in progress
        </div>
      </div>

      {/* Ride info panel */}
      <div className='h-[48%] bg-[#111118] rounded-t-3xl border-t border-[#27272F] overflow-y-auto'>
        <div className='px-5 pt-5 pb-6'>
          <div className='panel-handle' />

          {/* Captain info */}
          <div className='flex items-center justify-between mb-5 bg-[#18181F] rounded-2xl p-4 border border-[#27272F]'>
            <div className='flex items-center gap-3'>
              <div className='relative'>
                <img
                  className='h-12 w-12 rounded-xl object-cover'
                  src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'
                  alt=''
                />
                <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#18181F]' />
              </div>
              <div>
                <h2 className='text-white text-base font-semibold capitalize'>
                  {ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname}
                </h2>
                <p className='text-white/40 text-xs'>Your Captain</p>
              </div>
            </div>
            <div className='text-right'>
              <h4 className='text-white text-lg font-bold tracking-wider'>{ride?.captain.vehicle.plate}</h4>
              <p className='text-white/40 text-xs'>Maruti Suzuki Alto</p>
            </div>
          </div>

          {/* Trip details */}
          <div className='space-y-0 bg-[#18181F] rounded-2xl border border-[#27272F] overflow-hidden'>
            <div className='flex items-center gap-4 p-4 border-b border-[#27272F]'>
              <div className='w-9 h-9 bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0'>
                <i className='ri-map-pin-2-fill text-amber-400'></i>
              </div>
              <div className='min-w-0'>
                <p className='text-white/40 text-xs mb-0.5'>Destination</p>
                <p className='text-white text-sm font-medium truncate'>{ride?.destination}</p>
              </div>
            </div>
            <div className='flex items-center gap-4 p-4'>
              <div className='w-9 h-9 bg-green-400/10 rounded-xl flex items-center justify-center flex-shrink-0'>
                <i className='ri-currency-line text-green-400'></i>
              </div>
              <div>
                <p className='text-white/40 text-xs mb-0.5'>Fare</p>
                <p className='text-white text-lg font-bold'>₹{ride?.fare}</p>
              </div>
              <span className='ml-auto text-white/30 text-xs bg-[#27272F] rounded-lg px-2 py-1'>Cash</span>
            </div>
          </div>

          <button className='w-full mt-4 bg-amber-400 text-black font-bold py-4 rounded-xl text-base active:scale-[0.98] transition-transform flex items-center justify-center gap-2'>
            <i className='ri-secure-payment-line'></i>
            Make a Payment
          </button>
        </div>
      </div>
    </div>
  )
}

export default Riding
