import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'

const initializeKindergartenSchedule = async () => {
  const db = getFirestore()
  
  const defaultSchedule = {
    mandag: { levering: 'Fredrik', henting: 'Marie' },
    tirsdag: { levering: 'Fredrik', henting: 'Marie' },
    onsdag: { levering: 'Fredrik', henting: 'Marie' },
    torsdag: { levering: 'Fredrik', henting: 'Marie' },
    fredag: { levering: 'Fredrik', henting: 'Marie' },
    updatedAt: serverTimestamp()
  }

  try {
    await setDoc(doc(db, 'kindergarten', 'current'), defaultSchedule)
    console.log('Kindergarten schedule initialized successfully')
  } catch (error) {
    console.error('Error initializing kindergarten schedule:', error)
  }
}

export default initializeKindergartenSchedule