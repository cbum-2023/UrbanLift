import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)
  const [ride, setRide] = useState(null)
  const [isOnline, setIsOnline] = useState(true)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    socket.emit('join', { userId: captain._id, userType: 'captain' })
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: { ltd: position.coords.latitude, lng: position.coords.longitude }
          })
        })
      }
    }
    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()
  }, [])

  socket.on('new-ride', (data) => {
    setRide(data)
    setRidePopupPanel(true)
  })

  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, { transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)' })
  }, [ridePopupPanel])

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, { transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)' })
  }, [confirmRidePopupPanel])

  return (
    <div className='h-screen bg-[#09090F] relative overflow-hidden'>
      {/* Top bar */}
      <div className='fixed top-0 left-0 right-0 z-20 px-5 pt-6 pb-3 flex items-center justify-between'>
        <div className='flex items-center gap-2 bg-[#09090F]/80 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/10'>
          <div className='w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center'>
            <i className='ri-steering-2-line text-black text-sm'></i>
          </div>
          <span className='text-white text-base font-bold tracking-tight'>UrbanLift</span>
        </div>
        <div className='flex items-center gap-2'>
          {/* Online toggle */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 rounded-2xl px-3 py-2 border backdrop-blur-md text-xs font-bold transition-all ${isOnline ? 'bg-green-400/10 border-green-400/30 text-green-400' : 'bg-[#09090F]/80 border-white/10 text-white/40'}`}
          >
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-white/20'}`} />
            {isOnline ? 'Online' : 'Offline'}
          </button>
          <Link to='/captain-home' className='w-10 h-10 bg-[#09090F]/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10'>
            <i className='ri-logout-box-r-line text-white text-lg'></i>
          </Link>
        </div>
      </div>

      {/* Map */}
      <div className='h-[58%]'>
        <img className='h-full w-full object-cover' src='https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif' alt='' />
      </div>

      {/* Captain details panel */}
      <div className='h-[42%] bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 pt-4 pb-6 overflow-y-auto shadow-[0_-8px_40px_rgba(0,0,0,0.6)]'>
        <div className='panel-handle' />
        <CaptainDetails />
      </div>

      {/* Ride popup */}
      <div ref={ridePopupPanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 py-6 shadow-[0_-8px_40px_rgba(0,0,0,0.8)]'>
        <RidePopUp ride={ride} setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel} confirmRide={confirmRide} />
      </div>

      {/* Confirm ride popup */}
      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-30 bottom-0 translate-y-full bg-[#111118] px-5 py-6 overflow-y-auto'>
        <ConfirmRidePopUp ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
    </div>
  )
}

export default CaptainHome
