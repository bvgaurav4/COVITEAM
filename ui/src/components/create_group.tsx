import { Modal, Group, Button,MantineProvider,Container,Title,Paper,TextInput} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { endpoint } from './config';

const endpoints = endpoint

function CreateGroup() {
    const navigate = useNavigate();
  
  const [Group_name, setGrpname] = useState('');
  const [email, setEmail] = useState('');

  const [opened, { open, close }] = useDisclosure(false);
  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const response = await fetch(`${endpoints}/newgroup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,Group_name }),
    });
    console.log(response);
    if (response.ok) {
          navigate('/home');
    window.location.reload();
      
    } else {
      console.log('Request failed');
    }
  }
    
    return (
    <MantineProvider theme={{colorScheme:'dark'}}>
    <Modal opened={opened} onClose={close} withCloseButton={false} centered transitionProps={{ transition: 'rotate-left' }}>
    <form>
    <Container size={500} my={40} >
      <Title ta="center" className='title' color='white'>
        New Group
      </Title>


      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Email" placeholder="your@gmail.com" mt="md" required value={email} onChange={(e)=>setEmail(e.currentTarget.value)}  />
        <TextInput label="Group Name" placeholder="Mentos" required value={Group_name} onChange={(e)=>setGrpname(e.currentTarget.value)} />

        <Group justify="space-between" mt="lg">
        </Group>
        <Button fullWidth mt="xl" onClick={handleSubmit} >
          Create
        </Button>
      </Paper>
    </Container>
    </form>
    </Modal>
 
    <Group position="right">
      <Button variant="default"  onClick={open}  radius="md" style={{width:"250px",height:"260px "}}></Button>
    </Group></MantineProvider>
  )
}export default CreateGroup 
























