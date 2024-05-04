import { Movies } from '@/types/interfaces';
import { api } from '../../api';

const api_key = process.env.NEXT_PUBLIC_API_KEY;

const movies = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ sortBy }: { sortBy?: string | null }) =>
        `discover/movie?api_key=${api_key}&language=en&sort_by=${sortBy === null ? 'popularity.desc' : sortBy}`,
      transformResponse: (response: Movies) => {
        response.results.map((movie) => {
          movie.poster_path = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
          return movie;
        });
        return response;
      },
      providesTags: (result: Movies | undefined) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Movies' as const,
                id,
              })),
              { type: 'Movies', id: 'LIST' },
            ]
          : [{ type: 'Movies', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetMoviesQuery } = movies;
