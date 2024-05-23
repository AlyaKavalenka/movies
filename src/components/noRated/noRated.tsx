import { Flex, Image, Stack, Text } from '@mantine/core';
import NextImage from 'next/image';
import { useRouter } from 'next/navigation';
import emptyImg from '../../../public/images/png/empty.png';
import BtnPrimaryM from '../btns/btnPrimaryM';

export default function NoRated() {
  const router = useRouter();

  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center">
      <Image
        component={NextImage}
        width={0}
        height={0}
        sizes="100vw"
        mah="300px"
        h="auto"
        w="auto"
        src={emptyImg}
        alt="No rated films"
      />
      <Stack align="center">
        <Text fz="20" fw={600}>
          You haven&apos;t rated any films yet
        </Text>
        <BtnPrimaryM handleClick={() => router.push('/')} label="Find movies" />
      </Stack>
    </Flex>
  );
}
