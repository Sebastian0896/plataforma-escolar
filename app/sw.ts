self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  // 🚫 NO cachear nada de autenticación ni APIs
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/api/auth')
  ) {
    return
  }

  // 🚫 No cachear navegación HTML (evita sesiones rotas)
  if (event.request.mode === 'navigate') {
    return
  }

  // ✅ Solo cachear recursos estáticos
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response

      return fetch(event.request).then((fetchResponse) => {
        // Solo cachear GET y recursos estáticos
        if (event.request.method === 'GET') {
          return caches.open('v1').then((cache) => {
            cache.put(event.request, fetchResponse.clone())
            return fetchResponse
          })
        }

        return fetchResponse
      })
    })
  )
})