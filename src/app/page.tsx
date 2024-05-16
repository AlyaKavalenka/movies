'use client';

import { Flex, Grid, Group, Pagination, Stack, Title } from '@mantine/core';
import { useGetMoviesQuery } from '@/lib/api/endpoints/discover/movies';
import MovieCard from '@/components/movieCard/movieCard';
import Genres from '@/components/inputs/genres';
import ReleaseYear from '@/components/inputs/releaseYear';
import Ratings from '@/components/inputs/ratings';
import SortBy from '@/components/inputs/sortBy';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useForm } from '@mantine/form';
import BtnWithoutBg from '@/components/btns/btnWithoutBg';
import { setPage } from '@/lib/reducers/moviesFiltersSlice';
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

  return (
    <main className={styles.main}>
      <Title order={1} size={32}>
        Movies
      </Title>
      <Stack>
        <Flex align="flex-end" gap={16} wrap="wrap">
          <Genres key={form.key('genres')} />
          <ReleaseYear key={form.key('releaseYear')} />
          <Ratings key={form.key('voteAverage')} />
          <BtnWithoutBg
            handleClick={() => form.reset()}
            label="Reset filters"
          />
        </Flex>
        <Flex justify="flex-end">
          <SortBy />
        </Flex>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : (
          <Group justify="flex-end">
            <Grid columns={2} grow>
              {data?.results.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </Grid>
            <Pagination
              total={data?.total_pages || 1}
              color="purple.5"
              value={data?.page}
              onChange={(value) => dispatch(setPage(value))}
            />
          </Group>
        )}
      </Stack>
    </main>
  );
}
