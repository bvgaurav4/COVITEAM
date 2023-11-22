import { Card, Text,Avatar } from '@mantine/core';


const endpoints = 'http://localhost:5000'
export function getGroup() {
  const groupId = localStorage.getItem('group_id');
  return groupId;
}
function Message({ description = "Default Description", group_id="lol",table="message",ids="project_id",namess="name",time_stamp=""} = {}) {

  async function nope(event: React.FormEvent) {
    event.preventDefault();
    const response = await fetch(`${endpoints}/removerow`, {
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
    const response = await fetch(`${endpoints}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "table":`${table}`,"condition":`${ids}="${group_id}" `, "newvalue":`${namess}="${groupId}" ,description="${des}" ` }),
    });
    window.location.reload();
  }
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder style={{width:"100%",height:"100%"}}> 
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <Avatar size='sm' title='lol'/>
    <Text size="sm" color="dimmed">{time_stamp}</Text>
    </div>
    <Text>{namess}</Text>
    <Text size="sm" color="dimmed">
        {description}
    </Text>
    </Card>
  );
}
export default Message;