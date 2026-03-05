import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') setPickup(suggestion)
    else if (activeField === 'destination') setDestination(suggestion)
  }

  return (
    <div className='px-5 pb-4'>
      {suggestions.length === 0 && (
        <div className='flex flex-col items-center py-10 text-white/20'>
          <i className='ri-map-pin-line text-4xl mb-2'></i>
          <p className='text-sm'>Start typing to search locations</p>
        </div>
      )}
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem)}
          className='flex items-center gap-4 p-3.5 rounded-xl mb-2 active:bg-[#27272F] transition-colors cursor-pointer group'
        >
          <div className='w-9 h-9 bg-[#27272F] group-active:bg-amber-400/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors'>
            <i className='ri-map-pin-line text-white/50 group-active:text-amber-400 text-sm transition-colors'></i>
          </div>
          <div className='min-w-0'>
            <p className='text-white text-sm font-medium truncate'>{elem}</p>
            <p className='text-white/30 text-xs mt-0.5'>Tap to select</p>
          </div>
          <i className='ri-arrow-right-s-line text-white/20 ml-auto flex-shrink-0'></i>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
