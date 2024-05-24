'use client';

import { Flex, Group, Pagination, Stack, Text } from '@mantine/core';
import { useGetMoviesQuery } from '@/lib/api/endpoints/discover/movies';
import Genres from '@/components/inputs/genres';
import ReleaseYear from '@/components/inputs/releaseYear';
import Ratings from '@/components/inputs/ratings';
import SortBy from '@/components/inputs/sortBy';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/storeHooks';
import { useForm } from '@mantine/form';
import BtnWithoutBg from '@/components/btns/btnWithoutBg';
import { useEffect, useState } from 'react';
import { setPage } from '@/lib/reducers/moviesFiltersSlice';
import LayoutWSidebar from '@/components/layoutWSidebar/layoutWSidebar';
import NoFoundMovies from '@/components/noFoundMovies/noFoundMovies';
import CustomLoader from '@/components/customLoader/customLoader';
import MoviesCards from '@/components/movieCard/moviesCards';
import styles from './page.module.scss';

export default function Home() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      genres: undefined,
      releaseYear: null,
      voteAverage: {
        gte: undefined,
        lte: undefined,
      },
    },
  });

  const moviesFilters = useAppSelector((state) => state.moviesFiltersSlice);
  const { data, error, isLoading } = useGetMoviesQuery({
    sortBy: moviesFilters.sortBy,
    with_genres: moviesFilters.genresFilter,
    primary_release_year: moviesFilters.releaseYearFilter,
    vote_average: moviesFilters.voteAverage,
    page: moviesFilters.page,
  });

  const dispatch = useAppDispatch();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const { genresFilter, releaseYearFilter, voteAverage } = moviesFilters;

    setIsDisabled(
      !(
        genresFilter ||
        releaseYearFilter ||
        voteAverage.gte ||
        voteAverage.lte
      ),
    );
  }, [moviesFilters]);

  return (
    <LayoutWSidebar>
      <main className={styles.main}>
        <Text fz={32} fw={700} lh="140%">
          Movies
        </Text>
        <Stack w="100%" gap={24}>
          <Flex align="flex-end" gap={16} wrap="wrap">
            <Genres key={form.key('genres')} />
            <ReleaseYear key={form.key('releaseYear')} />
            <Ratings key={form.key('voteAverage')} />
            <BtnWithoutBg
              handleClick={() => form.reset()}
              label="Reset filters"
              isDisabled={isDisabled}
            />
          </Flex>

          <Flex justify="flex-end">
            <SortBy />
          </Flex>

          {error ? (
            <>Oh no, there was an error</>
          ) : isLoading ? (
            <CustomLoader />
          ) : data?.results.length ? (
            <Group justify="flex-end">
              <MoviesCards movies={data.results} />
              <Pagination
                total={data?.total_pages || 1}
                color="purple.5"
                value={data?.page}
                onChange={(value) => dispatch(setPage(value))}
                boundaries={0}
                styles={{
                  dots: {
                    display: 'none',
                  },
                }}
              />
            </Group>
          ) : (
            <NoFoundMovies />
          )}
        </Stack>
      </main>
    </LayoutWSidebar>
  );
}
