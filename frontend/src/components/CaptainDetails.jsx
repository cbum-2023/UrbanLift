import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  const stats = [
    { icon: 'ri-timer-2-line', value: '10.2', label: 'Hrs Online', color: 'text-amber-400' },
    { icon: 'ri-speed-up-line', value: '8.5', label: 'Avg Speed', color: 'text-blue-400' },
    { icon: 'ri-booklet-line', value: '12', label: 'Rides Today', color: 'text-green-400' },
  ]

  return (
    <div>
      {/* Captain profile row */}
      <div className='flex items-center justify-between mb-5'>
        <div className='flex items-center gap-3'>
          <div className='relative'>
            <img
              className='h-13 w-13 rounded-xl object-cover border-2 border-amber-400/30'
              style={{ width: '52px', height: '52px' }}
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s'
              alt=''
            />
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#111118]' />
          </div>
          <div>
            <h4 className='text-white font-semibold capitalize'>
              {captain.fullname.firstname} {captain.fullname.lastname}
            </h4>
            <div className='flex items-center gap-1.5 mt-0.5'>
              <i className='ri-star-fill text-amber-400 text-xs'></i>
              <span className='text-white/40 text-xs'>4.9 · Top Captain</span>
            </div>
          </div>
        </div>
        <div className='text-right bg-[#18181F] rounded-2xl px-4 py-2 border border-[#27272F]'>
          <h4 className='text-white text-xl font-bold'>₹295</h4>
          <p className='text-green-400 text-xs font-medium'>Earned today</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className='grid grid-cols-3 gap-3'>
        {stats.map((stat, i) => (
          <div key={i} className='bg-[#18181F] border border-[#27272F] rounded-2xl p-3.5 text-center'>
            <i className={`${stat.icon} ${stat.color} text-2xl mb-1.5 block`}></i>
            <h5 className='text-white text-lg font-bold leading-tight'>{stat.value}</h5>
            <p className='text-white/30 text-xs mt-0.5'>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaptainDetails
