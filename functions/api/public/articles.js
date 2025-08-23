export const onRequestGet = async () => {
  const articles = [
    { id: 1, title: 'Healthy Eating Guide', description: 'Tailored healthy eating advice for seniors.', date: '2025-07-01', location: 'Online' },
    { id: 2, title: 'Mental Health Workshop', description: 'Focus on mental health and happiness.', date: '2025-07-10', location: 'Community Center' },
  ]
  return new Response(JSON.stringify({ success: true, data: articles }), { status: 200, headers: { 'content-type': 'application/json' } })
}


