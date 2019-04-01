import { useState, useEffect } from 'react'
import { db } from './firebase'

function useCollection(collectionPath, orderBy, where = []) {
  const [collections, setCollections] = useState([])

  const [queryField, queryOperator, queryValue] = where

  // side effect
  useEffect(() => {
    let collection = db.collection(collectionPath)

    if (orderBy) {
      collection = collection.orderBy(orderBy)
    }

    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue)
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
  }, [collectionPath, orderBy, queryField, queryOperator, queryValue]) // empty array make it run once at mount

  return collections
}

export default useCollection
