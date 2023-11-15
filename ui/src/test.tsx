import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Demo2({title,description,href,badgeText}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{width:"250px",height:"260px "}}>
      <Card.Section component="a" href={href}>
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{title}</Text>
        <Badge color="pink" variant="light">
          {badgeText}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        {description}
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
export default Demo2;