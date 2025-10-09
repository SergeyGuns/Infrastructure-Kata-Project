// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ 
    name: 'Frontend Service',
    timestamp: new Date().toISOString(),
    services: {
      backend: process.env.BACKEND_URL || 'http://localhost:4000',
      auth: process.env.AUTH_URL || 'http://localhost:5000'
    }
  })
}