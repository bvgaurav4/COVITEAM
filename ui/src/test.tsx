import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function Demo2() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{width:"250px",height:"260px "}}>
      <Card.Section component="a" href="https://mantine.dev/">
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>Norway Fjord Adventures</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
  );
}
export default Demo2;