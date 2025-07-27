<script setup>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import { onMounted } from 'vue'
import { useAuthStore } from './store/auth'

const authStore = useAuthStore()
onMounted(() => {
  const currentUser = localStorage.getItem('currentUser')
  if (currentUser) {
    authStore.login(JSON.parse(currentUser))
  }
})
</script>

<template>
  <div id="app">
    <TheHeader />
    <main class="container flex-grow-1">
      <router-view />
    </main>
    <TheFooter />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main.container {
  flex: 1 0 auto;
}
</style>
