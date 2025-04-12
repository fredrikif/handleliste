const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const path = require('path')
require('dotenv').config()

const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'))
const app = initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

async function migrateCollection(collectionName) {
  console.log(`Starting pinned migration for ${collectionName}...`)
  const querySnapshot = await db.collection(collectionName).get()
  
  const updates = []
  querySnapshot.forEach((document) => {
    const data = document.data()
    if (data.pinned === undefined) {
      console.log(`Adding pinned field to document ${document.id}...`)
      updates.push(
        document.ref.update({
          pinned: false // Default value for existing items
        })
      )
    }
  })

  await Promise.all(updates)
  console.log(`Migration completed for ${collectionName}. Updated ${updates.length} documents.`)
}

async function runMigration() {
  try {
    await migrateCollection('handleliste')
    await migrateCollection('todolist')
    console.log('All migrations completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

runMigration()