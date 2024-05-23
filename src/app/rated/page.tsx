'use client';

import MovieCard from '@/components/movieCard/movieCard';
import { useAppSelector } from '@/lib/hooks/storeHooks';
import { Flex, Grid, Pagination, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import LayoutWSidebar from '@/components/layoutWSidebar/layoutWSidebar';
import Search from '@/components/inputs/search';
import { usePathname, useRouter } from 'next/navigation';
import NoRated from '@/components/noRated/noRated';
import styles from './ratedPage.module.scss';

export default function RatedPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const pathname = usePathname();
  const { replace } = useRouter();

  const limit = 4;

  const ratedMovies = useAppSelector((state) => state.ratedMoviesSlice.movies);

  const [filteredMovies, setFilteredMovies] = useState(ratedMovies);
  const [totalPages, setTotalPages] = useState(1);
  const [startIndex, setStartIndex] = useState((currentPage - 1) * limit);
  const [endIndex, setEndIndex] = useState(startIndex + limit);

  useEffect(() => {
    let filterResult = [];

    if (query.length > 0) {
      filterResult = ratedMovies.filter((movie) => {
        const regexp = new RegExp(query, 'i');

        return regexp.test(movie.title);
      });
    } else {
      filterResult = ratedMovies;
    }

    setFilteredMovies(filterResult);
  }, [query, currentPage, ratedMovies]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredMovies.length / limit));
  }, [filteredMovies]);

  useEffect(() => {
    const newStartIndex = (currentPage - 1) * limit;
    setStartIndex(newStartIndex);
    setEndIndex(newStartIndex + limit);
  }, [currentPage]);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <LayoutWSidebar>
      <main className={styles.main}>
        {ratedMovies.length ? (
          <>
            <Flex w="100%" justify="space-between" gap="xs">
              <Title order={1} size={32}>
                Rated movies
              </Title>
              <Search flex="1 1 0" maw={490} />
            </Flex>
            <Stack align="center" gap={24}>
              <Grid columns={2} grow>
                {[...filteredMovies.slice(startIndex, endIndex)].map(
                  (movie) => (
                    <Grid.Col span={1} key={movie.id}>
                      <MovieCard movie={movie} imageMaxWidth={119} />
                    </Grid.Col>
                  ),
                )}
              </Grid>
              <Pagination
                boundaries={0}
                total={totalPages}
                color="purple.5"
                onChange={createPageURL}
                styles={{
                  dots: {
                    display: 'none',
                  },
                }}
                value={currentPage}
              />
            </Stack>
          </>
        ) : (
          <NoRated />
        )}
      </main>
    </LayoutWSidebar>
  );
}
