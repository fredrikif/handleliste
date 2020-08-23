import React from 'react'
import firebase from './firebase'

export const ItemInput = ({ item }) => {
  const [name, setName] = React.useState(item.name)

  const onUpdate = () => {
    const db = firebase.firestore()
    db.collection('handleliste')
      .doc(item.id)
      .set({ ...item, name })
  }

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('handleliste').doc(item.id).delete()
  }

  return (
    <>
      <input
        className="shadow"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />

      <button className="btnUpdate shadow" onClick={onUpdate}>
        <span role="img" aria-label="refresh icon">
          ⟳
        </span>
      </button>
      <button className="btnDelete shadow" onClick={onDelete}>
        <span role="img" aria-label="delete icon">
          ⌫
        </span>
      </button>
    </>
  )
}

export const onDeleteAll = (e) => {
  e.preventDefault()
  if (window.confirm('Slette alt fra handlelista?')) {
    const db = firebase.firestore()
    db.collection('handleliste')
      .get()
      .then((res) => {
        res.forEach((item) => {
          item.ref.delete()
        })
      })
  }
}
