import { Flex, Loader } from '@mantine/core';

export default function CustomLoader() {
  return (
    <Flex justify="center">
      <Loader color="purple.5" size="xl" type="dots" />
    </Flex>
  );
}
