import { Text, Paper ,ActionIcon} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';


function Notifi({name,description}) {
  function yup(){
    console.log("yup");
    
  }
  function nope(){
    console.log("nope");
  }
  return (
    <Paper shadow="xs" p="md" withBorder>
      <Text>Paper is the most basic ui component</Text>
      <Text>
        Use it to create cards, dropdowns, modals and other components that require background
        with shadow{description}
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