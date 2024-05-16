import { Button } from '@mantine/core';
import styles from './btns.module.scss';

interface BtnWithoutBgProps {
  handleClick: () => void;
  label: string;
}

export default function BtnWithoutBg(props: BtnWithoutBgProps) {
  const { handleClick, label } = props;

  return (
    <Button
      variant="transparent"
      onClick={handleClick}
      classNames={{
        root: styles.btnWithoutBgRoot,
      }}
    >
      {label}
    </Button>
  );
}
