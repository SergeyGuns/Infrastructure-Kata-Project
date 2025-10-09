import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import apiClient from '../services/api'
import authService from '../services/authService'

const Home = () => {
  const { backendData, authStatus, setBackendData, setAuthStatus, setLoading, setError } = useAppContext()

  useEffect(() => {
    setLoading(true);
    
    // Fetch data from backend service
    apiClient.get('/api/hello')
      .then(res => {
        setBackendData(res.data);
      })
      .catch(err => {
        console.error('Error fetching backend data:', err);
        setError(err.message);
      });

    // Check auth status
    authService.getStatus()
      .then(data => {
        setAuthStatus(data);
      })
      .catch(err => {
        console.error('Error checking auth status:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setBackendData, setAuthStatus, setLoading, setError])

  return (
    <div className="container">
      <main>
        <h1 className="title">
          Welcome to <a href="https://github.com/microsoft/infrastructure-katas">Infrastructure Kata!</a>
        </h1>

        <p className="description">
          Get started by editing <code>src/components/Home.jsx</code>
        </p>

        <div className="grid">
          <div className="card">
            <h3>Backend Data</h3>
            <p>{backendData ? JSON.stringify(backendData) : 'Loading...'}</p>
          </div>

          <div className="card">
            <h3>Auth Status</h3>
            <p>{authStatus ? JSON.stringify(authStatus) : 'Loading...'}</p>
          </div>
        </div>
      </main>

      <footer className="footer">
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          Powered by Vite
        </a>
      </footer>
    </div>
  )
}

export default Home