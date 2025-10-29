import React from 'react'

const DaySchedule = ({ day, schedule, onUpdate }) => {
  const dayNames = {
    mandag: 'Mandag',
    tirsdag: 'Tirsdag',
    onsdag: 'Onsdag',
    torsdag: 'Torsdag',
    fredag: 'Fredag'
  }

  const people = ['Fredrik', 'Marie', 'Familie']

  return (
    <div className="day-schedule">
      <div className="day-header">
        {dayNames[day]}
      </div>
      
      <div className="schedule-row">
        <span className="schedule-label">Levering</span>
        <div className="toggle-group">
          {people.map(person => (
            <button
              key={person}
              className={`toggle-button ${schedule.levering === person ? 'active' : ''}`}
              onClick={() => onUpdate(day, 'levering', person)}
            >
              {person}
            </button>
          ))}
        </div>
      </div>

      <div className="schedule-row">
        <span className="schedule-label">Henting</span>
        <div className="toggle-group">
          {people.map(person => (
            <button
              key={person}
              className={`toggle-button ${schedule.henting === person ? 'active' : ''}`}
              onClick={() => onUpdate(day, 'henting', person)}
            >
              {person}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DaySchedule