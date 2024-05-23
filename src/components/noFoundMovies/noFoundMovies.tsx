import { Flex, Image, Text } from '@mantine/core';
import NextImage from 'next/image';
import noFoundMoviesImg from '../../../public/images/png/noFoundMovies.png';

export default function NoFoundMovies() {
  return (
    <Flex w="100%" flex="1 1 0" justify="center" align="start">
      <Flex direction="column" align="center" gap="16px">
        <Image
          component={NextImage}
          width={0}
          height={0}
          sizes="100vw"
          mah="252.033px"
          h="auto"
          w="21.579vw"
          src={noFoundMoviesImg}
          alt="No found movies"
          miw={200}
        />
        <Text fz="20" fw={600}>
          We don&apos;t have such movies, look for another one
        </Text>
      </Flex>
    </Flex>
  );
}
