import { useState , useEffect} from 'react';
import Demo2 from './test.tsx';
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
  TextInput
} from '@mantine/core';
import  Creategroup from "./components/create_group.tsx"
import Notifi from "./components/notification.tsx"
import  Createproject from "./components/create_project.tsx"
import { getUserEmail,logout } from './login.tsx';
import { Notification } from '@mantine/core';
import './App.css';
import { useNavigate } from 'react-router-dom';


export const endpoints = 'http://localhost:4000'

export default function AppShellDemo() {
  const navigate = useNavigate();
  const userEmail = getUserEmail();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  var [projects, setProjects] = useState(null);
  var [groups, setGroups] = useState(null);
  var [noti, setNoti] = useState(null);
  if (userEmail == null) {
    navigate('/');
  }
  const getgrops = async () => {
    const response = await fetch(`${endpoints}/getgrps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify({"email":  `${userEmail}`}),
    });
    if (response.ok) {
      const data = await response.json();
      return data.body;
    } else {
      console.log('Request failed');
      return null;
    }
   
  }
  const getnoti = async () => {
    const response = await fetch(`${endpoints}/getnoti`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify({"email":  `${userEmail}`}),
    });
    if (response.ok) {
      const data = await response.json();
      return data.body;
    } else {
      console.log('Request failed');
      return null;
    }
  }
  const getproj = async () => {
    const response = await fetch(`${endpoints}/getproj`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify({"email":  `${userEmail}`}),
    });
    if (response.ok) {
      const data = await response.json();
      return data.body;
    } else {
      console.log('Request failed');
      return null;
    }
   
  }
  useEffect(() => {
    getproj().then((data) => {
      setProjects(null)
      setProjects(data);
    });
    getgrops().then((data) => {
      console.log(data)

      setGroups(null)
      setGroups(data);
    });
    getnoti().then((data) => {
      setNoti(null)
      setNoti(data);
    });
  }, []);

function handleLogout(){
  logout();
  navigate('/login');
}
  function handleProject(){
    setShowGroups(false);
    setShowProjects(true);
  }

  function handleGroup(){
    setShowGroups(true);
    setShowProjects(false);
  }


  function oj(){
    console.log('ok')
  }


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
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 400, lg: 300}} >
          <Button variant="outline" color="violet" onClick={handleProject}>Your projects</Button>
          <br></br>
          <Button variant="outline" color="violet" onClick={handleGroup}>Your groups</Button>
          <br></br>
          <Button variant="outline" color="violet" onClick={oj}>Recommended projects</Button> 
          <br></br>
          <Button variant="outline" color="violet" onClick={oj}>Recommended groups</Button>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }} closeButtonProps={{ 'aria-label': 'Hide notification' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 400 }} >
            <Notification color="violet" title="We notify you that">
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>
      <br></br>
   
      {JSON.parse(noti) && JSON.parse(noti).map((prog,index) => (
            <Notifi  key={prog.group_id} title={prog.group_id} description={prog.SRN} name={prog.name} href={'nones'} badgeText={'none'} />
          )
          )}


          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={100} p="md" >
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
            </div>

        </Footer>
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
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
      })}
    >
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly" ,flexWrap:"wrap"}}>
      {JSON.parse(projects) && showProjects && JSON.parse(projects).map((prog,index) => (
            <Demo2  key={prog.project_id} title={prog.project_id} description={prog.description} href={'nones'}  />
          )
          )}
          {JSON.parse(groups) && showGroups && JSON.parse(groups).map((group, index) => (
            <Demo2 title={group.name} description={'none'} href={'nones'} key={group.group_id} group_id={group.group_id}  />
          ))}
     { (showGroups) &&  <Creategroup/>}
     { (showProjects) &&  <Createproject/>}
      </div>          
    </AppShell>
    </MantineProvider>
  );
}