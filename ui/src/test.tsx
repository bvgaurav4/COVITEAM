import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
export function getGroup() {
  const groupId = localStorage.getItem('group_id');
  return groupId ? groupId : null;
}
function Demo2({title = "Default Title", description = "Default Description", href = "#", badgeText = "Live", group_id="lol"} = {}) {
  const navigate = useNavigate();

  function Opengroup() {
    localStorage.setItem('group_id', group_id);
    console.log("open group", title,group_id);
    navigate(`/group`);
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{width:"250px",height:"260px "}}>
      <Card.Section component="a" href={href}>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="green" variant="light">
          {badgeText}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {description}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md" onClick={Opengroup}>
        Open
      </Button>
    </Card>
  );
}
export default Demo2;