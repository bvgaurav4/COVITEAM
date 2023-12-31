import { useState , useEffect} from 'react';
import Demo2 from './test.tsx';
import { Avatar } from '@mantine/core';

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
  ScrollArea,
} from '@mantine/core';
import  Creategroup from "./components/create_group.tsx"
import Notifi from "./components/notification.tsx"
import  Createproject from "./components/create_project.tsx"
import { getUserEmail,logout } from './login.tsx';
import { Notification } from '@mantine/core';
import './App.css';
import { useNavigate } from 'react-router-dom';
import {endpoint} from './components/config';
import SearchComponent from './components/search_component.tsx';
export const endpoints = endpoint

export default function AppShellDemo() {
  const navigate = useNavigate();

  const userEmail = getUserEmail();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const[showallprojects,setShowallprojects]=useState(false);
  const[showallgroups,setShowallgroups]=useState(false);
  const[allprojects,setallprojects]=useState(null);
  const[allgroups,setallgroups]=useState(null);
  var [projects, setProjects] = useState(null);
  var [groups, setGroups] = useState(null);
  var [noti, setNoti] = useState(null);
  if (userEmail == null) {
    navigate('/');
  }
  const handlelogoClick = () => {
    // Do something when the div is clicked

    console.log('Div clicked!');
    navigate('/home')
    window.location.reload();
  };
  
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
  // const getallprojs = async () => {
  //   const response = await fetch(`${endpoints}/home`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ "table":`Projects`,"condition":`group_id="${group_id}"  order by timestamp` }),
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(data)
  //     return data.body;
  //   } else {
  //     console.log('Request failed');
  //     return null;
  //   }
   
  // }
  const getallgroupsorprojects = async (table: string,condition: string) => {
    const response = await fetch(`${endpoints}/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "table":`${table}`,"condition":`${condition}` }),
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
    getnoti().then((data) => {
      setNoti(null)
      setNoti(data);
    });
    getallgroupsorprojects("users",`email="${userEmail}"`).then((data) => {
      console.log("all projects");
      localStorage.setItem('srn', JSON.parse(data)[0].SRN);
    });
  }, []);

function handleLogout(){
  logout();
  navigate('/login');
}
  function handleProject(){
    getproj().then((data) => {
      console.log("custom projects");
      setProjects(data);
    });
    setShowGroups(false);
    setShowallgroups(false);
    setShowallprojects(false);
    setShowProjects(true);
  }
  function handleAllProject(){
    console.log("recommended projects clicked")
    getallgroupsorprojects("projects","1").then((data) => {
      console.log("all projects");
      setallprojects(data);
    });
    setShowGroups(false);
    setShowProjects(false);
    setShowallgroups(false);
    setShowallprojects(true);
  }
  function handleGroup(){
    getgrops().then((data) => {
      console.log("custom groups");
      setGroups(data);
    });
    setShowGroups(true);
    setShowProjects(false);
    setShowallgroups(false);
    setShowallprojects(false);
  }
  function handleAllGroup(){
    console.log("recommended groups clicked")
    getallgroupsorprojects("study_groups","1").then((data) => {
      setallgroups(data);
    });
    setShowallgroups(true);
    console.log(allprojects, allgroups)
    setShowallprojects(false);
    setShowGroups(false);
    setShowProjects(false);
  }


  function oj(){
    navigate('/home');
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
          <Button variant="outline" color="violet" onClick={handleAllProject}>Recommended projects</Button> 
          <br></br>
          <Button variant="outline" color="violet" onClick={handleAllGroup}>Recommended1 groups</Button>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }} >
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 400 }} >
          <ScrollArea h={600}>
            <Notification color="violet" title="Welcome to Coviteam: Collaborative Team Network" onClose={close}>
You can now create your projects , Study groups in order to collaborate with others      </Notification>
      <br></br>
   
      {JSON.parse(noti) && JSON.parse(noti).map((prog,index) => (
            <Notifi  key={prog.group_id} title={prog.group_id} description={prog.SRN} name={prog.name} href={'nones'} badgeText={'none'} />
          )
          )}</ScrollArea>


          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={100} p="md" >
          <div style={{display: 'flex', height: '100%' ,justifyContent:'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', height: '100%' ,justifyContent:'space-between'}}>
          <div><Button variant="transparent" color="violet" onClick={handleLogout }>logout/change account</Button>
            </div>
            <Avatar radius="xl" />

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
            <div className='logoplus' onClick={handlelogoClick}>
            <img src='/vite.svg' className='logo' onClick={oj}></img>
              <Text fw={500} size="xl" color='violet'>COVITEAM</Text>
            </div>
            <SearchComponent></SearchComponent>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]},
      })}
    >
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly" ,flexWrap:"wrap"}}>
      {JSON.parse(projects) && showProjects && JSON.parse(projects).map((prog,index) => (
            <Demo2  key={prog.project_id} title={prog.project_name} description={prog.description} href={'nones'} group_id={prog.project_id} namess='project_name' />
          )
          )}
          {JSON.parse(groups) && showGroups && JSON.parse(groups).map((group, index) => (
            <Demo2 title={group.name} description={group.description} href={'nones'} key={group.group_id} group_id={group.group_id} table='study_groups' ids='group_id' />
          ))}
          {JSON.parse(allprojects) && showallprojects && JSON.parse(allprojects).map((prog,index) => (
            <Demo2  key={prog.project_id} title={prog.project_name} description={prog.description} href={'nones'} group_id={prog.project_id} namess='project_name' states='request' reqtable='works_on(project_id,SRN,permission_level)' />
          )
          )}
          {JSON.parse(allgroups) && showallgroups && JSON.parse(allgroups).map((group, index) => (
            <Demo2 title={group.name} description={group.description} href={'nones'} key={group.group_id} group_id={group.group_id} table='study_groups' ids='group_id' states='request'/>
          ))}
     { (showGroups) &&  <Creategroup/>}
     { (showProjects) &&  <Createproject/>}
      </div>          
    </AppShell>
    </MantineProvider>
  );
}





















































