import { Modal, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


function CreateGroup() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
    <>
    
    <Modal opened={opened} onClose={close} title="Create a new group" withCloseButton={false}>
    Modal without header, press escape or click on overlay to close
    </Modal>

    <Group position="center">
    <Button onClick={open}>Open Modal</Button>
    </Group>
    </>
  )
}export default CreateGroup 