import { Modal, Group,Box, Button,MantineProvider} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './create_group.css'
import myImage from "./doodles1.jpg";
import { useState } from 'react';
const endpoints = 'https:localhost:4000/'

function CreateGroup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(`Logging in with username: ${username} and password: ${password}`);

    const response = await fetch(`${endpoints}newgroup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(response);
  }
    const [opened, { open, close }] = useDisclosure(false);
    return (
    <MantineProvider theme={{colorScheme:'dark'}}>
    <Modal opened={opened} onClose={close} title="Create a new group" withCloseButton={false} centered transitionProps={{ transition: 'rotate-left' }}>
      <Box>
        <form onSubmit={handleSubmit} >
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label><br></br>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label><br></br>
        <button type="submit">Login</button>
      </form>
      </Box>
    </Modal>
 
    <Group position="right">
    <Button onClick={open}>Create group</Button>
    </Group></MantineProvider>
  )
}export default CreateGroup 