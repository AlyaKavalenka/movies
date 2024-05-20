'use client';

import { Flex, Grid, Group, Pagination, Stack, Title } from '@mantine/core';
import { useGetMoviesQuery } from '@/lib/api/endpoints/discover/movies';
import MovieCard from '@/components/movieCard/movieCard';
import Genres from '@/components/inputs/genres';
import ReleaseYear from '@/components/inputs/releaseYear';
import Ratings from '@/components/inputs/ratings';
import SortBy from '@/components/inputs/sortBy';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/storeHooks';
import { useForm } from '@mantine/form';
import BtnWithoutBg from '@/components/btns/btnWithoutBg';
import { useState } from 'react';
import { setPage } from '@/lib/reducers/moviesFiltersSlice';
import Sidebar from '@/components/sidebar/sidebar';
import RatingModal from '@/components/modal/ratingModal';
import useModal from '@/lib/hooks/useModal';
import { Movie } from '@/types/interfaces';
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
  const isOpen = useAppSelector((state) => state.isOpenModalSlice.value);
  const { toggle } = useModal();
  const [clickedMovie, setClickedMovie] = useState<Movie>();

  return (
    <Flex>
      <Sidebar />
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
                  <Grid.Col span={1} key={movie.id}>
                    <MovieCard
                      movie={movie}
                      imageMaxWidth={119}
                      clickMovieByStar={() => setClickedMovie(movie)}
                    />
                  </Grid.Col>
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
      <RatingModal isOpen={isOpen} toggle={toggle} movie={clickedMovie} />
    </Flex>
  );
}
