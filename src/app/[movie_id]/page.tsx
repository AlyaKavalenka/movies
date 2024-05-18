'use client';

import MovieCard from '@/components/movieCard/movieCard';
import Sidebar from '@/components/sidebar/sidebar';
import { useGetMovieQuery } from '@/lib/api/endpoints/discover/movies';
import { Anchor, Breadcrumbs, Stack } from '@mantine/core';
import MovieCardDescription from '@/components/movieCard/movieCardDesciption';
import styles from './moviePage.module.scss';

export default function MoviePage({
  params,
}: {
  params: { movie_id: number };
}) {
  const { data, isLoading, error } = useGetMovieQuery({ id: params.movie_id });

  const breadcrumbsItems = [
    { title: 'Movies', href: '/' },
    { title: data?.title, href: `/${params.movie_id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} fz={14} c="purple.5" lh="20px">
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Sidebar />
      <main className={styles.main}>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : (
          <Stack>
            <Breadcrumbs>{breadcrumbsItems}</Breadcrumbs>
            {data ? <MovieCard movie={data} imageMaxWidth={250} /> : ''}
            <MovieCardDescription
              video={data?.videos.results[0]}
              overview={data?.overview}
              productionCompanies={data?.production_companies}
            />
          </Stack>
        )}
      </main>
    </>
  );
}
