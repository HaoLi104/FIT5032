// Vercel Serverless Function: /api/send-email
// QQ SMTP via Nodemailer; supports multipart/form-data

import nodemailer from 'nodemailer'
import formidable from 'formidable'

export const config = {
  api: {
    bodyParser: false,
  },
}

function parseForm(req) {
  const form = formidable({ multiples: false })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
}

export default async function handler(req, res) {
  const setCors = () => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  }
  if (req.method === 'OPTIONS') {
    setCors()
    return res.status(200).end()
  }
  if (req.method === 'GET') {
    // health check to verify env availability
    setCors()
    return res.status(200).json({
      success: true,
      health: 'ok',
      hasUser: Boolean(process.env.SMTP_USER),
      hasPass: Boolean(process.env.SMTP_PASS),
      from: process.env.MAIL_FROM || process.env.SMTP_USER || null,
    })
  }
  if (req.method !== 'POST') {
    setCors()
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
  try {
    let fields, files
    try {
      const parsed = await parseForm(req)
      fields = parsed.fields
      files = parsed.files
    } catch (e) {
      setCors()
      return res
        .status(400)
        .json({ success: false, error: 'Form parse failed: ' + (e.message || String(e)) })
    }
    const first = (v, d = '') => (Array.isArray(v) ? v[0] : v ?? d)
    const rawTo = fields.to
    const to = first(rawTo) || process.env.MAIL_TO_DEFAULT || process.env.SMTP_USER
    const subject = first(fields.subject, 'No subject')
    const message = first(fields.message, '')

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      setCors()
      return res.status(500).json({ success: false, error: 'SMTP is not configured' })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.qq.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      text: message,
    }

    // Attachment (optional)
    const att = files.attachment && (Array.isArray(files.attachment) ? files.attachment[0] : files.attachment)
    if (att && att.filepath) {
      mailOptions.attachments = [
        {
          filename: att.originalFilename || 'attachment',
          path: att.filepath,
        },
      ]
    }

    const info = await transporter.sendMail(mailOptions)
    setCors()
    return res.status(200).json({ success: true, id: info.messageId })
  } catch (e) {
    console.error('send-email error:', e)
    setCors()
    return res.status(500).json({ success: false, error: e.message || String(e) })
  }
}


