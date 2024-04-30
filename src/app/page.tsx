'use client';

import { Grid } from '@mantine/core';
import { useGetMoviesQuery } from '@/lib/api/endpoints/discover/movies';
import MovieCard from '@/components/movieCard/movieCard';
import styles from './page.module.scss';

export default function Home() {
  const { data, error, isLoading } = useGetMoviesQuery(null);

  return (
    <main className={styles.main}>
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
    </main>
  );
}
