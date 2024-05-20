import { ModalProps } from '@/types/interfaces';
import { Flex, Modal, Rating, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/storeHooks';
import {
  addRatedMovie,
  removeRatedMovie,
} from '@/lib/reducers/ratedMoviesSlice';
import BtnWithoutBg from '../btns/btnWithoutBg';
import styles from './modal.module.scss';
import BtnPrimaryM from '../btns/btnPrimaryM';

export default function RatingModal(props: ModalProps) {
  const { isOpen, toggle, movie } = props;

  const dispatch = useAppDispatch();
  const ratedMovies = useAppSelector((state) => state.ratedMoviesSlice.movies);

  const foundInRatedMovies = ratedMovies.find(
    (ratedMovie) => ratedMovie.id === movie?.id,
  );

  const [rate, setRate] = useState(
    foundInRatedMovies !== undefined ? foundInRatedMovies.userRate : 0,
  );

  useEffect(() => {
    setRate(foundInRatedMovies !== undefined ? foundInRatedMovies.userRate : 0);
  }, [foundInRatedMovies]);

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
        <Text fw={700}>{movie?.title}</Text>
        <Rating
          color="yellow.7"
          count={10}
          size="lg"
          classNames={{
            root: styles.ratings,
          }}
          value={rate}
          onChange={setRate}
        />
        <Flex gap={16}>
          <BtnPrimaryM
            label="Save"
            handleClick={() => {
              dispatch(addRatedMovie({ ...movie, userRate: rate }));
              toggle();
            }}
          />
          <BtnWithoutBg
            label="Remove rating"
            handleClick={() => {
              dispatch(removeRatedMovie(movie));
              toggle();
            }}
            isDisabled={rate === 0}
          />
        </Flex>
      </Stack>
    </Modal>
  );
}
