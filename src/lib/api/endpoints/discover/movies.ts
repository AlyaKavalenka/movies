import { Movie, Movies } from '@/types/interfaces';
import { api } from '../../api';

const movies = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({
        sortBy,
        with_genres,
        primary_release_year,
        vote_average,
        page,
      }: {
        sortBy?: string | null;
        with_genres: string | undefined;
        primary_release_year: number | null;
        vote_average: {
          gte: number | undefined;
          lte: number | undefined;
        };
        page: number;
      }) =>
        `discover/movie?language=en-US&sort_by=${sortBy === null ? 'popularity.desc' : sortBy}${with_genres ? `&with_genres=${with_genres}` : ''}${primary_release_year ? `&primary_release_year=${primary_release_year}` : ''}${vote_average.lte ? `&vote_average.lte=${vote_average.lte}` : ''}${vote_average.gte ? `&vote_average.gte=${vote_average.gte}` : ''}&page=${page}`,

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
    getMovie: builder.query({
      query: ({ id }: { id: number }) =>
        `movie/${id}?&language=en-US&append_to_response=videos`,
      transformResponse: (response: Movie) => ({
        ...response,
        poster_path: response.poster_path
          ? `https://image.tmdb.org/t/p/original${response.poster_path}`
          : response.poster_path,
        production_companies: response.production_companies?.map((company) => {
          if (company.logo_path)
            company.logo_path = `https://image.tmdb.org/t/p/original${company.logo_path}`;
          return company;
        }),
      }),
      providesTags: (result: Movie | undefined) => {
        if (result) return [{ type: 'Movie', id: result.id }];
        return [{ type: 'Movie' }];
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetMoviesQuery, useGetMovieQuery } = movies;
