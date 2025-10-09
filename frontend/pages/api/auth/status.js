// Next.js API route for auth status

export default function handler(req, res) {
  res.status(200).json({ 
    authenticated: false,
    message: 'Auth service not implemented yet'
  })
}