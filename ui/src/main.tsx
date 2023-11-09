import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AuthenticationTitle  from './login.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Demo2 from './test.tsx'
import Landing from './components/Landing.tsx'
import ForgotPassword from './forgot.tsx'
import Demo from './app2.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationTitle/>} />
        <Route path="/login" element={<AuthenticationTitle />} />
        <Route path="/home" element={<Demo />} />
        <Route path="/home1" element={<App />} />
        <Route path="/forgot" element={<ForgotPassword />} />
      </Routes>
    </Router>
    {/* the above coed works just trying someother thing */}
  </React.StrictMode>
  ,
)