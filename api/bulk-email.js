// Vercel Serverless Function: bulk email via QQ SMTP (Nodemailer)
import nodemailer from 'nodemailer'
import formidable from 'formidable'

export const config = { api: { bodyParser: false } }

function parseForm(req) {
  const form = formidable({ multiples: false })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })))
  })
}

export default async function handler(req, res) {
  const setCors = () => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  }
  if (req.method === 'OPTIONS') { setCors(); return res.status(200).end() }
  if (req.method !== 'POST') { setCors(); return res.status(405).json({ success:false, error:'Method not allowed' }) }

  try {
    const { fields, files } = await parseForm(req)
    const toRaw = fields.to_list
    const toList = String(Array.isArray(toRaw) ? toRaw[0] : toRaw || '').split(/\r?\n|,|;/).map(s=>s.trim()).filter(Boolean)
    if (!toList.length) { setCors(); return res.status(400).json({ success:false, error:'No recipients' }) }

    const subject = (Array.isArray(fields.subject) ? fields.subject[0] : fields.subject) || 'No subject'
    const message = (Array.isArray(fields.message) ? fields.message[0] : fields.message) || ''

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      setCors(); return res.status(500).json({ success:false, error:'SMTP not configured' })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.qq.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || 'true') === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const att = files.attachment && (Array.isArray(files.attachment) ? files.attachment[0] : files.attachment)
    const attachments = att && att.filepath ? [{ filename: att.originalFilename || 'attachment', path: att.filepath }] : []

    const sendAll = await Promise.allSettled(toList.map(to => transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      text: message,
      attachments,
    })))

    const successCount = sendAll.filter(r => r.status === 'fulfilled').length
    setCors();
    return res.status(200).json({ success:true, count: successCount })
  } catch (e) {
    setCors();
    return res.status(500).json({ success:false, error: e.message || String(e) })
  }
}


