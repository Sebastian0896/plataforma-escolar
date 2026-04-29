self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open('v1').then((cache) => {
          if (fetchResponse.ok) {
            cache.put(event.request, fetchResponse.clone())
          }
          return fetchResponse
        })
      })
    })
  )
})