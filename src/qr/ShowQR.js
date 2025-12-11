import React, { useState } from 'react'
import remaQR from './remaQR.jpeg'
import trumfQR from './trumfQR.jpeg'

const STORES = [
  { id: 'trumf', name: 'Trumf', image: trumfQR },
  { id: 'rema', name: 'Rema', image: remaQR },
  // Add more stores here in the future:
  // { id: 'meny', name: 'Meny', image: menyQR },
]

function ShowQR() {
  const [selectedStore, setSelectedStore] = useState(STORES.find(store => store.id === 'trumf'))

  const handleStoreSelect = (store) => {
    setSelectedStore(store)
  }

  return (
    <div className="qr-container">
      <div className="qr-display">
        <div className="store-buttons">
          {STORES.map(store => (
            <button 
              key={store.id}
              className={`store-button ${selectedStore.id === store.id ? 'active' : ''}`}
              onClick={() => handleStoreSelect(store)}
            >
              {store.name}
            </button>
          ))}
        </div>
        <div className="qr-image-container">
          <img 
            src={selectedStore.image}
            alt={`${selectedStore.name} QR code`}
            className="qr-image"
          />
        </div>
        
      </div>
    </div>
  )
}

export default ShowQR