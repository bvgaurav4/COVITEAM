import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useSWR from 'swr'

export const endpoints = 'https:localhost:4000/'
const fetcher = (url: string) => fetch(`${endpoints}/${url}`).then((res) => res.json())

function App() {

  return (
      <body>
        <nav className="navbar">
  <a href="/about"><img src='/vite.svg' className='logo'></img></a>
  <a href="/">Home</a>
  <a href="/contact">Contact</a>
  <a href="/login">Login</a>
  <a href="/login">Login/ sign up</a>
  <a href="/create_grp">create group</a>
  <a href="/create_proj">create project</a>


</nav>
      </body>
  )
}

export default App
