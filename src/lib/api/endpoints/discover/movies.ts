import { Movies } from '@/types/interfaces';
import { api } from '../../api';

const api_key = process.env.NEXT_PUBLIC_API_KEY;

const movies = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => `discover/movie?api_key=${api_key}`,
      transformResponse: (response: Movies) => {
        response.results.map((movie) => {
          movie.poster_path = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
          return movie;
        });
        return response;
      },
    }),
  }),
});

export const { useGetMoviesQuery } = movies;