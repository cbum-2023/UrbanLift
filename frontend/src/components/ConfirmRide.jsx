import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
      <div className='panel-handle' />
      <div className='flex items-center justify-between mb-5'>
        <h3 className='text-white text-xl font-bold'>Confirm Ride</h3>
        <button
          onClick={() => props.setConfirmRidePanel(false)}
          className='w-8 h-8 bg-[#27272F] rounded-lg flex items-center justify-center'
        >
          <i className='ri-arrow-down-s-line text-white'></i>
        </button>
      </div>

      {/* Vehicle preview */}
      <div className='flex justify-center mb-5'>
        <img className='h-24 object-contain' src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg' alt='' />
      </div>

      {/* Trip details */}
      <div className='bg-[#18181F] rounded-2xl border border-[#27272F] overflow-hidden mb-4'>
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

      <button
        onClick={() => {
          props.setVehicleFound(true)
          props.setConfirmRidePanel(false)
          props.createRide()
        }}
        className='w-full bg-amber-400 text-black font-bold py-4 rounded-xl text-base active:scale-[0.98] transition-transform flex items-center justify-center gap-2'
      >
        <i className='ri-check-line'></i>
        Confirm Ride
      </button>
    </div>
  )
}

export default ConfirmRide
