import { useState , useEffect} from 'react';
import Demo2 from '../test.tsx';
import  getGroup  from '../test.tsx';
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
  
  const group_id =getGroup();
  console.log(group_id);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const userEmail = getUserEmail();
  const [opened, setOpened] = useState(false);
  function handleLogout(){
      logout();
      navigate('/login');
  }   
  console.log(group_id);
  async function nope(table,group_id) {
        const response = await fetch(`${endpoints}/home`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "table":`${table}`,"condition":`group_id="${group_id}"` }),
        });
        console.log(response);
        return response.json();
      }
      const [members, setMembers] = useState(null);
      const [group, setGroup] = useState(null);

  function oj(){
    console.log('ok')
  }
  if (userEmail == null) {
    navigate('/');
  }
  useEffect(() => {
    nope("joins",group_id).then((data) => {
      console.log(group_id);
      setMembers(data);
    });
    nope("groups",group_id).then((data) => {
      setGroup(data);
    });

  }, []);
  console.log(members);
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
              <Button variant="outline" color="violet" >Your groups</Button>
          <ScrollArea h={1000}>
          <Button variant="outline" color="violet" >Your groups</Button>
          <Button variant="outline" color="violet" >Your groups</Button>
            </ScrollArea>

    </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 400 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Button variant="outline" color="violet" >Your groups</Button>
              <Button variant="outline" color="violet" >Your projects</Button>
            </div>
          </Aside>
        </MediaQuery>
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
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between" ,flexWrap:"wrap", padding:''}}>
        <div >
        <Demo2></Demo2>
        <Demo2></Demo2>
  
        </div>
      </div>          
        <TextInput placeholder='message' style={{width:'100%', position:'fixed', bottom:'100px'}}></TextInput>
        <Button style={{right:'400px', bottom:'100px' ,position:'fixed'}}></Button>
    </AppShell>
    </MantineProvider>
  );
}