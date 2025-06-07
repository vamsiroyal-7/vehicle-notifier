addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Only POST requests allowed', { status: 405, headers: { 'Content-Type': 'text/plain' } })
  }

  try {
    const { message } = await request.json()
    const phone = '918096266377' // Your phone number

    if (!message) {
      return new Response('Missing "message" in request body', { status: 400, headers: { 'Content-Type': 'text/plain' } })
    }

    const authKey = '455249AuuOrLL4tF68440ce5P1' // Your MSG91 auth key

    // MSG91 legacy API URL
    const url = `https://api.msg91.com/api/sendhttp.php?authkey=${authKey}&mobiles=${phone}&message=${encodeURIComponent(message)}&sender=MSGIND&route=4&country=91`

    const resp = await fetch(url, { method: 'GET' })
    const respText = await resp.text()

    if (!resp.ok) {
      return new Response('MSG91 API Error: ' + respText, { status: 502, headers: { 'Content-Type': 'text/plain' } })
    }

    return new Response('SMS sent successfully: ' + respText, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500, headers: { 'Content-Type': 'text/plain' } })
  }
}
