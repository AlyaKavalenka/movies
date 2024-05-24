'use client';

import { Flex, NavLink } from '@mantine/core';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import sidebarStyles from './sidebar.module.scss';
import Logo from '../logo';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Flex bg="purple.1" p="lg" className={sidebarStyles.sidebar}>
      <Logo />
      <Flex className={sidebarStyles.sidebar__links}>
        <NavLink
          href="/"
          label="Movies"
          variant="filled"
          active={pathname.replace('/', '') === '' || /movies/.test(pathname)}
          className={sidebarStyles.root}
          component={Link}
        />

        <NavLink
          href="/rated"
          label="Rated movies"
          variant="filled"
          active={/rated/.test(pathname)}
          className={sidebarStyles.root}
          component={Link}
        />
      </Flex>
    </Flex>
  );
}
