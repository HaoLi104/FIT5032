<template>
  <div class="container py-4">
    <h2 class="mb-3">Appointment Booking</h2>
    <div class="row g-3 mb-3">
      <div class="col-12 col-md-4">
        <label class="form-label" for="title">Title</label>
        <input id="title" v-model="title" class="form-control" placeholder="e.g. Health Consultation" />
      </div>
      <div class="col-6 col-md-4">
        <label class="form-label" for="start">Start</label>
        <input id="start" v-model="start" type="datetime-local" class="form-control" />
      </div>
      <div class="col-6 col-md-4">
        <label class="form-label" for="end">End</label>
        <input id="end" v-model="end" type="datetime-local" class="form-control" />
      </div>
      <div class="col-12">
        <button class="btn btn-primary" @click="onCreate" :disabled="loading">
          {{ loading ? 'Creating...' : 'Create Booking' }}
        </button>
        <span v-if="error" class="text-danger ms-3">{{ error }}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div id="calendar"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { bookingService } from '../firebase/config'
import { useAuthStore } from '../store/auth'
import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const authStore = useAuthStore()

let calendar
const events = ref([])
const title = ref('')
const start = ref('')
const end = ref('')
const loading = ref(false)
const error = ref('')

let unsubscribe

function refreshCalendar() {
  if (!calendar) return
  const fcEvents = events.value.map((e) => ({
    id: e.id,
    title: e.title,
    start: e.start?.toDate?.() || e.start,
    end: e.end?.toDate?.() || e.end,
  }))
  calendar.removeAllEvents()
  calendar.addEventSource(fcEvents)
}

async function onCreate() {
  error.value = ''
  if (!title.value || !start.value || !end.value) {
    error.value = 'All fields are required'
    return
  }
  const startDate = new Date(start.value)
  const endDate = new Date(end.value)
  if (endDate <= startDate) {
    error.value = 'End must be after start'
    return
  }
  loading.value = true
  try {
    const has = await bookingService.hasConflict(startDate, endDate)
    if (has) {
      error.value = 'Booking conflict detected. Please choose another time.'
      return
    }
    await bookingService.create({
      title: title.value,
      start: startDate,
      end: endDate,
      userId: authStore.user?.uid || null,
    })
    title.value = ''
    start.value = ''
    end.value = ''
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const el = document.getElementById('calendar')
  calendar = new Calendar(el, {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    eventClick(info) {
      // optional: delete on click confirm
      const yes = confirm(`Delete booking: ${info.event.title}?`)
      if (yes) {
        bookingService.remove(info.event.id)
      }
    },
  })
  calendar.render()

  unsubscribe = bookingService.subscribe((items) => {
    events.value = items
    refreshCalendar()
  })
})

onBeforeUnmount(() => {
  if (unsubscribe) unsubscribe()
  if (calendar) {
    calendar.destroy()
    calendar = null
  }
})
</script>


