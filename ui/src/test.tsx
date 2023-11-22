import { Card, Image, Text, Badge, Button, Group,Modal, TextInput } from '@mantine/core';
import { Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import {endpoint} from './components/config';


import { useNavigate } from 'react-router-dom';
const endpoints = endpoint
export function getGroups() {
  console.log("whhat is this",localStorage.getItem('group_id'));
  return localStorage.getItem('group_id');
}
function Demo2({title = "Default Title", description = "Default Description", href = "#", badgeText = "Live", group_id="lol",table="projects",ids="project_id",namess="name"} = {}) {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure(false);
  const [opened1, { open, close }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';
  const [groupId, setGroupId] = useState(title);
  const [des, setdes] = useState(description);
  function  lolredirect(){
    console.log(group_id);
    localStorage.setItem('group_id', group_id); 
    navigate('/group');
  }

  async function nope(event: React.FormEvent) {
    event.preventDefault();
    await fetch(`${endpoints}/removerow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "table":`${table}` ,"condition":`${ids}="${group_id}"` }),
    });
    window.location.reload();
  }
  async function yup(event: React.FormEvent){
    event.preventDefault();
   await fetch(`${endpoints}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "table":`${table}`,"condition":`${ids}="${group_id}" `, "newvalue":`${namess}="${groupId}" ,description="${des}" ` }),
    });
    window.location.reload();
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{width:"250px",height:"260px "}}>


      <Card.Section component="a" href={href}>

      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Group position="apart" mb="sm">
         <Burger opened={opened1} onClick={open} aria-label={label} size="sm"/>
      </Group>

      </Group>

      <Badge color="green" variant="light">
          {badgeText}
        </Badge>
      <Text size="sm" color="dimmed">
       {ids}:{group_id}</Text>
      <Text size="sm" color="dimmed">
        Description:{description}
      </Text>
      <Modal opened={opened1} onClose={close} withCloseButton={false} centered transitionProps={{ transition: 'rotate-left' }} >
        <Text size="xl" >Edit Info</Text>
        <TextInput label="name" value={groupId} onChange={(e)=>setGroupId(e.currentTarget.value)}></TextInput>
        <TextInput label="description" value={des} onChange={(e)=>setdes(e.currentTarget.value)}></TextInput>
        <br></br>
        <div style={{display:"flex", flexDirection:"column"}}>
        <Button onClick={yup} color='green'>Save</Button>
        <br></br>
        <Button onClick={nope} color='red'>Delete {table}</Button>
        </div>
      </Modal>
      <Button variant="light" color="violet" fullWidth mt="md" radius="md" onClick={lolredirect}>
        Open
      </Button>
    </Card>
  );
}
export default Demo2;