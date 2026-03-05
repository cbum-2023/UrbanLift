import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <div className='panel-handle' />
      <div className='flex items-center justify-between mb-5'>
        <h3 className='text-white text-xl font-bold'>Finding your captain</h3>
        <button
          onClick={() => props.setVehicleFound(false)}
          className='w-8 h-8 bg-[#27272F] rounded-lg flex items-center justify-center'
        >
          <i className='ri-close-line text-white'></i>
        </button>
      </div>

      {/* Animated search indicator */}
      <div className='flex justify-center py-4 mb-4'>
        <div className='relative w-24 h-24'>
          {/* Pulse rings */}
          <div className='absolute inset-0 rounded-full border-2 border-amber-400/30 pulse-ring' />
          <div className='absolute inset-2 rounded-full border-2 border-amber-400/20 pulse-ring' style={{ animationDelay: '0.4s' }} />
          {/* Center */}
          <div className='absolute inset-4 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center'>
            <i className='ri-car-fill text-amber-400 text-2xl'></i>
          </div>
        </div>
      </div>

      <p className='text-white/40 text-sm text-center mb-5'>Connecting you with the nearest captain...</p>

      {/* Trip details */}
      <div className='bg-[#18181F] rounded-2xl border border-[#27272F] overflow-hidden'>
        <div className='flex items-center gap-4 p-4 border-b border-[#27272F]'>
          <div className='w-9 h-9 bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0'>
            <i className='ri-map-pin-user-fill text-amber-400 text-sm'></i>
          </div>
          <div className='min-w-0'>
            <p className='text-white/40 text-xs mb-0.5'>Pickup</p>
            <p className='text-white text-sm font-medium truncate'>{props.pickup}</p>
          </div>
        </div>
        <div className='flex items-center gap-4 p-4 border-b border-[#27272F]'>
          <div className='w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0'>
            <i className='ri-map-pin-2-fill text-white/60 text-sm'></i>
          </div>
          <div className='min-w-0'>
            <p className='text-white/40 text-xs mb-0.5'>Destination</p>
            <p className='text-white text-sm font-medium truncate'>{props.destination}</p>
          </div>
        </div>
        <div className='flex items-center gap-4 p-4'>
          <div className='w-9 h-9 bg-green-400/10 rounded-xl flex items-center justify-center flex-shrink-0'>
            <i className='ri-currency-line text-green-400 text-sm'></i>
          </div>
          <div>
            <p className='text-white/40 text-xs mb-0.5'>Total Fare</p>
            <p className='text-white text-lg font-bold'>₹{props.fare[props.vehicleType]}</p>
          </div>
          <span className='ml-auto text-white/30 text-xs bg-[#27272F] rounded-lg px-2 py-1'>Cash</span>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver
