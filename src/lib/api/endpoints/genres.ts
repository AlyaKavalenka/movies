import { api } from '../api';

const genres = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `/genre/movie/list?&language=en`,
    }),
  }),
});

export const { useGetGenresQuery } = genres;
