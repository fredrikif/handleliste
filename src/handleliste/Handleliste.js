import React from 'react'
import { ItemInput } from './ItemInput'
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore'

const db = getFirestore()

function Handleliste() {
  const [items, setItems] = React.useState([])
  const [newItemName, setNewItemName] = React.useState('')
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    console.log('Setting up Firestore listener...')
    
    try {
      // Use single timestamp field for sorting
      const q = query(
        collection(db, 'handleliste'),
        orderBy('timestamp', 'desc')
      )

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          console.log(`Received ${snapshot.size} documents`)
          const newItems = []
          snapshot.forEach((doc) => {
            const data = doc.data()
            // Use timestamp or createdAt for backwards compatibility
            const timeValue = data.timestamp || data.createdAt
            newItems.push({
              ...data,
              id: doc.id,
              timestamp: timeValue
            })
          })
          setItems(newItems)
          setError(null)
        },
        (err) => {
          console.error('Firestore error:', err)
          setError(err.message)
        }
      )

      return () => unsubscribe()
    } catch (err) {
      console.error('Setup error:', err)
      setError(err.message)
    }
  }, [])

  const createItem = async (e) => {
    e.preventDefault()
    if (!newItemName.trim()) return

    const newItemRef = doc(collection(db, 'handleliste'))
    
    try {
      // Use only timestamp field for new items
      await setDoc(newItemRef, {
        name: newItemName,
        timestamp: serverTimestamp()
      })
      setNewItemName('')
    } catch (error) {
      console.error('Error adding document:', error)
    }
  }

  return (
    <div className="app-container">
      <h2 className="handlelisteHeading">F&M Handleliste</h2>
      {error && (
        <div style={{ color: 'red', margin: '1rem', textAlign: 'center' }}>
          Error: {error}
        </div>
      )}
      <ul className="handleliste">
        <form className="createItem" onSubmit={createItem}>
          <input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Legg til vare..."
            enterKeyHint="done"
            inputMode="text"
            autoComplete="off"
          />
          <button className="btnAdd" type="submit">
            <span className="material-icons-round">add</span>
          </button>
        </form>

        {items.map((item) => (
          <li key={item.id}>
            <ItemInput item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Handleliste
