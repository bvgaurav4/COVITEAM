import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  MantineProvider,
} from '@mantine/core';
import './login.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
const endpoints = 'http://localhost:4000'
const userEmail = localStorage.getItem('user');
export function getUserEmail() {
  return localStorage.getItem('user');
}
export function logout() {
  userEmail==null;
  localStorage.removeItem('user');

}
export default function AuthenticationTitle() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch(`${endpoints}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    });
    console.log(response)
    if (response.ok) {
      console.log('login successful');
      localStorage.setItem('user', email);
      navigate('/home');

    } else {
      console.log('login failed');
      navigate('/forgot');
    }
   
  }
  return (
    <MantineProvider theme={{colorScheme:'dark'}}>
      <form>
    <Container size={500} my={40} >
      <Title ta="center" className='title' color='white'>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required value={email} onChange={(e)=>setEmail(e.currentTarget.value)} />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} on onChange={(e)=>setPassword(e.currentTarget.value)}/>
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <a href='/forgot'>Forgot password?</a>

        </Group>
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
      </Paper>
    </Container>
    </form>
    </MantineProvider>
  );
}