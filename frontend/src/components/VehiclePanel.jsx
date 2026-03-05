import React from 'react'

const vehicles = [
  {
    type: 'car',
    name: 'UrbanGo',
    capacity: 4,
    eta: '2 mins',
    desc: 'Comfortable & affordable',
    img: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
    icon: 'ri-car-line',
  },
  {
    type: 'moto',
    name: 'Moto',
    capacity: 1,
    eta: '3 mins',
    desc: 'Fastest through traffic',
    img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
    icon: 'ri-motorbike-line',
  },
  {
    type: 'auto',
    name: 'AutoRide',
    capacity: 3,
    eta: '3 mins',
    desc: 'Budget-friendly auto',
    img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
    icon: 'ri-taxi-line',
  },
]

const VehiclePanel = (props) => {
  return (
    <div>
      {/* Handle */}
      <div className='panel-handle' />
      <div className='flex items-center justify-between mb-5'>
        <h3 className='text-white text-xl font-bold'>Choose a ride</h3>
        <button
          onClick={() => props.setVehiclePanel(false)}
          className='w-8 h-8 bg-[#27272F] rounded-lg flex items-center justify-center'
        >
          <i className='ri-arrow-down-s-line text-white'></i>
        </button>
      </div>

      <div className='space-y-3'>
        {vehicles.map((v) => (
          <div
            key={v.type}
            onClick={() => {
              props.setConfirmRidePanel(true)
              props.selectVehicle(v.type)
            }}
            className='flex items-center gap-4 bg-[#18181F] border border-[#27272F] rounded-2xl p-4 active:border-amber-400/50 active:bg-amber-400/5 transition-all cursor-pointer group'
          >
            <img className='h-12 w-16 object-contain flex-shrink-0' src={v.img} alt={v.name} />
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <h4 className='text-white font-semibold text-base'>{v.name}</h4>
                <span className='text-white/30 text-xs flex items-center gap-1'>
                  <i className='ri-user-3-fill text-xs'></i>{v.capacity}
                </span>
              </div>
              <div className='flex items-center gap-2 mt-0.5'>
                <span className='text-green-400 text-xs font-medium flex items-center gap-1'>
                  <i className='ri-time-line'></i>{v.eta}
                </span>
                <span className='text-white/20 text-xs'>·</span>
                <span className='text-white/40 text-xs'>{v.desc}</span>
              </div>
            </div>
            <div className='text-right flex-shrink-0'>
              <h2 className='text-white text-lg font-bold'>₹{props.fare[v.type]}</h2>
              <p className='text-white/30 text-xs'>cash</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VehiclePanel
