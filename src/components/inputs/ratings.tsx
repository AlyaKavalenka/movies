import { useAppDispatch } from '@/lib/hooks';
import { setVoteAverage } from '@/lib/reducers/moviesFiltersSlice';
import { Flex, NumberInput } from '@mantine/core';
import { useEffect, useState } from 'react';

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
    <Flex align="flex-end">
      <NumberInput
        label="Ratings"
        placeholder="From"
        value={ratings.gte}
        onChange={(e) => setRatings({ ...ratings, gte: e })}
        max={ratings.lte ? +ratings.lte : undefined}
      />
      <NumberInput
        aria-label="Ratings"
        placeholder="To"
        value={ratings.lte}
        onChange={(e) => setRatings({ ...ratings, lte: e })}
        min={ratings.gte ? +ratings.gte : undefined}
        max={10}
      />
    </Flex>
  );
}
