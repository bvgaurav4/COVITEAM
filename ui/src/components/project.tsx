import { useState , useEffect,useRef} from 'react';
import Demo2 from '../test.tsx';
import getGroup from '../test.tsx';
import Message from './message.tsx';
import { Prism } from '@mantine/prism';

  import {
  AppShell,
  Navbar,
  Header,
  Footer,
Group,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  FileButton,
  Button,
  MantineProvider,
  TextInput,
  ScrollArea
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { getUserEmail,logout } from '../login.tsx';

import { endpoint } from './config';


export const endpoints = endpoint
export default function Projectpage() {
    const [file, setFile] = useState<File | null>(null);
    const resetRef = useRef<() => void>(null);
  
    const clearFile = () => {
      setFile(null);
      resetRef.current?.();
    };
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [sending_message, setPassword] = useState('');
  const [members, setMembers] = useState(null);
  const [messages, setMessages] = useState(null);
  const userEmail = getUserEmail();
  const [opened, setOpened] = useState(false);
  const group_id = localStorage.getItem('group_id');
  const title = localStorage.getItem('group_name');
  const viewport = useRef(null);
  console.log(file)
  const lol=`import React from 'react'
  import ReactDOM from 'react-dom/client'
  import AuthenticationTitle  from './login.tsx'
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
  import ForgotPassword from './forgot.tsx'
  import Demo from './app2.tsx'
  import './index.css'
  import Group from './components/group.tsx'
  import GameOfLife from './components/gameoflife.tsx'
  import Creating from './components/creating_user.tsx'
  import Projectpage from './components/project.tsx'
  
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
          <Route path="/signup" element={<Creating/>} />
          <Route path="/project" element={<Projectpage/>} />
  
        </Routes>
      </Router>
    </React.StrictMode>
    ,
  )`

 


   const handlelogoClick = () => {
    console.log('Div clicked!');
    navigate('/home')
    window.location.reload();
  };
  
  function handleLogout(){
      logout();
      navigate('/login');
  }   
  async function nope(table, group_id) {
    const response = await fetch(`${endpoints}/custom_returnin_query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "query": `select * from works_on join users on works_on.SRN=users.SRN where works_on.project_id="${group_id}" and works_on.permission_level>0;` }),
    });
  
    console.log(response);
    return response.json();
  }
      async function nope2(table,group_id) {
        const response = await fetch(`${endpoints}/home`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "table":`${table}`,"condition":`group_id="${group_id}"  order by timestamp` }),
        });
        console.log(response);
        return response.json();
      }

      const nope3 = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('project_id', group_id);  
        formData.append('user_id', userEmail);
        const response = await fetch(`${endpoints}/file_upload  `, {
          method: 'POST',
          body: formData,
        });
        console.log(response);
        return response.text();
      }
  function calling(){    
    console.log('ok')
    console.log(sending_message)
    nope3().then(async (data) => {
      console.log(data);
       });  
  }
  function oj() {
    //sending message function
    console.log('ok')
    console.log(sending_message)
    nope3().then(async (data) => {
      console.log(data);
       });
  }
  if (userEmail == null) {
    navigate('/');
  }
  useEffect(() => {
    console.log("useeffects")
    
    nope('joins',group_id).then((data) => {
      setMembers(data.body);
    });
    nope2('messages',group_id).then((data) => {
      setMessages((data.body));
    });
    
    
  }, []);
  return (
    <MantineProvider theme={{colorScheme:'dark'}}>
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="md" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Button variant="outline" color="violet" size='xl' >hello {title}</Button>
          <Text color='white'>Description:</Text>
          <Text color='white'>Group ID:{group_id}</Text>
          <Text color='white'>Description:</Text>
          <Text color='white' align='center'>Members:</Text>
              <br></br>
          <ScrollArea h={1000}>
          {JSON.parse(members)  && JSON.parse(members).map((prog,index) => (
            <Demo2  key={prog.group_id} title={prog.Name}  href={'nones'} group_id={prog.group_id} namess='SRN' group_id={prog.SRN} />
          )
          )}
            </ScrollArea>

    </Navbar>
      }
      footer={
        <Footer height={100} p="md">
          <div style={{display: 'flex', height: '100%' ,justifyContent:'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', height: '100%' ,justifyContent:'space-between'}}>
          <div><Button variant="transparent" color="violet" onClick={handleLogout }>logout/change account</Button>
            </div>
            <img src='/vite.svg' className='logo'></img>
          <Text color='white'>{userEmail}</Text>
          </div>
            <div style={{display: 'flex', height: '100%' ,justifyContent:'space-between'}}>
            <Button variant="outline" color="violet" onClick={oj}>About us</Button>
            </div>
            </div>        </Footer>
      }
      header={
        <Header height={{ base: 100, md: 100 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent:'space-between' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <div className='logoplus' onClick={handlelogoClick}>
            <img src='/vite.svg' className='logo'></img>
            <Text fw={500} size="xl" color='violet'>COVITEAM</Text></div>
            <TextInput radius="xl" placeholder="search " />
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] , display:"flex", flexDirection:"column", justifyContent:"space-between" ,flexWrap:"wrap"},
      })}
    >

<Prism language="tsx" >{lol}</Prism>
<>
      <Group justify="center">
        <FileButton resetRef={resetRef} onChange={setFile} accept=""> 
          {(props) => <Button {...props}>Upload file</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm" color='violet'>
          Picked file: {file.name}
        </Text>
      )}
      <Button onClick={calling}>sending</Button>
    </>     
    </AppShell>
    </MantineProvider>
  );
}
