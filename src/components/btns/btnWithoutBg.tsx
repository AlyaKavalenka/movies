import { Button } from '@mantine/core';
import styles from './btns.module.scss';

interface BtnWithoutBgProps {
  handleClick: () => void;
  label: string;
  isDisabled: boolean;
}

export default function BtnWithoutBg(props: BtnWithoutBgProps) {
  const { handleClick, label, isDisabled } = props;

  return (
    <Button
      variant="transparent"
      onClick={handleClick}
      classNames={{
        root: styles.btnWithoutBgRoot,
      }}
      disabled={isDisabled}
    >
      {label}
    </Button>
  );
}
