import { db } from './config'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'

export function col(path) {
  return collection(db, path)
}

export async function add(path, data) {
  const ref = await addDoc(col(path), data)
  return ref.id
}

export async function get(path, id) {
  const snap = await getDoc(doc(db, path, id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export async function getAll(path) {
  const snap = await getDocs(col(path))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getBy(path, field, op, value) {
  const q = query(col(path), where(field, op, value))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function update(path, id, data) {
  await updateDoc(doc(db, path, id), data)
}

export async function remove(path, id) {
  await deleteDoc(doc(db, path, id))
}

export function subscribe(path, callback) {
  return onSnapshot(col(path), (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(items)
  })
}


