<template>
  <div class="container py-5" style="max-width: 640px">
    <h2 class="mb-4">Send Email (with Attachment)</h2>
    <form @submit.prevent="onSubmit" novalidate>
      <div class="mb-3">
        <label class="form-label" for="toEmail">To <span class="text-muted small">(可留空，使用服务器默认收件人)</span></label>
        <input id="toEmail" v-model="to" type="email" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="subject">Subject</label>
        <input id="subject" v-model="subject" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label" for="message">Message</label>
        <textarea id="message" v-model="message" rows="5" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label" for="attachment">Attachment</label>
        <input id="attachment" ref="fileInput" type="file" class="form-control" />
      </div>
      <div v-if="error" class="alert alert-danger py-2">{{ error }}</div>
      <div v-if="success" class="alert alert-success py-2">Email sent successfully.</div>
      <button :disabled="loading" type="submit" class="btn btn-primary">
        {{ loading ? 'Sending...' : 'Send Email' }}
      </button>
    </form>
  </div>

</template>

<script setup>
import { ref } from 'vue'

const to = ref('')
const subject = ref('')
const message = ref('')
const fileInput = ref(null)
const loading = ref(false)
const success = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  success.value = false
  if (!subject.value || !message.value) {
    error.value = 'Subject and message are required'
    return
  }
  loading.value = true
  try {
    const formData = new FormData()
    if (to.value) formData.append('to', to.value)
    formData.append('subject', subject.value)
    formData.append('message', message.value)
    if (fileInput.value?.files?.[0]) {
      formData.append('attachment', fileInput.value.files[0])
    }
    // 优先调用 Vercel(若配置了 Vercel URL)，否则调用本地/Cloudflare
    const vercelUrl = import.meta.env.VITE_VERCEL_API_BASE || ''
    const endpoint = vercelUrl ? `${vercelUrl}/api/send-email` : '/api/send-email'
    const res = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (!data?.success) {
      throw new Error(data?.error || 'Failed to send email')
    }
    success.value = true
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}
</script>


