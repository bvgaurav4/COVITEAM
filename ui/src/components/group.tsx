import { useState , useEffect,useRef} from 'react';
import Demo2 from '../test.tsx';
import  getGroup  from '../test.tsx';
import Message from './message.tsx';
  import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Button,
  MantineProvider,
  TextInput,
  ScrollArea
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { getUserEmail,logout } from '../login.tsx';

import { endpoint } from './config';


export const endpoints = endpoint
export default function Group() {
  
  const group_id = localStorage.getItem('group_id');
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [sending_message, setPassword] = useState('');
  const [members, setMembers] = useState(null);
  const [messages, setMessages] = useState(null);
  const userEmail = getUserEmail();
  const [opened, setOpened] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);

  function handleLogout(){
      logout();
      navigate('/login');
  }   
  async function nope(table,group_id) {
        const response = await fetch(`${endpoints}/home`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "table":`${table}`,"condition":`group_id="${group_id}" and state=1` }),
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
      const scrollToBottom = () =>
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' });
      async function nope3() {
        const response = await fetch(`${endpoints}/custom_nonreturn_query`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "query":`call messaging("${group_id}","${userEmail}","${sending_message}")` }),
        });
        console.log(response);
        return response.json();
      }
  function oj(){
    console.log('ok')
    console.log(sending_message)
    nope3().then((data) => {
      console.log(data.body)
      setMessages(data.body);
    });
          window.location.reload();

  }
  if (userEmail == null) {
    navigate('/');
  }
  useEffect(() => {
    nope('joins',group_id).then((data) => {
      setMembers(data.body);
    });
    nope2('messages',group_id).then((data) => {
      setMessages(data.body);
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
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
              <Button variant="outline" color="violet" >{group_id}</Button>
          <ScrollArea h={1000}>
          {JSON.parse(members)  && JSON.parse(members).map((prog,index) => (
            <Demo2  key={prog.group_id} title={prog.SRN}  href={'nones'} group_id={prog.group_id} namess='SRN' />
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
            <div>
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
          <ScrollArea h={600} viewportRef={viewport}>
          {JSON.parse(messages) && JSON.parse(messages).map((group, index) => (
        <div >
        <Message description={group.message}  table="groups" ids="group_id" namess={group.sender} />  
      </div>          ))}
    </ScrollArea>


      <div style={{display:"flex", position:"fixed",right:"2em", bottom:"6.5em"}}>
        <TextInput placeholder='message' style={{width:'70em'}} value={sending_message} onChange={(e)=>setPassword(e.currentTarget.value)}></TextInput>
        <Button onClick={oj}>send</Button>
        <Button onClick={scrollToBottom} variant="outline">
          Scroll to bottom
        </Button>
        </div>        
    </AppShell>
    </MantineProvider>
  );
}