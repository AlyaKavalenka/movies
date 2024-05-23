'use client';

import MovieCard from '@/components/movieCard/movieCard';
import { useGetMovieQuery } from '@/lib/api/endpoints/discover/movies';
import { Anchor, Breadcrumbs, Stack, Text } from '@mantine/core';
import MovieCardDescription from '@/components/movieCard/movieCardDesciption';
import LayoutWSidebar from '@/components/layoutWSidebar/layoutWSidebar';
import CustomLoader from '@/components/customLoader/customLoader';
import { notFound } from 'next/navigation';
import styles from './moviePage.module.scss';

export default function MoviePage({
  params,
}: {
  params: { movie_id: number };
}) {
  const { data, isLoading, error } = useGetMovieQuery({ id: params.movie_id });

  // TODO: fix in case when clicked from rated
  const breadcrumbsItems = [
    { title: 'Movies', href: '/' },
    { title: data?.title, href: `/${params.movie_id}` },
  ].map((item, index) => (
    <Anchor href={item.href} key={index} fz={14} c="purple.5" lh="20px">
      {item.title}
    </Anchor>
  ));

  const ErrorView = () => {
    if (error) {
      if ('status' in error) {
        if (error.status === 404) notFound();
      }
    }

    return <Text>Oh no, there was an error</Text>;
  };

  return (
    <LayoutWSidebar>
      <main className={styles.main}>
        {error ? (
          <>{ErrorView()}</>
        ) : isLoading ? (
          <CustomLoader />
        ) : (
          <Stack>
            <Breadcrumbs classNames={{ root: styles.breadcrumbs }}>
              {breadcrumbsItems}
            </Breadcrumbs>
            {data ? <MovieCard movie={data} imageMaxWidth={250} /> : ''}
            <MovieCardDescription
              video={data?.videos?.results[0]}
              overview={data?.overview}
              productionCompanies={data?.production_companies}
            />
          </Stack>
        )}
      </main>
    </LayoutWSidebar>
  );
}
