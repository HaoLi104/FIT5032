<script setup>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import { onMounted } from 'vue'
import { useAuthStore } from './store/auth'
import { firebaseAuth } from './firebase/config'

const authStore = useAuthStore()
onMounted(() => {
  firebaseAuth.onAuthStateChanged((fbUser) => {
    authStore.setUserFromFirebase(fbUser)
  })
})
</script>

<template>
  <div id="app">
    <TheHeader />
    <main id="main" class="container flex-grow-1" tabindex="-1">
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
