'use client';

import { Flex, NavLink } from '@mantine/core';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import sidebarStyles from './sidebar.module.scss';
import Logo from '../logo';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Flex bg="purple.1" className={sidebarStyles.sidebar}>
      <Logo />
      <Flex className={sidebarStyles.sidebar__links}>
        <NavLink
          href="/"
          label="Movies"
          variant="filled"
          active={pathname.replace('/', '') === '' || /movies/.test(pathname)}
          classNames={{
            root: sidebarStyles.root,
            label: sidebarStyles.label,
          }}
          component={Link}
        />

        <NavLink
          href="/rated"
          label="Rated movies"
          variant="filled"
          active={/rated/.test(pathname)}
          classNames={{
            root: sidebarStyles.root,
            label: sidebarStyles.label,
          }}
          component={Link}
        />
      </Flex>
    </Flex>
  );
}
