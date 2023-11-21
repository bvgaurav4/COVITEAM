import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import { Box } from '@mantine/core';
import endpoint from './endpoint';

export const endpoints = endpoint

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(`Logging in with username: ${username} and password: ${password}`);

    const response = await fetch(`${endpoints}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(response);
  }


  return (
    <Box> 
    <div className='login-container'>
      <form onSubmit={handleSubmit} className='login-form'>
      <h2>Login</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div></Box>
  );
}

export default LoginPage;