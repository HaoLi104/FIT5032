// Vercel Serverless Function proxy for Nominatim (to avoid 403 and set proper headers)

export default async function handler(req, res) {
  const setCors = () => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  }
  if (req.method === 'OPTIONS') {
    setCors()
    return res.status(200).end()
  }
  if (req.method !== 'GET') {
    setCors()
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }
  try {
    const { q = '', viewbox = '', bounded = '1', limit = '10' } = req.query || {}
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      String(q),
    )}&limit=${encodeURIComponent(String(limit))}&viewbox=${encodeURIComponent(
      String(viewbox),
    )}&bounded=${encodeURIComponent(String(bounded))}`

    const resUp = await fetch(url, {
      headers: {
        'User-Agent': 'FIT5032-SeniorConnectHub/1.0 (contact: 1045576345@qq.com)',
        'Accept-Language': 'en',
      },
    })
    const text = await resUp.text()
    setCors()
    res.status(resUp.status).setHeader('Content-Type', 'application/json; charset=utf-8')
    return res.send(text)
  } catch (e) {
    setCors()
    return res.status(500).json({ success: false, error: e.message || String(e) })
  }
}



