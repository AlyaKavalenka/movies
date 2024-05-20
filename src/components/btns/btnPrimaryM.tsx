import { Button } from '@mantine/core';
import styles from './btns.module.scss';

interface BtnPrimaryMProps {
  handleClick: () => void;
  label: string;
}

export default function BtnPrimaryM(props: BtnPrimaryMProps) {
  const { label, handleClick } = props;

  return (
    <Button
      radius="md"
      onClick={handleClick}
      classNames={{
        root: styles.btnPrimaryM,
      }}
    >
      {label}
    </Button>
  );
}
