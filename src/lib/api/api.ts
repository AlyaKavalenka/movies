import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${api_url}` }),
  tagTypes: ['Movies'],
  endpoints: () => ({}),
});
