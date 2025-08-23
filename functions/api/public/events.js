export const onRequestGet = async () => {
  const events = [
    { id: 101, title: 'Community Health Day', description: 'Free health check-ups and health lectures.', date: '2025-08-05', location: 'Community Hospital' },
    { id: 102, title: 'Interest Group Exchange', description: 'Meet new friends and share interests.', date: '2025-08-12', location: 'Community Activity Room' },
  ]
  return new Response(JSON.stringify({ success: true, data: events }), { status: 200, headers: { 'content-type': 'application/json' } })
}


