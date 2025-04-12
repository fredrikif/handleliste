import React, { useCallback } from 'react'
import { db } from './firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'

export const ItemInput = ({ item, collectionName = 'handleliste' }) => {
  const [name, setName] = React.useState(item.name)
  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isPinned, setIsPinned] = React.useState(item.pinned || false)

  const handleChange = useCallback(async (e) => {
    const newName = e.target.value
    setName(newName)
    
    try {
      // Only send the new name, don't touch any other fields
      await setDoc(doc(db, collectionName, item.id), {
        name: newName
      }, { merge: true })
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }, [item, collectionName])

  const onDelete = async () => {
    try {
      setIsDeleting(true)
      const element = document.getElementById(`item-${item.id}`)
      if (!element) return

      // Start fade out animation
      element.classList.add('removing')

      // Wait for animation to almost complete before deleting
      await new Promise(resolve => setTimeout(resolve, 280))
      await deleteDoc(doc(db, collectionName, item.id))
    } catch (error) {
      console.error('Error deleting document: ', error)
      setIsDeleting(false)
    }
  }

  const togglePin = async (e) => {
    // Prevent any default touch events
    e.preventDefault()
    e.stopPropagation()

    try {
      const newPinnedState = !isPinned
      setIsPinned(newPinnedState) // Update state immediately for better UX

      await setDoc(doc(db, collectionName, item.id), {
        pinned: newPinnedState,
        createdAt: item.createdAt
      }, { merge: true })
    } catch (error) {
      console.error('Error updating pin status:', error)
      setIsPinned(!isPinned) // Revert state if error
    }
  }

  return (
    <div id={`item-${item.id}`} className={`item-container ${isDeleting ? 'removing' : ''} ${isPinned ? 'pinned' : ''}`}>
      <button 
        className={`btnPin ${isPinned ? 'active' : ''}`}
        onClick={togglePin}
        onTouchStart={(e) => e.stopPropagation()} // Prevent touch event bubbling
        title={isPinned ? 'Unpin item' : 'Pin item'}
      >
        <span className="material-icons-round">
          {isPinned ? 'push_pin' : 'push_pin_outlined'}
        </span>
      </button>
      <input
        className="shadow"
        value={name}
        onChange={handleChange}
        style={{ opacity: isDeleting ? 0 : 1 }}
        disabled={isDeleting}
      />
      <button 
        className="btnDelete shadow" 
        onClick={onDelete}
        style={{ opacity: isDeleting ? 0 : 1 }}
        disabled={isDeleting}
      >
        <span className="material-icons-round">delete</span>
      </button>
    </div>
  )
}
