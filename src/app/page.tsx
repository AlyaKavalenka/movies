'use client';

import { Button, Flex, Grid, Stack, Title } from '@mantine/core';
import { useGetMoviesQuery } from '@/lib/api/endpoints/discover/movies';
import MovieCard from '@/components/movieCard/movieCard';
import Genres from '@/components/inputs/genres';
import ReleaseYear from '@/components/inputs/releaseYear';
import Ratings from '@/components/inputs/ratings';
import SortBy from '@/components/inputs/sortBy';
import { useAppSelector } from '@/lib/hooks';
import styles from './page.module.scss';

export default function Home() {
  const moviesFilters = useAppSelector((state) => state.moviesFiltersSlice);
  const { data, error, isLoading } = useGetMoviesQuery({
    sortBy: moviesFilters.sortBy,
    with_genres: moviesFilters.genresFilter,
    primary_release_year: moviesFilters.releaseYearFilter,
  });

  return (
    <main className={styles.main}>
      <Title order={1} size={32}>
        Movies
      </Title>
      <Stack>
        <Flex align="flex-end">
          <Genres />
          <ReleaseYear />
          <Ratings />
          <Button>Reset filters</Button>
        </Flex>
        <Flex justify="flex-end">
          <SortBy />
        </Flex>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : (
          <Grid columns={2} grow>
            {data?.results.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </Grid>
        )}
      </Stack>
    </main>
  );
}
