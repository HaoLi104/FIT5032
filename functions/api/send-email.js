// Cloudflare Pages Function: /api/send-email
// Expects multipart/form-data with fields: to, subject, message, attachment (File)

function arrayBufferToBase64(buffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

async function sendViaResend({ env, to, subject, message, attachmentFile }) {
  const fromAddress = env.MAIL_FROM || 'SeniorConnect Hub <onboarding@resend.dev>'
  const toAddress = to || env.MAIL_TO_DEFAULT

  const payload = {
    from: fromAddress,
    to: [toAddress],
    subject: subject || 'No subject',
    text: message || '',
  }

  if (attachmentFile && typeof attachmentFile.arrayBuffer === 'function') {
    const buffer = await attachmentFile.arrayBuffer()
    const base64 = arrayBufferToBase64(buffer)
    payload.attachments = [
      {
        filename: attachmentFile.name || 'attachment',
        content: base64,
      },
    ]
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const text = await res.text()
  let data
  try { data = JSON.parse(text) } catch { data = null }
  if (!res.ok) {
    const msg = (data && (data.message || data?.error?.message)) || text || 'Failed to send email'
    throw new Error(msg)
  }
  return data || { ok: true }
}

export const onRequestPost = async ({ request, env }) => {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Content-Type must be multipart/form-data' }),
        { status: 400, headers: { 'content-type': 'application/json' } },
      )
    }

    const formData = await request.formData()
    const to = formData.get('to')
    const subject = formData.get('subject')
    const message = formData.get('message')
    const attachmentFile = formData.get('attachment')

    if (!to && !env.MAIL_TO_DEFAULT) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing recipient email' }),
        { status: 400, headers: { 'content-type': 'application/json' } },
      )
    }
    if (!env.RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ success: false, error: 'Server email API not configured' }),
        { status: 500, headers: { 'content-type': 'application/json' } },
      )
    }

    const data = await sendViaResend({ env, to, subject, message, attachmentFile })
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message || String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}


