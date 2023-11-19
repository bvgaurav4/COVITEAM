import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthenticationTitle  from './login.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ForgotPassword from './forgot.tsx'
import Demo from './app2.tsx'
import './index.css'
import Group from './components/group.tsx'
import GameOfLife from './components/gameoflife.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticationTitle/>} />
        <Route path="/login" element={<AuthenticationTitle />} />
        <Route path="/home" element={<Demo />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/group" element={<Group />} />
        <Route path="/game" element={<GameOfLife />} />
      </Routes>
    </Router>
  </React.StrictMode>
  ,
)