'use client';

import { Flex, NavLink, Stack } from '@mantine/core';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import sidebarStyles from './sidebar.module.scss';
import Logo from '../logo';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Flex bg="purple.1" p="lg" direction="column" gap="80px">
      <Logo />
      <Stack gap="md">
        <NavLink
          href="/"
          label="Movies"
          variant="filled"
          active={pathname === '/'}
          className={sidebarStyles.root}
          component={Link}
        />

        <NavLink
          href="/rated"
          label="Rated movies"
          variant="filled"
          active={pathname === '/rated'}
          className={sidebarStyles.root}
          component={Link}
        />
      </Stack>
    </Flex>
  );
}
