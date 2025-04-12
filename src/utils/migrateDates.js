const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const path = require('path')
require('dotenv').config()

// Initialize Firebase Admin with service account
const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'))
const app = initializeApp({
  credential: cert(serviceAccount)
})

const db = getFirestore()

async function migrateCollection(collectionName) {
  console.log(`Starting migration for ${collectionName}...`)
  const querySnapshot = await db.collection(collectionName).get()
  
  const updates = []
  querySnapshot.forEach((document) => {
    const data = document.data()
    if (data.timestamp && !data.createdAt) {
      console.log(`Migrating document ${document.id}...`)
      updates.push(
        document.ref.update({
          createdAt: data.timestamp,
          timestamp: null // Firebase Admin SDK handles field deletion differently
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