const CACHE_NAME = 'v2' // 🔥 Cambia versión para invalidar caches viejos

self.addEventListener('install', (event) => {
  // Activar inmediatamente el nuevo SW
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key)
          }
        })
      )
    )
  )

  // Tomar control inmediato de todas las pestañas
  return self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // 🚫 NO cachear APIs ni autenticación
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/api/auth')
  ) {
    return
  }

  // 🚫 NO cachear navegación HTML (evita sesiones viejas)
  if (event.request.mode === 'navigate') {
    return
  }

  // ✅ Solo cachear GET (assets estáticos)
  if (event.request.method !== 'GET') {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response

      return fetch(event.request).then((fetchResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, fetchResponse.clone())
          return fetchResponse
        })
      })
    })
  )
})