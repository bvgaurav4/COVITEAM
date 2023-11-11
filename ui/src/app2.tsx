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
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

export const endpoints = 'http://localhost:4000'

export default function AppShellDemo() {


  var groups = ['Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5'," lol"];
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  var [projects, setProjects] = useState(null);

  const handleLogin = async (table) => {
    const response = await fetch(`${endpoints}/home`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify({"table":  `${table}`}),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return data.body;
    } else {
      console.log('Request failed');
      return null;
    }
   
  }
  projects = handleLogin("project");


  function handleProject(){
    setShowGroups(false);
    setShowProjects(true);
  }

  function handleGroup(){
    handleLogin("groups");
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
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} >
          <Text>Application navbar</Text>
          <Button variant="outline" color="violet" onClick={handleProject}>Your projects</Button>
          <Button variant="outline" color="violet" onClick={handleGroup}>Your groups</Button>
          <Button variant="outline" color="violet" onClick={oj}>Recommended projects</Button>
          <Button variant="outline" color="violet" onClick={oj}>Recommended groups</Button>


        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={60} p="md">
          Application footer
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
    >
      <div style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly" ,flexWrap:"wrap"}}>
      {showProjects && projects.map((index) => (
            <Demo2 key={index}  />
          ))}
          {showGroups && groups.map((group, index) => (
            <Demo2 key={index} group={group} />
          ))}
      </div>
    </AppShell></MantineProvider>
  );
}