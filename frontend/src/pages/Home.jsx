import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } })
  })

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setPickupSuggestions(response.data)
    } catch {}
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setDestinationSuggestions(response.data)
    } catch {}
  }

  const submitHandler = (e) => e.preventDefault()

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', padding: 24 })
      gsap.to(panelCloseRef.current, { opacity: 1 })
    } else {
      gsap.to(panelRef.current, { height: '0%', padding: 0 })
      gsap.to(panelCloseRef.current, { opacity: 0 })
    }
  }, [panelOpen])

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, { transform: vehiclePanel ? 'translateY(0)' : 'translateY(100%)' })
  }, [vehiclePanel])

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, { transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)' })
  }, [confirmRidePanel])

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, { transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)' })
  }, [vehicleFound])

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, { transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)' })
  }, [waitingForDriver])

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    setFare(response.data)
  }

  async function createRide() {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup, destination, vehicleType
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
  }

  return (
    <div className='h-screen relative overflow-hidden bg-[#09090F]'>
      {/* Logo overlay on map */}
      <div className='absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between'>
        <div className='flex items-center gap-2 bg-[#09090F]/80 backdrop-blur-md rounded-2xl px-3 py-2 border border-white/10'>
          <div className='w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center'>
            <i className='ri-car-fill text-black text-sm'></i>
          </div>
          <span className='text-white text-base font-bold tracking-tight'>UrbanLift</span>
        </div>
        <button className='w-10 h-10 bg-[#09090F]/80 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10'>
          <i className='ri-menu-line text-white text-lg'></i>
        </button>
      </div>

      {/* Map */}
      <div className='h-screen w-screen'>
        <LiveTracking />
      </div>

      {/* Bottom sheet */}
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none'>
        <div className='pointer-events-auto'>
          {/* Main search panel */}
          <div className='bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 pt-4 pb-5 relative shadow-[0_-8px_40px_rgba(0,0,0,0.6)]'>
            <div className='panel-handle' />
            <div className='flex items-center justify-between mb-4'>
              <h4 className='text-white text-xl font-bold'>Where to?</h4>
              <button
                ref={panelCloseRef}
                onClick={() => setPanelOpen(false)}
                className='opacity-0 w-8 h-8 bg-[#27272F] rounded-lg flex items-center justify-center'
              >
                <i className='ri-arrow-down-s-line text-white'></i>
              </button>
            </div>

            <form className='space-y-3' onSubmit={submitHandler}>
              {/* Route line indicator */}
              <div className='relative'>
                <div className='absolute left-[18px] top-[44px] w-px h-[calc(100%-44px)] bg-amber-400/40 z-10' />

                <div className='relative'>
                  <div className='absolute left-3 top-1/2 -translate-y-1/2 z-20 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#111118]' />
                  <input
                    onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
                    value={pickup}
                    onChange={handlePickupChange}
                    className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/30 rounded-xl px-4 py-3.5 pl-9 text-sm focus:outline-none focus:border-amber-400/40 transition-all'
                    type='text'
                    placeholder='Pickup location'
                  />
                </div>

                <div className='relative mt-2'>
                  <div className='absolute left-3 top-1/2 -translate-y-1/2 z-20 w-3 h-3 bg-white/80 rounded-sm rotate-45' />
                  <input
                    onClick={() => { setPanelOpen(true); setActiveField('destination') }}
                    value={destination}
                    onChange={handleDestinationChange}
                    className='w-full bg-[#18181F] border border-[#27272F] text-white placeholder:text-white/30 rounded-xl px-4 py-3.5 pl-9 text-sm focus:outline-none focus:border-amber-400/40 transition-all'
                    type='text'
                    placeholder='Where are you going?'
                  />
                </div>
              </div>
            </form>

            <button
              onClick={findTrip}
              className='w-full bg-amber-400 text-black font-bold py-4 rounded-xl text-base mt-4 active:scale-[0.98] transition-transform flex items-center justify-center gap-2'
            >
              <i className='ri-search-line'></i>
              Find a Ride
            </button>
          </div>

          {/* Suggestions panel */}
          <div ref={panelRef} className='bg-[#111118] h-0 overflow-y-auto'>
            <LocationSearchPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>
      </div>

      {/* Sliding panels */}
      <div ref={vehiclePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 py-6 shadow-[0_-8px_40px_rgba(0,0,0,0.6)]'>
        <VehiclePanel selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>
      <div ref={confirmRidePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 py-6 shadow-[0_-8px_40px_rgba(0,0,0,0.6)]'>
        <ConfirmRide createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={vehicleFoundRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 py-6 shadow-[0_-8px_40px_rgba(0,0,0,0.6)]'>
        <LookingForDriver createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setVehicleFound={setVehicleFound} />
      </div>
      <div ref={waitingForDriverRef} className='fixed w-full z-20 bottom-0 bg-[#111118] rounded-t-3xl border-t border-[#27272F] px-5 py-6 shadow-[0_-8px_40px_rgba(0,0,0,0.6)]'>
        <WaitingForDriver ride={ride} setVehicleFound={setVehicleFound} setWaitingForDriver={setWaitingForDriver} waitingForDriver={waitingForDriver} />
      </div>
    </div>
  )
}

export default Home
