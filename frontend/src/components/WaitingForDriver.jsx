import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <div className='panel-handle' />
      <h3 className='text-white text-xl font-bold mb-4'>Captain on the way!</h3>

      {/* Captain info */}
      <div className='flex items-center justify-between bg-[#18181F] border border-[#27272F] rounded-2xl p-4 mb-4'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <img
              className='h-14 w-14 rounded-xl object-cover'
              src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg'
              alt=''
            />
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#18181F]' />
          </div>
          <div>
            <h2 className='text-white font-semibold capitalize'>
              {props.ride?.captain.fullname.firstname} {props.ride?.captain.fullname.lastname}
            </h2>
            <p className='text-white/40 text-xs'>Your Captain</p>
          </div>
        </div>
        <div className='text-right'>
          <h4 className='text-white text-base font-bold tracking-wider'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-white/40 text-xs'>Maruti Suzuki</p>
        </div>
      </div>

      {/* OTP */}
      <div className='bg-amber-400/10 border border-amber-400/30 rounded-2xl p-4 mb-4 flex items-center justify-between'>
        <div>
          <p className='text-amber-400/70 text-xs font-semibold uppercase tracking-wider mb-0.5'>Share this OTP</p>
          <p className='text-white/50 text-xs'>Give this to your captain to start the ride</p>
        </div>
        <div className='text-right'>
          <h1 className='text-amber-400 text-3xl font-bold tracking-widest'>{props.ride?.otp}</h1>
        </div>
      </div>

      {/* Trip details */}
      <div className='bg-[#18181F] rounded-2xl border border-[#27272F] overflow-hidden'>
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
    </div>
  )
}

export default WaitingForDriver
