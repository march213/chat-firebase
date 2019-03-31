import { useState, useEffect } from 'react'
import { db } from './firebase'

function useCollection(collectionPath, orderBy) {
  const [collections, setCollections] = useState([])

  // side effect
  useEffect(() => {
    return db
      .collection(collectionPath)
      .orderBy(orderBy)
      .onSnapshot(snapshot => {
        const docs = []
        snapshot.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        setCollections(docs)
      })
  }, []) // empty array make it run once at mount

  return collections
}

export default useCollection
