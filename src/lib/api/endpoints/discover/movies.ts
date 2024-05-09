import { Movies } from '@/types/interfaces';
import { api } from '../../api';

const api_key = process.env.NEXT_PUBLIC_API_KEY;

const movies = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({
        sortBy,
        with_genres,
        primary_release_year,
        vote_average,
      }: {
        sortBy?: string | null;
        with_genres: string | undefined;
        primary_release_year: number | null;
        vote_average: {
          gte: number | undefined;
          lte: number | undefined;
        };
      }) =>
        `discover/movie?api_key=${api_key}&language=en-US&sort_by=${sortBy === null ? 'popularity.desc' : sortBy}${with_genres ? `&with_genres=${with_genres}` : ''}${primary_release_year ? `&primary_release_year=${primary_release_year}` : ''}${vote_average.lte ? `&vote_average.lte=${vote_average.lte}` : ''}${vote_average.gte ? `&vote_average.gte=${vote_average.gte}` : ''}`,

      transformResponse: (response: Movies) => {
        response.results.map((movie) => {
          if (movie.poster_path)
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
