import React, { useCallback } from 'react'
import { db } from './firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'

export const ItemInput = ({ item }) => {
  const [name, setName] = React.useState(item.name)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleChange = useCallback(async (e) => {
    const newName = e.target.value
    setName(newName)
    
    try {
      // Only send the new name, don't touch any other fields
      await setDoc(doc(db, 'handleliste', item.id), {
        name: newName
      }, { merge: true })
    } catch (error) {
      console.error('Error updating document: ', error)
    }
  }, [item])

  const onDelete = async () => {
    try {
      setIsDeleting(true)
      const element = document.getElementById(`item-${item.id}`)
      if (!element) return

      // Start fade out animation
      element.classList.add('removing')

      // Wait for animation to almost complete before deleting
      await new Promise(resolve => setTimeout(resolve, 280))
      await deleteDoc(doc(db, 'handleliste', item.id))
    } catch (error) {
      console.error('Error deleting document: ', error)
      setIsDeleting(false)
    }
  }

  return (
    <div id={`item-${item.id}`} className={`item-container ${isDeleting ? 'removing' : ''}`}>
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
