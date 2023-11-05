import { Modal, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './create_group.css'

function CreateGroup() {
    const [opened, { open, close }] = useDisclosure(false);
    return (
    <div>
    
    <Modal opened={opened} onClose={close} title="Create a new group" withCloseButton={false} >
    Modal without header, press escape or click on overlay to close
    </Modal>

    <Group position="right">
    <Button onClick={open}>Create group</Button>
    </Group>
    </div>
  )
}export default CreateGroup 