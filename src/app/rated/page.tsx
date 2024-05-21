'use client';

import RatingModal from '@/components/modal/ratingModal';
import MovieCard from '@/components/movieCard/movieCard';
import Sidebar from '@/components/sidebar/sidebar';
import { useAppSelector } from '@/lib/hooks/storeHooks';
import useModal from '@/lib/hooks/useModal';
import { Movie } from '@/types/interfaces';
import { Flex, Grid, Pagination, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import Search from '@/components/inputs/search';
import { usePathname, useRouter } from 'next/navigation';
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

  const isOpen = useAppSelector((state) => state.isOpenModalSlice.value);
  const { toggle } = useModal();
  const [clickedMovie, setClickedMovie] = useState<Movie>();
  const { synchronize } = useLocalStorage([]);

  useEffect(() => {
    synchronize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Flex>
      <Sidebar />
      <main className={styles.main}>
        <Flex w="100%" justify="space-between" gap="xs">
          <Title order={1} size={32}>
            Rated movies
          </Title>
          <Search flex="1 1 0" maw={490} />
        </Flex>
        {ratedMovies.length ? (
          <Stack align="center" gap={24}>
            <Grid columns={2} grow>
              {[...filteredMovies.slice(startIndex, endIndex)].map((movie) => (
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
        ) : (
          ''
        )}
      </main>
      <RatingModal isOpen={isOpen} toggle={toggle} movie={clickedMovie} />
    </Flex>
  );
}
