import { useState, useEffect } from 'react'
import { db } from './firebase'

function useCollection(collectionPath, orderBy) {
  const [collections, setCollections] = useState([])

  // side effect
  useEffect(() => {
    let collection = db.collection(collectionPath)

    if (orderBy) {
      collection = collection.orderBy(orderBy)
    }

    return collection.onSnapshot(snapshot => {
      const docs = []
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id,
        })
      })
      setCollections(docs)
    })
  }, [collectionPath, orderBy]) // empty array make it run once at mount

  return collections
}

export default useCollection
