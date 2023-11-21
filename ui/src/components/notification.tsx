import { Text, Paper ,ActionIcon} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import endpoint from './endpoint';

const endpoints = endpoint
function Notifi({title="test",name="test",description="test"}) {
  async function nope(event: React.FormEvent) {
    event.preventDefault();
    await fetch(`${endpoints}/removerow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "table":"joins" ,"condition":`group_id="${title}" and SRN="${description}"` }),
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
      body: JSON.stringify({ "table":"joins" ,"condition":`group_id="${title}" and SRN="${description}"`, "newvalue":`state="1"` }),
    });
    window.location.reload();
  }

  return (
    <Paper shadow="xs" p="md" withBorder>
      <Text>
        {description} requests to join your group the {name} 
      </Text>
      <div style={{display:'flex', flexDirection:"row", justifyContent:'space-around'}}>
      <ActionIcon color="green" variant="filled" radius='xl' onClick={yup}>
      <IconCheck size="1.125rem" />
    </ActionIcon>
    <br></br>
    <ActionIcon color="red" variant="filled" radius='xl' onClick={nope}>
      <IconX size="1.125rem" />
    </ActionIcon></div>
    </Paper>
  );
}
export default Notifi;