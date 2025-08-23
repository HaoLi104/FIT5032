<template>
  <div class="container py-4">
    <h2 class="mb-4">Interactive Charts</h2>
    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <div class="card">
          <div class="card-header">Bookings per Day</div>
          <div class="card-body"><canvas id="chart-bookings-day"></canvas></div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card">
          <div class="card-header">Booking Duration (minutes)</div>
          <div class="card-body"><canvas id="chart-bookings-duration"></canvas></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { bookingService } from '../firebase/config'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  PointElement,
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineController, LineElement, PointElement)

let unsub
let chartDay
let chartDuration

function aggregateDay(items) {
  const counts = {}
  for (const it of items) {
    const d = (it.start?.toDate?.() || it.start)
    const key = new Date(d).toISOString().slice(0, 10)
    counts[key] = (counts[key] || 0) + 1
  }
  const labels = Object.keys(counts).sort()
  const data = labels.map((k) => counts[k])
  return { labels, data }
}

function aggregateDuration(items) {
  const buckets = { '<15': 0, '15-30': 0, '30-60': 0, '>60': 0 }
  for (const it of items) {
    const s = (it.start?.toDate?.() || it.start)
    const e = (it.end?.toDate?.() || it.end)
    const min = Math.max(0, Math.round((new Date(e) - new Date(s)) / 60000))
    if (min < 15) buckets['<15']++
    else if (min < 30) buckets['15-30']++
    else if (min < 60) buckets['30-60']++
    else buckets['>60']++
  }
  const labels = Object.keys(buckets)
  const data = labels.map((k) => buckets[k])
  return { labels, data }
}

function renderCharts(items) {
  const day = aggregateDay(items)
  const dur = aggregateDuration(items)
  const ctx1 = document.getElementById('chart-bookings-day')
  const ctx2 = document.getElementById('chart-bookings-duration')
  if (chartDay) chartDay.destroy()
  if (chartDuration) chartDuration.destroy()
  chartDay = new Chart(ctx1, {
    type: 'bar',
    data: { labels: day.labels, datasets: [{ label: 'Bookings', data: day.data, backgroundColor: '#0d6efd' }] },
    options: { responsive: true, plugins: { legend: { display: false } } },
  })
  chartDuration = new Chart(ctx2, {
    type: 'line',
    data: { labels: dur.labels, datasets: [{ label: 'Count', data: dur.data, borderColor: '#198754', backgroundColor: 'rgba(25,135,84,0.2)' }] },
    options: { responsive: true },
  })
}

onMounted(() => {
  unsub = bookingService.subscribe((items) => renderCharts(items))
})

onBeforeUnmount(() => {
  if (unsub) unsub()
  if (chartDay) chartDay.destroy()
  if (chartDuration) chartDuration.destroy()
})
</script>


