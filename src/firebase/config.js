import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyD7qLph6b4Dpkooz7duG6cVC8b4bmhTRlw',
  authDomain: 'fit5032-bd433.firebaseapp.com',
  projectId: 'fit5032-bd433',
  storageBucket: 'fit5032-bd433.firebasestorage.app',
  messagingSenderId: '819611407399',
  appId: '1:819611407399:web:8888b3b458866c4a436a02',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Authentication functions
export const firebaseAuth = {
  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Create user with email and password
  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return { success: true, user: userCredential.user }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser
  },

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback)
  },
}

// Booking service using Firestore
const bookingsCol = () => collection(db, 'bookings')

export const bookingService = {
  // Subscribe to all bookings
  subscribe(callback) {
    return onSnapshot(bookingsCol(), (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      callback(items)
    })
  },

  // Check conflict: any event that overlaps [start, end)
  async hasConflict(start, end) {
    // naive approach: filter client-side after fetching a reasonable time window
    // Here we query events whose start < end and end > start cannot be expressed directly in Firestore without composite queries
    // So fetch events with start before 'end' and filter by end > start
    const q1 = query(bookingsCol(), where('start', '<', Timestamp.fromDate(end)))
    const snap = await (await import('firebase/firestore')).getDocs(q1)
    const items = snap.docs.map((d) => d.data())
    return items.some((ev) => ev.end?.toDate?.() > start)
  },

  async create({ title, start, end, userId }) {
    const payload = {
      title,
      start: Timestamp.fromDate(start),
      end: Timestamp.fromDate(end),
      userId: userId || null,
      createdAt: Timestamp.now(),
    }
    const ref = await addDoc(bookingsCol(), payload)
    return ref.id
  },

  async remove(id) {
    await deleteDoc(doc(db, 'bookings', id))
  },
}

export { auth, db }
export default app
