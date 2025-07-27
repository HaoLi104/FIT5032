<template>
  <div class="container py-5" style="max-width: 450px">
    <h2 class="mb-4 text-center">Register</h2>
    <form @submit.prevent="onRegister">
      <div class="mb-3">
        <label for="registerEmail" class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control" id="registerEmail" required />
      </div>
      <div class="mb-3">
        <label for="registerPassword" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="registerPassword"
          required
        />
        <div class="form-text">Password must be at least 8 characters</div>
      </div>
      <div class="mb-3">
        <label for="registerConfirmPassword" class="form-label">Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="form-control"
          id="registerConfirmPassword"
          required
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Role</label>
        <select v-model="role" class="form-select" required>
          <option value="">Please select a role</option>
          <option value="Senior">Senior</option>
          <option value="Caregiver">Caregiver</option>
        </select>
      </div>
      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
      <button type="submit" class="btn btn-success w-100">Register</button>
    </form>
    <div class="mt-3 text-center">
      <router-link to="/login">Already have an account? Login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('')
const error = ref('')
const router = useRouter()

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email)
}

function onRegister() {
  error.value = ''
  if (!email.value || !password.value || !confirmPassword.value || !role.value) {
    error.value = 'All fields are required'
    return
  }
  if (!validateEmail(email.value)) {
    error.value = 'Invalid email format'
    return
  }
  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  if (users.some((u) => u.email === email.value)) {
    error.value = 'Email already registered'
    return
  }
  const newUser = {
    id: Date.now(),
    email: email.value,
    password: password.value,
    role: role.value,
  }
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  router.push('/login')
}
</script>
