<template>
  <div class="aggregate-rating">
    <span
      v-for="star in 5"
      :key="star"
      class="star"
      :class="{ filled: star <= currentRating }"
      @click="rate(star)"
      :style="{ cursor: isLoggedIn ? 'pointer' : 'not-allowed' }"
    >
      ★
    </span>
    <span class="ms-2">{{ averageRating.toFixed(1) }} / 5 ({{ totalRatings }} ratings)</span>
    <span v-if="!isLoggedIn" class="text-danger ms-2" style="font-size: 0.9em"
      >Please login to rate</span
    >
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useAuthStore } from '../store/auth'

const props = defineProps({
  itemId: {
    type: [String, Number],
    required: true,
  },
})

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)
const currentRating = ref(0)
const ratings = ref([])

function loadRatings() {
  const allRatings = JSON.parse(localStorage.getItem('ratings') || '{}')
  ratings.value = allRatings[props.itemId] || []
  // If logged in, check if current user has rated
  if (isLoggedIn.value && authStore.user?.id) {
    const userRating = ratings.value.find((r) => r.userId === authStore.user.id)
    currentRating.value = userRating ? userRating.value : 0
  } else {
    currentRating.value = 0
  }
}

function rate(star) {
  if (!isLoggedIn.value || !authStore.user?.id) return
  let allRatings = JSON.parse(localStorage.getItem('ratings') || '{}')
  let itemRatings = allRatings[props.itemId] || []
  const idx = itemRatings.findIndex((r) => r.userId === authStore.user.id)
  if (idx !== -1) {
    itemRatings[idx].value = star
  } else {
    itemRatings.push({ userId: authStore.user.id, value: star })
  }
  allRatings[props.itemId] = itemRatings
  localStorage.setItem('ratings', JSON.stringify(allRatings))
  loadRatings()
}

const averageRating = computed(() => {
  if (!ratings.value.length) return 0
  return ratings.value.reduce((sum, r) => sum + r.value, 0) / ratings.value.length
})
const totalRatings = computed(() => ratings.value.length)

watch(() => authStore.isAuthenticated, loadRatings)
onMounted(loadRatings)
</script>

<style scoped>
.star {
  font-size: 1.5rem;
  color: #ccc;
  transition: color 0.2s;
}
.star.filled {
  color: #f7b500;
}
</style>
