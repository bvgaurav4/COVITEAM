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
  BackgroundImage
} from '@mantine/core';
import './login.css';
import { useNavigate } from 'react-router-dom';



export default function AuthenticationTitle() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/home');
  }
  return (
    <MantineProvider theme={{colorScheme:'dark'}}>
      <form>
    <Container size={500} my={40}>
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
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
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