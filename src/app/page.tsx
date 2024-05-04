'use client';

import { Flex, Grid, GridCol, Stack, Title } from '@mantine/core';
import { useGetMoviesQuery } from '@/lib/api/endpoints/discover/movies';
import MovieCard from '@/components/movieCard/movieCard';
import Search from '@/components/inputs/search';
import Genres from '@/components/inputs/genres';
import ReleaseYear from '@/components/inputs/releaseYear';
import styles from './page.module.scss';

export default function Home() {
  const { data, error, isLoading } = useGetMoviesQuery(null);

  return (
    <main className={styles.main}>
      <Grid grow w="100%">
        <GridCol span={1}>
          <Title order={1} size={32}>
            Movies
          </Title>
        </GridCol>
        <GridCol span={1}>
          <Search />
        </GridCol>
      </Grid>
      <Stack>
        <Flex>
          <Genres />
          <ReleaseYear />
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
