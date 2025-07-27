<template>
  <header class="navbar navbar-expand-lg navbar-light bg-white border-bottom mb-4 shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold fs-3 text-primary" href="#">
        <span>Logo</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/health"
              >Health & Wellness</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/community"
              >Community Hub</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/services"
              >Services Directory</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/caregivers"
              >For Caregivers</router-link
            >
          </li>
        </ul>
        <form class="d-flex me-3" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            disabled
            style="min-width: 120px"
          />
        </form>
        <template v-if="!isAuthenticated">
          <router-link to="/login" class="btn btn-outline-primary me-2 rounded-pill px-4"
            >Login</router-link
          >
          <router-link to="/register" class="btn btn-primary rounded-pill px-4"
            >Register</router-link
          >
        </template>
        <template v-else>
          <span class="me-2 text-secondary small">{{ user?.email || 'Logged in' }}</span>
          <router-link
            to="/account/profile"
            class="btn btn-outline-secondary me-2 rounded-pill px-4"
            >My Profile</router-link
          >
          <button class="btn btn-danger rounded-pill px-4" @click="logout">Logout</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const authStore = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const user = computed(() => authStore.user)

function logout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar-nav .nav-link {
  font-weight: 500;
  color: #333;
  margin-right: 0.5rem;
  transition: color 0.2s;
}
.navbar-nav .nav-link.active,
.navbar-nav .nav-link.router-link-exact-active {
  color: #0d6efd;
  font-weight: 700;
}
.navbar-nav .nav-link:hover {
  color: #0d6efd;
}
</style>
