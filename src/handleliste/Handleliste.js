import React from 'react'
import firebase from './firebase'
import { ItemInput, onDeleteAll } from './ItemInput'

function Handleliste() {
  const [items, setItems] = React.useState([])
  const [newItemName, setNewItemName] = React.useState('')

  React.useEffect(() => {
    const db = firebase.firestore()
    return db.collection('handleliste').onSnapshot((snapshot) => {
      const itemsData = []
      snapshot.forEach((doc) => itemsData.push({ ...doc.data(), id: doc.id }))
      setItems(itemsData)
    })
  }, [])

  const onCreate = (e) => {
    e.preventDefault()
    if (newItemName !== '') {
      const db = firebase.firestore()
      db.collection('handleliste').add({
        name: newItemName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setNewItemName('')
    }
  }

  return (
    <div className="app-container">
      <h2 className="handlelisteHeading">F&M Handleliste</h2>
      <ul className="handleliste">
        <form className="createItem" onSubmit={onCreate}>
          <input
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <button className="btnUpdate" type="submit">
            <span role="img" aria-label="bacon icon">
              🥓
            </span>
          </button>
          <button className="btnDelete" onClick={onDeleteAll}>
            <span role="img" aria-label="warning icon">
              ⚠
            </span>
          </button>
        </form>

        {items
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((item) => (
            <li key={item.timestamp}>
              <ItemInput item={item} />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Handleliste
