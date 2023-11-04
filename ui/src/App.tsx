import { useState } from 'react'
import {MantineProvider, Modal, Button, TextInput, Textarea, Group, useMantineTheme} from '@mantine/core'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useSWR from 'swr'
import CreateGroup from './components/create_group'
import {Box} from '@mantine/core'
export const endpoints = 'https:localhost:4000/'
const fetcher = (url: string) => fetch(`${endpoints}/${url}`).then((res) => res.json())

function App() {

  return (
      <div>
        <nav className="navbar">
  <a href="/about"><img src='/vite.svg' className='logo'></img></a>
  <a href="/">Home</a>
  <a href="/contact">Contact</a>
  <a href="/login">Login</a>
  <a href="/login">Login/ sign up</a>
  <CreateGroup/>
  <a href="/create_proj">create project</a>
<Box>lol nice try</Box>
  
</nav>

</div>
  )
}

export default App
