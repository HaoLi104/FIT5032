import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  function login(userData) {
    user.value = userData
    isAuthenticated.value = true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  function setUserFromFirebase(firebaseUser) {
    if (!firebaseUser) {
      user.value = null
      isAuthenticated.value = false
      return
    }
    const userRoles = JSON.parse(localStorage.getItem('userRoles') || '{}')
    const role = userRoles[firebaseUser.uid] || null
    user.value = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      role,
    }
    isAuthenticated.value = true
  }

  function setRoleForCurrentUser(role) {
    if (!user.value?.uid) return
    const userRoles = JSON.parse(localStorage.getItem('userRoles') || '{}')
    userRoles[user.value.uid] = role
    localStorage.setItem('userRoles', JSON.stringify(userRoles))
    user.value = { ...user.value, role }
  }

  return { user, isAuthenticated, login, logout, setUserFromFirebase, setRoleForCurrentUser }
})
