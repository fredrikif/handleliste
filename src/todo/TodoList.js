import React from 'react'
import { ItemInput } from '../handleliste/ItemInput'
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

function TodoList() {
  const [items, setItems] = React.useState([])
  const [newItemName, setNewItemName] = React.useState('')
  const [error, setError] = React.useState(null)

  // Then simplify the query to debug
  React.useEffect(() => {
    try {
      const q = query(
        collection(db, 'todolist'),
        orderBy('pinned', 'desc'),    // Sort pinned items first
        orderBy('createdAt', 'desc')  // Then by creation date
      )

      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const newItems = []
          snapshot.forEach((doc) => {
            const data = doc.data()
            newItems.push({
              ...data,
              id: doc.id
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

  // When creating new items, use only one timestamp field
  const createItem = async (e) => {
    e.preventDefault()
    if (!newItemName.trim()) return

    const newItemRef = doc(collection(db, 'todolist'))
    
    try {
      await setDoc(newItemRef, {
        name: newItemName,
        createdAt: serverTimestamp(),
        pinned: false
      })
      setNewItemName('')
    } catch (error) {
      console.error('Error adding document:', error)
      setError(error.message)
    }
  }

  return (
    <>
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
            placeholder="Legg til gjøremål..."
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
            <ItemInput item={item} collectionName="todolist" />
          </li>
        ))}
      </ul>
    </>
  )
}

export default TodoList