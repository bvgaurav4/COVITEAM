import {
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
    MantineProvider
  } from '@mantine/core';
  import { IconArrowLeft } from '@tabler/icons-react';
  import { Link } from 'react-router-dom';

  import './forgot.css';


  export default  function ForgotPassword() {
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
          <TextInput label="Your email" placeholder="me@mantine.dev" required />
          <Group justify="space-between" mt="lg" className='controls'>
            <Anchor c="dimmed" size="sm" className='classes.control'>
              <Center inline>
              <Link to='/login' >  <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box></Link>
              </Center>
            </Anchor>
            <Button className='control' >Reset password</Button>
          </Group>
        </Paper>
      </Container></MantineProvider>
    );
  }

  
  