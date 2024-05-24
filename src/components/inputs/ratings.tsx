import { useAppDispatch } from '@/lib/hooks/storeHooks';
import { setVoteAverage } from '@/lib/reducers/moviesFiltersSlice';
import { Flex, NumberInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import styles from './inputNumber.module.scss';

export default function Ratings() {
  const [ratings, setRatings] = useState<{
    gte: string | number | undefined;
    lte: string | number | undefined;
  }>({
    gte: undefined,
    lte: undefined,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setVoteAverage(ratings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ratings]);

  return (
    <Flex align="flex-end" gap={8} flex="1 0 0">
      <NumberInput
        label="Ratings"
        placeholder="From"
        onChange={(e) => setRatings({ ...ratings, gte: e })}
        min={0}
        max={ratings.lte ? +ratings.lte : 10}
        miw={85}
        classNames={{
          controls: styles.controls,
          input: styles.input,
          label: styles.label,
          root: styles.NumberInput,
        }}
      />
      <NumberInput
        aria-label="Ratings"
        placeholder="To"
        onChange={(e) => setRatings({ ...ratings, lte: e })}
        min={ratings.gte ? +ratings.gte : 0}
        max={10}
        classNames={{
          controls: styles.controls,
          input: styles.input,
          label: styles.label,
          root: styles.NumberInput,
        }}
      />
    </Flex>
  );
}
