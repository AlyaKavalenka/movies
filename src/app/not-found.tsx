import Logo from '@/components/logo';
import Link from 'next/link';
import { Button, Stack, Text, Image } from '@mantine/core';
import nextImage from 'next/image';
import notFoundImage from '../../public/images/svg/not-found.svg';
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <Logo />
      <Stack justify="center" align="center" flex="1 0 0" gap="48px">
        <Image
          component={nextImage}
          src={notFoundImage}
          alt="not found"
          maw={656}
        />
        <Stack align="center" gap="16px">
          <Text size="20px" fw="600">
            We can’t find the page you are looking for
          </Text>
          <Button
            component={Link}
            href="/"
            radius="md"
            color="purple.5"
            classNames={{
              root: styles.notFound__btn,
            }}
          >
            Go Home
          </Button>
        </Stack>
      </Stack>
    </section>
  );
}
