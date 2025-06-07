addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Only POST requests allowed', { status: 405 })
  }

  try {
    const { message } = await request.json()
    const phone = '918096266377'

    if (!message) {
      return new Response('Missing message in request body', { status: 400 })
    }

    const authKey = '455249AuuOrLL4tF68440ce5P1'

    // Legacy single SMS API URL
    const url = `https://api.msg91.com/api/sendhttp.php?authkey=${authKey}&mobiles=${phone}&message=${encodeURIComponent(message)}&sender=MSGIND&route=4&country=91`

    const resp = await fetch(url, { method: 'GET' })

    if (!resp.ok) {
      const errText = await resp.text()
      return new Response('MSG91 API Error: ' + errText, { status: 502 })
    }

    return new Response('SMS sent successfully', { status: 200 })
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500 })
  }
}
