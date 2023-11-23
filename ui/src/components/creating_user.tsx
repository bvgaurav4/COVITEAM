import { useState } from 'react';
import { Stepper, Button, Group,Paper,  MantineProvider,TextInput,PasswordInput
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from '@mantine/core';
import { Alert } from '@mantine/core';
import { endpoint } from './config';

function Creating() {
    const [error, setError] = useState(null);

    const endpoints = endpoint
    const navigate = useNavigate();
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [SRN, setSRN] = useState('');
    const [password, setpassword] = useState('');
    const [otp, setotp] = useState('');
    const [department_id, setdepartment_id] = useState('');
    const [phone,setPhone]=useState('')
    const [captcha, setcaptcha] = useState('');
    const [skills, setskills] = useState([]);
     const data = [
    { value: 'react', label: 'React' },
    { value: 'ng', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'vue', label: 'Vue' },
    { value: 'riot', label: 'Riot' },
    { value: 'next', label: 'Next.js' },
    { value: 'blitz', label: 'Blitz.js' },
    ];
    async function handlesubmission(event: React.FormEvent) {
        event.preventDefault();
        const response = await fetch(`${endpoints}/newuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ SRN,email,name,phone,department_id,password }),
        });
        console.log(response);

        if (response.ok) {
          const data = await response.text();
          console.log(data);
          navigate('/login');
        }
        else{
            console.log("error");
            setError('An error occurred while creating the user.');


        }
       
      }
    return (
    <MantineProvider theme={{colorScheme:'dark'}}>

    <Paper withBorder shadow='mb' p={30} mt={30} radius="md">  
      {error && <Alert color="red">{error}</Alert>}
      <Stepper active={active} onStepClick={setActive} breakpoint="sm">
        <Stepper.Step label="First step" description="Create an account">
            <TextInput label="Email" placeholder="your@gmail.com" mt="md" required value={email} onChange={(e)=>setEmail(e.currentTarget.value)} />
            <TextInput label="Your Name" placeholder="like Mentos" required  value={name} onChange={(e)=>setName(e.currentTarget.value)}/>
            <TextInput label="SRN" placeholder="description" required value={SRN} onChange={(e)=>setSRN(e.currentTarget.value)} />     
            <TextInput label="department_id" placeholder="description" required value={department_id} onChange={(e)=>setdepartment_id(e.currentTarget.value)} />       
            <TextInput label="Phone Number" placeholder="8105142720" required value={phone} onChange={(e)=>setPhone(e.currentTarget.value)} />       
            <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password}  onChange={(e)=>setpassword(e.currentTarget.value)}/>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
            <TextInput label="Enter the otp" placeholder="description" required value={otp} onChange={(e)=>setotp(e.currentTarget.value)} />   
            <TextInput label="enter the capta" placeholder="description" required  value={captcha} onChange={(e)=>setcaptcha(e.currentTarget.value)} />       
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
           <MultiSelect data={data} label="Your favorite frameworks/libraries/skills"  placeholder="Pick all that you like"  value={skills} onChange={(e)=>setskills(value)}/>   
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        {active !== 0 && <Button variant="default" onClick={prevStep}>Back</Button>}
        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}

        {active === 3 && <Button onClick={handlesubmission}>Finish</Button>}
      </Group>
    </Paper>
    </MantineProvider>
  );
}
export default Creating;    



















