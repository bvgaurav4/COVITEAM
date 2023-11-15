import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AuthenticationTitle  from './login.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ForgotPassword from './forgot.tsx'
import Demo from './app2.tsx'
import './index.css'
import Group from './components/group.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationTitle/>} />
        <Route path="/login" element={<AuthenticationTitle />} />
        <Route path="/home" element={<Demo />} />
        <Route path="/home1" element={<App />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/group" element={<Group />} />
      </Routes>
    </Router>
    {/* the above coed works just trying someother thing */}
  </React.StrictMode>
  ,
)