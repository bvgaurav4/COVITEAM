import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import LoginPage from './login.tsx'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <App />
        </Route>
      </Switch>
    </Router> */}
    {/* <LoginPage/> */}
    <App />
  </React.StrictMode>,
)
