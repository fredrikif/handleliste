import React from 'react'
import { getFirestore, doc, onSnapshot, updateDoc, serverTimestamp } from 'firebase/firestore'
import './kindergarten.css'
import DaySchedule from './DaySchedule'

const db = getFirestore()

function Kindergarten() {
  const [schedule, setSchedule] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'kindergarten', 'current'),
      (doc) => {
        if (doc.exists()) {
          setSchedule(doc.data())
          setError(null)
        } else {
          setError('Ingen timeplan funnet')
        }
      },
      (err) => {
        console.error('Firestore error:', err)
        setError(err.message)
      }
    )

    return () => unsubscribe()
  }, [])

  const updateSchedule = async (day, type, person) => {
    try {
      const scheduleRef = doc(db, 'kindergarten', 'current')
      await updateDoc(scheduleRef, {
        [`${day}.${type}`]: person,
        updatedAt: serverTimestamp()
      })
    } catch (error) {
      console.error('Error updating schedule:', error)
      setError(error.message)
    }
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  if (!schedule) {
    return <div>Laster...</div>
  }

  const days = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag']

  return (
    <div className="kindergarten-container">
      {days.map(day => (
        <DaySchedule 
          key={day}
          day={day}
          schedule={schedule[day]}
          onUpdate={updateSchedule}
        />
      ))}
    </div>
  )
}

export default Kindergarten