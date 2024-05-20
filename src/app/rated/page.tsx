'use client';

import RatingModal from '@/components/modal/ratingModal';
import MovieCard from '@/components/movieCard/movieCard';
import Sidebar from '@/components/sidebar/sidebar';
import { useAppSelector } from '@/lib/hooks/storeHooks';
import useModal from '@/lib/hooks/useModal';
import { Movie } from '@/types/interfaces';
import { Flex } from '@mantine/core';
import { useState } from 'react';

export default function RatedPage() {
  const ratedMovies = useAppSelector((state) => state.ratedMoviesSlice.movies);

  const isOpen = useAppSelector((state) => state.isOpenModalSlice.value);
  const { toggle } = useModal();
  const [clickedMovie, setClickedMovie] = useState<Movie>();

  return (
    <Flex>
      <Sidebar />
      <main>
        {ratedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            imageMaxWidth={119}
            clickMovieByStar={() => setClickedMovie(movie)}
          />
        ))}
      </main>
      <RatingModal isOpen={isOpen} toggle={toggle} movie={clickedMovie} />
    </Flex>
  );
}