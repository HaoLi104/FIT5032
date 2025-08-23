<template>
  <div class="container py-5" style="max-width: 400px">
    <h2 class="mb-4 text-center">Login</h2>
    <form @submit.prevent="onLogin">
      <div class="mb-3">
        <label for="loginEmail" class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" id="loginEmail" required />
      </div>
      <div class="mb-3">
        <label for="loginPassword" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="loginPassword"
          required
        />
      </div>
      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <div class="mt-3 text-center">
      <router-link to="/register">Don't have an account? Register</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { firebaseAuth } from '../firebase/config'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

async function onLogin() {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Email and password are required'
    return
  }
  const { success, error: err } = await firebaseAuth.signIn(email.value, password.value)
  if (!success) {
    error.value = err || 'Login failed'
    return
  }
  const redirect = router.currentRoute.value.query.redirect || '/'
  router.push(redirect)
}
</script>
