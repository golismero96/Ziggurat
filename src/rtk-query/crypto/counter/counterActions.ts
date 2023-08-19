// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const counterActions = createApi({
  reducerPath: 'counterActions',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts'
    })
  })
});

export const { useGetPostsQuery } = counterActions;
