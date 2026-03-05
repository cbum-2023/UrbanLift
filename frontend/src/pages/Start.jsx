import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='relative h-screen w-full overflow-hidden bg-[#09090F]'>
      {/* Hero background with dark overlay */}
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop)`,
        }}
      />
      {/* Gradient overlays */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/95' />
      <div className='absolute inset-0 bg-gradient-to-t from-[#09090F] via-transparent to-transparent' />

      {/* Logo */}
      <div className='relative z-10 pt-12 px-7'>
        <div className='flex items-center gap-2'>
          <div className='w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center'>
            <i className='ri-car-fill text-black text-lg'></i>
          </div>
          <span className='text-white text-2xl font-bold tracking-tight'>UrbanLift</span>
        </div>
      </div>

      {/* Bottom content */}
      <div className='absolute bottom-0 left-0 right-0 z-10 px-7 pb-12'>
        <div className='mb-8'>
          <p className='text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3'>Your city. Your ride.</p>
          <h1 className='text-white text-5xl font-bold leading-tight'>
            Move<br />smarter.<br />
            <span className='text-amber-400'>Always.</span>
          </h1>
          <p className='text-white/50 text-base mt-4 leading-relaxed'>
            Fast, reliable rides at your fingertips — anytime, anywhere in the city.
          </p>
        </div>

        <Link
          to='/login'
          className='flex items-center justify-between w-full bg-amber-400 text-black font-bold py-4 px-6 rounded-2xl text-lg group'
        >
          <span>Get Started</span>
          <div className='w-8 h-8 bg-black/10 rounded-xl flex items-center justify-center group-hover:bg-black/20 transition-colors'>
            <i className='ri-arrow-right-line text-black'></i>
          </div>
        </Link>

        <p className='text-white/30 text-xs text-center mt-5'>
          By continuing, you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default Start
