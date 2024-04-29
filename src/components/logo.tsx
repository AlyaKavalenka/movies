import Image from 'next/image';
import { Flex, Title } from '@mantine/core';
import { Poppins } from 'next/font/google';
import logoSvg from '../../public/images/svg/logo-svg.svg';

const poppins = Poppins({ weight: '600', subsets: ['latin'] });
export default function Logo() {
  return (
    <Flex gap="sm" align="center" justify="start">
      <Image src={logoSvg} alt="ArrowFlicks icon" priority width={32} height={32} />
      <Title c="purple.5" style={{ ...poppins.style, letterSpacing: '-0.02em' }} size="24px">ArrowFlicks</Title>
    </Flex>
  );
}
