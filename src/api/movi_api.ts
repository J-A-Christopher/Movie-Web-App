import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const apiKey = import.meta.env.VITE_API_KEY;

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({
      baseUrl: "https://api.themoviedb.org/3/",
    }),
    endpoints: (builder) => ({
      getMoviesList: builder.query({
        query: (currentPage) => ({
          url: `movie/top_rated?language=en-US&page=${currentPage}&api_key=${apiKey}`,
          method: "GET",
        }),
      }),
      getSpecificMovieData: builder.query({
        query: (movieId) => ({
          url: `movie/${movieId}?language=en-US&api_key=${apiKey}`,
          method: "GET",
        }),
      }),
      getMovieSearchInput: builder.query({
        query: ({movie,page}) => ({
          url: `search/movie?query=${movie}&include_adult=false&language=en-US&page=${page}&api_key=${apiKey}`,
          method: "GET",
        }),
      }),
    }),
  });
//Url to retrieve images.. https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg
export const { useGetMoviesListQuery,useLazyGetSpecificMovieDataQuery,useLazyGetMovieSearchInputQuery } = movieApi;
