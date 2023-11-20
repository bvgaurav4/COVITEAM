import {
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Center,
    Box,
    rem,
    MantineProvider,
    PasswordInput
  } from '@mantine/core';
  import { IconArrowLeft } from '@tabler/icons-react';
  import { Link } from 'react-router-dom';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import './forgot.css';
  const endpoints = 'http://localhost:4000'

  export default  function ForgotPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    async function yup(event: React.FormEvent){
      event.preventDefault();
      const response = await fetch(`${endpoints}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "table":"users" ,"condition":`email="${title}"`, "newvalue":`password="${password}"` }),
      });
    
      console.log("yup");
      if (response.ok){
        console.log('login successful');
        navigate('/login');
      }
    }
    return (

        <MantineProvider theme={{colorScheme:'dark'}}>

      <Container size={500} my={40} >
        <Title className='title' ta="center" color='white'>
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your email" placeholder="me@mantine.dev" required value={title}  onChange={(e)=>setTitle(e.currentTarget.value)}/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password}  onChange={(e)=>setPassword(e.currentTarget.value)}/>
          <Group justify="space-between" mt="lg" className='controls'>
              <Center inline>
              <Link to='/login' >  <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box></Link>
              </Center>
            <Button className='control'  onClick={yup}>Reset password</Button>
          </Group>
        </Paper>
      </Container></MantineProvider>
    );
  }

  
  