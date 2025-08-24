// Serverless function: /api/bulk-email
// Accepts multipart/form-data: to_list (comma/newline separated), subject, message, attachment(optional)

function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function sendBatch(env, toList, subject, message, attachmentFile) {
  const fromAddress = env.MAIL_FROM || 'SeniorConnect Hub <onboarding@resend.dev>'
  const headers = {
    Authorization: `Bearer ${env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  }
  let attachments
  if (attachmentFile && typeof attachmentFile.arrayBuffer === 'function') {
    const base64 = arrayBufferToBase64(await attachmentFile.arrayBuffer())
    attachments = [{ filename: attachmentFile.name || 'attachment', content: base64 }]
  }

  // Resend supports multiple recipients in one request; chunk to avoid limits
  const chunkSize = 50
  const chunks = []
  for (let i = 0; i < toList.length; i += chunkSize) {
    chunks.push(toList.slice(i, i + chunkSize))
  }

  const results = []
  for (const to of chunks) {
    const payload = { from: fromAddress, to, subject: subject || 'No subject', text: message || '' }
    if (attachments) payload.attachments = attachments
    const res = await fetch('https://api.resend.com/emails', { method: 'POST', headers, body: JSON.stringify(payload) })
    const data = await res.json()
    if (!res.ok) throw new Error(data?.message || data?.error?.message || 'Bulk email failed')
    results.push(data)
  }
  return results
}

export const onRequestPost = async ({ request, env }) => {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return new Response(JSON.stringify({ success: false, error: 'Use multipart/form-data' }), { status: 400, headers: { 'content-type': 'application/json' } })
    }
    if (!env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ success: false, error: 'Server email API not configured' }), { status: 500, headers: { 'content-type': 'application/json' } })
    }
    const form = await request.formData()
    const toRaw = form.get('to_list') || ''
    const subject = form.get('subject') || ''
    const message = form.get('message') || ''
    const attachmentFile = form.get('attachment')
    const toList = String(toRaw)
      .split(/\r?\n|,|;/)
      .map((s) => s.trim())
      .filter((s) => s)
    if (!toList.length) {
      return new Response(JSON.stringify({ success: false, error: 'No recipients' }), { status: 400, headers: { 'content-type': 'application/json' } })
    }
    const data = await sendBatch(env, toList, subject, message, attachmentFile)
    return new Response(JSON.stringify({ success: true, data, count: toList.length }), { status: 200, headers: { 'content-type': 'application/json' } })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message || String(err) }), { status: 500, headers: { 'content-type': 'application/json' } })
  }
}


