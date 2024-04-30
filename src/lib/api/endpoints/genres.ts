import { api } from '../api';

const api_key = process.env.NEXT_PUBLIC_API_KEY;

const genres = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${api_key}&language=en`,
    }),
  }),
});

export const { useGetGenresQuery } = genres;
