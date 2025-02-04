import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ search, sort, page }) => {
        const skip = (page - 1) * 10;
        let url = search
          ? `/products/search?q=${search}&limit=10&skip=${skip}`
          : `/products?limit=10&skip=${skip}`;
        if (sort) url += `&sortBy=title&order=${sort}`;
        return url;
      }
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;