import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <div className='panel-handle' />

      {/* Header with amber badge */}
      <div className='flex items-center gap-3 mb-5'>
        <div className='w-10 h-10 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-center justify-center'>
          <i className='ri-notification-3-line text-amber-400'></i>
        </div>
        <div>
          <h3 className='text-white text-xl font-bold leading-tight'>New Ride Request</h3>
          <p className='text-white/40 text-xs'>Accept within 30 seconds</p>
        </div>
      </div>

      {/* Rider info */}
      <div className='flex items-center justify-between bg-amber-400/5 border border-amber-400/20 rounded-2xl p-4 mb-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 w-12 rounded-xl object-cover' src='https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg' alt='' />
          <div>
            <h2 className='text-white font-semibold capitalize'>
              {props.ride?.user.fullname.firstname} {props.ride?.user.fullname.lastname}
            </h2>
            <div className='flex items-center gap-1 mt-0.5'>
              <i className='ri-star-fill text-amber-400 text-xs'></i>
              <span className='text-white/40 text-xs'>4.8 · Rider</span>
            </div>
          </div>
        </div>
        <div className='text-right'>
          <div className='bg-[#27272F] rounded-xl px-3 py-1.5'>
            <p className='text-white/40 text-xs'>Distance</p>
            <h5 className='text-white font-bold text-sm'>2.2 km</h5>
          </div>
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

      {/* Action buttons */}
      <div className='flex gap-3'>
        <button
          onClick={() => props.setRidePopupPanel(false)}
          className='flex-1 bg-[#27272F] text-white/60 font-semibold py-4 rounded-xl text-base active:scale-[0.98] transition-transform'
        >
          Ignore
        </button>
        <button
          onClick={() => {
            props.setConfirmRidePopupPanel(true)
            props.confirmRide()
          }}
          className='flex-[2] bg-amber-400 text-black font-bold py-4 rounded-xl text-base active:scale-[0.98] transition-transform flex items-center justify-center gap-2'
        >
          <i className='ri-check-line'></i>
          Accept Ride
        </button>
      </div>
    </div>
  )
}

export default RidePopUp
