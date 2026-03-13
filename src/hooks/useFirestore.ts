import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export function useFirestore<T>(collectionPath: string, orderField: string = 'order') {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, collectionPath), orderBy(orderField, 'asc'));

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as (T & { id: string })[];
        setData(items);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching ${collectionPath}:`, err);
        setError(err.message);
        setLoading(false);
        try {
          handleFirestoreError(err, OperationType.LIST, collectionPath);
        } catch (e) {
          // Error already logged
        }
      }
    );

    return () => unsubscribe();
  }, [collectionPath, orderField]);

  return { data, loading, error };
}

export function useFirestoreDoc<T>(collectionPath: string, docId: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, collectionPath, docId);

    const unsubscribe = onSnapshot(docRef, 
      (snapshot) => {
        setData(snapshot.data() as T || null);
        setLoading(false);
      },
      (err) => {
        console.error(`Error fetching ${collectionPath}/${docId}:`, err);
        setError(err.message);
        setLoading(false);
        try {
          handleFirestoreError(err, OperationType.GET, `${collectionPath}/${docId}`);
        } catch (e) {
          // Error already logged
        }
      }
    );

    return () => unsubscribe();
  }, [collectionPath, docId]);

  return { data, loading, error };
}
