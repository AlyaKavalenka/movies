import { useEffect } from 'react';
import { Flex } from '@mantine/core';
import { useAppSelector } from '@/lib/hooks/storeHooks';
import useModal from '@/lib/hooks/useModal';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import RatingModal from '../modal/ratingModal';
import Sidebar from '../sidebar/sidebar';

export default function LayoutWSidebar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isOpen = useAppSelector((state) => state.isOpenModalSlice.value);

  const { toggle } = useModal();
  const { synchronize } = useLocalStorage([]);

  useEffect(() => {
    synchronize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex mih="100vh">
      <Sidebar />
      {children}
      <RatingModal isOpen={isOpen} toggle={toggle} />
    </Flex>
  );
}
