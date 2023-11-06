import { useState } from 'react'
import {MantineProvider, Modal, Button, TextInput, Textarea, useMantineTheme} from '@mantine/core'
import './App.css'
import { ActionIcon } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { IconSettings } from '@tabler/icons-react';
import CreateGroup from './components/create_group'
import CreateProject from './components/create_project'
import {Box} from '@mantine/core'
import { SearchIcon } from '@primer/octicons-react'
import Lol from './test.tsx'
export const endpoints = 'https:localhost:4000/'
const fetcher = (url: string) => fetch(`${endpoints}/${url}`).then((res) => res.json())

function App() {

  return (
    <div>
        <nav className="navbar">
  <a href="/home"><img src='/vite.svg' className='logo'></img></a>
  <a href="/login">Login</a>
  <a href="/login">Login/ sign up</a>
  <ActionIcon variant="default"><IconSettings size="1rem" /></ActionIcon>
        </nav>
  <CreateGroup />
  <CreateProject />
        <MantineProvider theme={{colorScheme:'dark'}}>
        <Box>
        <div style={{top:'100px',left:'0px', position:"absolute"}}>
        <Lol/>
        </div>  
        </Box>
        </MantineProvider>
    </div>
  )
}

export default App
