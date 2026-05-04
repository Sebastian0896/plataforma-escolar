const config = {
  typescript: {
    ignoreBuildErrors: true,
  },

  async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'no-store, must-revalidate' },
        { key: 'Pragma', value: 'no-cache' },
        { key: 'Expires', value: '0' },
      ],
    },
  ]
},
}





export default config