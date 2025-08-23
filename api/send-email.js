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
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  if (req.method === 'OPTIONS') return res.status(200).set(cors).end()
  if (req.method !== 'POST') return res.status(405).set(cors).json({ success: false, error: 'Method not allowed' })
  try {
    const { fields, files } = await parseForm(req)
    const to = fields.to || process.env.MAIL_TO_DEFAULT
    const subject = fields.subject || 'No subject'
    const message = fields.message || ''

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).set(cors).json({ success: false, error: 'SMTP is not configured' })
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
    if (files.attachment && files.attachment.filepath) {
      mailOptions.attachments = [
        {
          filename: files.attachment.originalFilename || 'attachment',
          path: files.attachment.filepath,
        },
      ]
    }

    const info = await transporter.sendMail(mailOptions)
    return res.status(200).set(cors).json({ success: true, id: info.messageId })
  } catch (e) {
    return res.status(500).set(cors).json({ success: false, error: e.message || String(e) })
  }
}


