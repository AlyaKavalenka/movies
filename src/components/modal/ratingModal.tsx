import { ModalProps } from '@/types/interfaces';
import { Flex, Modal, Rating, Stack, Text } from '@mantine/core';
import BtnWithoutBg from '../btns/btnWithoutBg';
import styles from './modal.module.scss';
import BtnPrimaryM from '../btns/btnPrimaryM';

export default function RatingModal(props: ModalProps) {
  const { isOpen, toggle, movieTitle, ratingDefaultValue } = props;

  return (
    <Modal
      opened={isOpen}
      onClose={toggle}
      centered
      title="Your rating"
      radius={8}
      classNames={{
        content: styles.content,
      }}
      size="auto"
    >
      <Stack>
        <Text fw={700}>{movieTitle}</Text>
        <Rating
          defaultValue={ratingDefaultValue || 0}
          color="yellow.7"
          count={10}
          size="lg"
          classNames={{
            root: styles.ratings,
          }}
        />
        <Flex gap={16}>
          <BtnPrimaryM label="Save" handleClick={() => {}} />
          <BtnWithoutBg label="Remove rating" handleClick={() => {}} />
        </Flex>
      </Stack>
    </Modal>
  );
}
