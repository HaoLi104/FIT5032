<template>
  <div class="container py-4">
    <h2 class="mb-3">Map: Search & Route</h2>
    <form class="row g-2 align-items-end mb-3" @submit.prevent="onSearch">
      <div class="col-12 col-md-4">
        <label class="form-label" for="q">Search places</label>
        <input id="q" v-model="query" class="form-control" placeholder="e.g. pharmacy" />
      </div>
      <div class="col-12 col-md-3">
        <label class="form-label" for="from">From</label>
        <input id="from" v-model="fromText" class="form-control" placeholder="Address or lat,lng" />
      </div>
      <div class="col-12 col-md-3">
        <label class="form-label" for="to">To</label>
        <input id="to" v-model="toText" class="form-control" placeholder="Address or lat,lng" />
      </div>
      <div class="col-12 col-md-2 d-grid">
        <button class="btn btn-primary" type="submit">Search</button>
      </div>
    </form>

    <div class="row g-3">
      <div class="col-12 col-lg-8">
        <div id="map" style="height: 520px; width: 100%" />
      </div>
      <div class="col-12 col-lg-4">
        <div class="card mb-3">
          <div class="card-header">Search Results</div>
          <ul class="list-group list-group-flush" style="max-height: 240px; overflow: auto">
            <li v-for="p in places" :key="p.place_id" class="list-group-item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <div class="fw-bold">{{ p.display_name }}</div>
                  <small>Lat: {{ p.lat }}, Lng: {{ p.lon }}</small>
                </div>
                <button class="btn btn-sm btn-outline-primary" @click="focusPlace(p)">Go</button>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="routeInfo" class="card">
          <div class="card-header">Route Info</div>
          <div class="card-body">
            <div><strong>Distance:</strong> {{ (routeInfo.distance/1000).toFixed(2) }} km</div>
            <div><strong>Duration:</strong> {{ Math.round(routeInfo.duration/60) }} min</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'

let map
let markersLayer
let routeLayer

const query = ref('pharmacy')
const fromText = ref('')
const toText = ref('')
const places = ref([])
const routeInfo = ref(null)

function parseLatLng(text) {
  if (!text) return null
  const parts = text.split(',').map((s) => s.trim())
  if (parts.length === 2) {
    const lat = parseFloat(parts[0])
    const lng = parseFloat(parts[1])
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng }
  }
  return null
}

async function geocode(text) {
  const coord = parseLatLng(text)
  if (coord) return coord
  const base = import.meta.env.VITE_VERCEL_API_BASE || ''
  const url = base
    ? `${base}/api/geocode?q=${encodeURIComponent(text)}`
    : `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}`
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
  const data = await res.json()
  if (!data?.length) return null
  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
}

async function fetchPlaces(q, center) {
  const viewbox = `${center.lng-0.1},${center.lat+0.1},${center.lng+0.1},${center.lat-0.1}`
  const base = import.meta.env.VITE_VERCEL_API_BASE || ''
  const url = base
    ? `${base}/api/geocode?q=${encodeURIComponent(q)}&limit=10&viewbox=${encodeURIComponent(viewbox)}&bounded=1`
    : `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=10&viewbox=${viewbox}&bounded=1`
  const res = await fetch(url, { headers: { 'Accept-Language': 'en' } })
  const data = await res.json()
  return data
}

async function route(from, to) {
  const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`
  const res = await fetch(url)
  const data = await res.json()
  const route0 = data?.routes?.[0]
  if (!route0) return null
  return route0
}

function drawMarkers(results) {
  if (markersLayer) markersLayer.clearLayers()
  markersLayer = L.layerGroup().addTo(map)
  results.forEach((p) => {
    const m = L.marker([p.lat, p.lon]).bindPopup(p.display_name)
    m.addTo(markersLayer)
  })
}

function drawRoute(route0) {
  if (routeLayer) routeLayer.remove()
  const coords = route0.geometry.coordinates.map(([lng, lat]) => [lat, lng])
  routeLayer = L.polyline(coords, { color: 'blue', weight: 5 })
  routeLayer.addTo(map)
  const bounds = L.latLngBounds(coords)
  map.fitBounds(bounds, { padding: [16, 16] })
  routeInfo.value = { distance: route0.distance, duration: route0.duration }
}

function focusPlace(p) {
  map.setView([p.lat, p.lon], 15)
}

async function onSearch() {
  // default center = current view center
  const center = map.getCenter()
  places.value = await fetchPlaces(query.value || 'pharmacy', { lat: center.lat, lng: center.lng })
  drawMarkers(places.value)

  // route if both provided
  if (fromText.value && toText.value) {
    const from = await geocode(fromText.value)
    const to = await geocode(toText.value)
    if (from && to) {
      const r = await route(from, to)
      if (r) drawRoute(r)
    }
  }
}

onMounted(() => {
  map = L.map('map').setView([ -37.8136, 144.9631 ], 12)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)
  markersLayer = L.layerGroup().addTo(map)
})
</script>

<style scoped>
#map { border: 1px solid #e5e5e5; border-radius: 8px; }
</style>


