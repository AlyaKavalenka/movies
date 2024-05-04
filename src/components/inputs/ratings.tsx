import { Flex, NumberInput } from '@mantine/core';

export default function Ratings() {
  return (
    <Flex align="flex-end">
      <NumberInput label="Ratings" placeholder="From" />
      <NumberInput aria-label="Ratings" placeholder="To" />
    </Flex>
  );
}
