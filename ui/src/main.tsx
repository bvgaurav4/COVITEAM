import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LoginPage from './login.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './test.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
    {/* the above coed works just trying someother thing */}
  </React.StrictMode>,
)