import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

function App() {
  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App