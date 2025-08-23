<template>
  <div class="container py-5">
    <h2 class="mb-4">Interactive Tables</h2>

    <div class="card mb-4">
      <div class="card-header d-flex align-items-center justify-content-between">
        <strong>Articles</strong>
        <div>
          <button class="btn btn-sm btn-outline-primary me-2" @click="exportArticlesCsv">Export CSV</button>
          <button class="btn btn-sm btn-outline-secondary" @click="printArticles">Export PDF</button>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-2 mb-3">
          <div class="col-6 col-md-3">
            <input class="form-control" v-model="filters.articles.title" placeholder="Search Title" />
          </div>
          <div class="col-6 col-md-3">
            <input class="form-control" v-model="filters.articles.location" placeholder="Search Location" />
          </div>
          <div class="col-6 col-md-3">
            <input class="form-control" v-model="filters.articles.date" placeholder="Search Date" />
          </div>
          <div class="col-6 col-md-3">
            <select v-model="articlesSort.key" class="form-select">
              <option value="title">Sort by Title</option>
              <option value="date">Sort by Date</option>
              <option value="location">Sort by Location</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table id="articles-table" class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th @click="toggleArticlesSort('title')" role="button">Title</th>
                <th>Description</th>
                <th @click="toggleArticlesSort('date')" role="button">Date</th>
                <th @click="toggleArticlesSort('location')" role="button">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pagedArticles" :key="row.id">
                <td>{{ row.title }}</td>
                <td>{{ row.description }}</td>
                <td>{{ row.date }}</td>
                <td>{{ row.location }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="d-flex justify-content-end">
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ disabled: articlesPage === 1 }">
              <button class="page-link" @click="articlesPage--" aria-label="Previous">«</button>
            </li>
            <li class="page-item disabled"><span class="page-link">{{ articlesPage }} / {{ articlesTotalPages }}</span></li>
            <li class="page-item" :class="{ disabled: articlesPage === articlesTotalPages }">
              <button class="page-link" @click="articlesPage++" aria-label="Next">»</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <strong>Community Events</strong>
        <div>
          <button class="btn btn-sm btn-outline-primary me-2" @click="exportEventsCsv">Export CSV</button>
          <button class="btn btn-sm btn-outline-secondary" @click="printEvents">Export PDF</button>
        </div>
      </div>
      <div class="card-body">
        <div class="row g-2 mb-3">
          <div class="col-6 col-md-3">
            <input class="form-control" v-model="filters.events.title" placeholder="Search Title" />
          </div>
          <div class="col-6 col-md-3">
            <input class="form-control" v-model="filters.events.location" placeholder="Search Location" />
          </div>
          <div class="col-6 col-md-3">
            <input class="form-control" v-model="filters.events.date" placeholder="Search Date" />
          </div>
          <div class="col-6 col-md-3">
            <select v-model="eventsSort.key" class="form-select">
              <option value="title">Sort by Title</option>
              <option value="date">Sort by Date</option>
              <option value="location">Sort by Location</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table id="events-table" class="table table-striped table-hover align-middle">
            <thead>
              <tr>
                <th @click="toggleEventsSort('title')" role="button">Title</th>
                <th>Description</th>
                <th @click="toggleEventsSort('date')" role="button">Date</th>
                <th @click="toggleEventsSort('location')" role="button">Location</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in pagedEvents" :key="row.id">
                <td>{{ row.title }}</td>
                <td>{{ row.description }}</td>
                <td>{{ row.date }}</td>
                <td>{{ row.location }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="d-flex justify-content-end">
          <ul class="pagination pagination-sm">
            <li class="page-item" :class="{ disabled: eventsPage === 1 }">
              <button class="page-link" @click="eventsPage--" aria-label="Previous">«</button>
            </li>
            <li class="page-item disabled"><span class="page-link">{{ eventsPage }} / {{ eventsTotalPages }}</span></li>
            <li class="page-item" :class="{ disabled: eventsPage === eventsTotalPages }">
              <button class="page-link" @click="eventsPage++" aria-label="Next">»</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { articles, communityEvents } from '../data/mockData'
import { exportToCsv, printElementAsPdf } from '../utils/export'

const pageSize = 10

const filters = ref({
  articles: { title: '', location: '', date: '' },
  events: { title: '', location: '', date: '' },
})

const articlesSort = ref({ key: 'date', asc: true })
const eventsSort = ref({ key: 'date', asc: true })

function toggleArticlesSort(key) {
  if (articlesSort.value.key === key) {
    articlesSort.value.asc = !articlesSort.value.asc
  } else {
    articlesSort.value.key = key
    articlesSort.value.asc = true
  }
}
function toggleEventsSort(key) {
  if (eventsSort.value.key === key) {
    eventsSort.value.asc = !eventsSort.value.asc
  } else {
    eventsSort.value.key = key
    eventsSort.value.asc = true
  }
}

const filteredArticles = computed(() => {
  const { title, location, date } = filters.value.articles
  return articles.filter((r) =>
    (!title || r.title.toLowerCase().includes(title.toLowerCase())) &&
    (!location || r.location.toLowerCase().includes(location.toLowerCase())) &&
    (!date || r.date.includes(date)),
  )
})

const filteredEvents = computed(() => {
  const { title, location, date } = filters.value.events
  return communityEvents.filter((r) =>
    (!title || r.title.toLowerCase().includes(title.toLowerCase())) &&
    (!location || r.location.toLowerCase().includes(location.toLowerCase())) &&
    (!date || r.date.includes(date)),
  )
})

const sortedArticles = computed(() => {
  const { key, asc } = articlesSort.value
  return [...filteredArticles.value].sort((a, b) => {
    const va = String(a[key] ?? '')
    const vb = String(b[key] ?? '')
    return asc ? va.localeCompare(vb) : vb.localeCompare(va)
  })
})
const sortedEvents = computed(() => {
  const { key, asc } = eventsSort.value
  return [...filteredEvents.value].sort((a, b) => {
    const va = String(a[key] ?? '')
    const vb = String(b[key] ?? '')
    return asc ? va.localeCompare(vb) : vb.localeCompare(va)
  })
})

const articlesPage = ref(1)
const eventsPage = ref(1)

const articlesTotalPages = computed(() => Math.max(1, Math.ceil(sortedArticles.value.length / pageSize)))
const eventsTotalPages = computed(() => Math.max(1, Math.ceil(sortedEvents.value.length / pageSize)))

const pagedArticles = computed(() => {
  const start = (articlesPage.value - 1) * pageSize
  return sortedArticles.value.slice(start, start + pageSize)
})
const pagedEvents = computed(() => {
  const start = (eventsPage.value - 1) * pageSize
  return sortedEvents.value.slice(start, start + pageSize)
})

function exportArticlesCsv() {
  exportToCsv('articles.csv', sortedArticles.value, [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
  ])
}
function exportEventsCsv() {
  exportToCsv('events.csv', sortedEvents.value, [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'date', label: 'Date' },
    { key: 'location', label: 'Location' },
  ])
}
function printArticles() {
  printElementAsPdf('articles-table', 'Articles')
}
function printEvents() {
  printElementAsPdf('events-table', 'Community Events')
}
</script>


