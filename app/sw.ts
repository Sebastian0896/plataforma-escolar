self.addEventListener('install', () => {
  // No hacer nada, esperar a que el usuario cierre pestañas
})

self.addEventListener('activate', (event) => {
  // Limpiar caches viejos
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        return caches.open('v1').then((cache) => {
          cache.put(event.request, fetchResponse.clone())
          return fetchResponse
        })
      })
    })
  )
})