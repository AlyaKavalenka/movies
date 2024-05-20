import { Genre } from '@/types/interfaces';
import { createSlice } from '@reduxjs/toolkit';

interface InitialValues {
  movies: {
    id: number;
    popularity: number;
    poster_path: string;
    title: string;
    vote_average: number;
    vote_count: number;
    genres: Genre[];
    userRate: number;
  }[];
}

const ratedMoviesSlice = createSlice({
  name: 'ratedMoviesSlice',
  initialState: <InitialValues>{
    movies: [],
  },
  reducers: {
    addRatedMovie: (state, action) => {
      const foundIndex = state.movies.findIndex(
        (movie) => movie.id === action.payload.id,
      );

      if (foundIndex === -1) {
        state.movies.push(action.payload);
      } else {
        state.movies.splice(foundIndex, 1, action.payload);
      }
    },
  },
});

export const { addRatedMovie } = ratedMoviesSlice.actions;

export default ratedMoviesSlice.reducer;
