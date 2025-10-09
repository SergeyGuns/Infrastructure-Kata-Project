import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = ({ children }) => {
  const { user, logout } = useAppContext();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Don't show navigation links on login/register pages
  const hideNavLinks = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="nav-brand">Infrastructure Kata</Link>
          {!hideNavLinks && (
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
              </li>
              {user ? (
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Infrastructure Kata. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout