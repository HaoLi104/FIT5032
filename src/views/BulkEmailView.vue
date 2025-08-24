<template>
  <div class="container py-5" style="max-width: 760px">
    <h2 class="mb-4">Bulk Email</h2>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label class="form-label" for="toList">Recipients (comma/newline separated)</label>
        <textarea id="toList" v-model="toList" rows="4" class="form-control" placeholder="a@ex.com, b@ex.com\nor one per line"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label" for="csv">Upload CSV (single column of emails)</label>
        <input id="csv" type="file" class="form-control" accept=".csv,text/csv" @change="onCsv" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="subject">Subject</label>
        <input id="subject" v-model="subject" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label" for="message">Message</label>
        <textarea id="message" v-model="message" rows="6" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label" for="attachment">Attachment (optional)</label>
        <input id="attachment" ref="fileInput" type="file" class="form-control" />
      </div>
      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
      <div v-if="success" class="alert alert-success py-2">Sent {{ sentCount }} emails successfully.</div>
      <button class="btn btn-primary" type="submit" :disabled="loading">
        {{ loading ? 'Sending...' : 'Send Bulk Email' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toList = ref('')
const subject = ref('')
const message = ref('')
const fileInput = ref(null)
const loading = ref(false)
const error = ref('')
const success = ref(false)
const sentCount = ref(0)

function onCsv(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const text = String(reader.result || '')
    const emails = text.split(/\r?\n|,|;/).map((s) => s.trim()).filter((s) => s)
    const curr = toList.value ? toList.value + '\n' : ''
    toList.value = curr + emails.join('\n')
  }
  reader.readAsText(file)
}

async function onSubmit() {
  error.value = ''
  success.value = false
  const list = toList.value.split(/\r?\n|,|;/).map((s) => s.trim()).filter((s) => s)
  if (!list.length) {
    error.value = 'No recipients'
    return
  }
  loading.value = true
  try {
    const form = new FormData()
    form.append('to_list', list.join(','))
    form.append('subject', subject.value)
    form.append('message', message.value)
    if (fileInput.value?.files?.[0]) form.append('attachment', fileInput.value.files[0])
    const base = import.meta.env.VITE_VERCEL_API_BASE || ''
    const endpoint = base ? `${base}/api/bulk-email` : '/api/bulk-email'
    const res = await fetch(endpoint, { method: 'POST', body: form })
    const text = await res.text()
    let data
    try { data = JSON.parse(text) } catch { data = null }
    if (!res.ok || !data?.success) throw new Error((data && (data.error || data.message)) || text || 'Bulk email failed')
    sentCount.value = data?.count || list.length
    success.value = true
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}
</script>


