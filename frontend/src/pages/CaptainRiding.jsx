import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, { transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)' })
  }, [finishRidePanel])

  return (
    <div className='h-screen bg-[#09090F] relative overflow-hidden'>
      {/* Top bar */}
      <div className='absolute top-0 left-0 right-0 z-20 px-5 pt-6 flex items-center justify-between'>
        <div className='flex items-center gap-2 bg-[#09090F]/80 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/10'>
          <div className='w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center'>
            <i className='ri-steering-2-line text-black text-sm'></i>
          </div>
          <span className='text-white text-base font-bold tracking-tight'>UrbanLift</span>
        </div>
        <Link to='/captain-home' className='w-10 h-10 bg-[#09090F]/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10'>
          <i className='ri-logout-box-r-line text-white text-lg'></i>
        </Link>
      </div>

      {/* Map */}
      <div className='h-screen w-screen absolute top-0 z-[-1]'>
        <LiveTracking />
      </div>

      {/* Bottom action bar */}
      <div className='absolute bottom-0 left-0 right-0 z-20'>
        {/* Distance chip */}
        <div className='flex justify-center mb-3'>
          <div className='bg-[#09090F]/80 backdrop-blur-md border border-[#27272F] rounded-2xl px-5 py-2 flex items-center gap-2'>
            <i className='ri-navigation-line text-amber-400'></i>
            <span className='text-white text-sm font-semibold'>4 km away</span>
          </div>
        </div>

        <div
          className='bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 pt-4 pb-8 shadow-[0_-8px_40px_rgba(0,0,0,0.6)] cursor-pointer'
          onClick={() => setFinishRidePanel(true)}
        >
          <div className='panel-handle' />
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-white/40 text-xs mb-1'>Tap to complete</p>
              <h4 className='text-white text-lg font-bold'>Arriving at destination</h4>
            </div>
            <button
              className='bg-amber-400 text-black font-bold py-3 px-6 rounded-xl text-sm active:scale-[0.98] transition-transform flex items-center gap-2'
              onClick={(e) => { e.stopPropagation(); setFinishRidePanel(true) }}
            >
              <i className='ri-flag-line'></i>
              Complete
            </button>
          </div>
        </div>
      </div>

      {/* Finish ride panel */}
      <div ref={finishRidePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 py-6 shadow-[0_-8px_40px_rgba(0,0,0,0.8)]'>
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
