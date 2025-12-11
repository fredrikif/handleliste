import React from 'react'

export const Navigation = ({ activePage, onNavigate }) => {
  return (
    <nav className="nav-container">
      <button 
        className={`nav-button ${activePage === 'ymse' ? 'active' : ''}`}
        onClick={() => onNavigate('ymse')}
      >
        Ymse
      </button>
      <button 
        className={`nav-button ${activePage === 'mat' ? 'active' : ''}`}
        onClick={() => onNavigate('mat')}
      >
        Mat
      </button>
      <button 
        className={`nav-button ${activePage === 'bhg' ? 'active' : ''}`}
        onClick={() => onNavigate('bhg')}
      >
        Bhg
      </button>
      <button 
        className={`nav-button ${activePage === 'qr' ? 'active' : ''}`}
        onClick={() => onNavigate('qr')}
      >
        QR
      </button>
    </nav>
  )
}