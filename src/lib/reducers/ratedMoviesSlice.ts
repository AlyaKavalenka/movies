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
  }[];
}

const ratedMoviesSlice = createSlice({
  name: 'ratedMoviesSlice',
  initialState: <InitialValues>{
    movies: [],
  },
  reducers: {
    addRatedMovie: (state, action) => {
      state.movies.push(action.payload);
    },
  },
});

export const { addRatedMovie } = ratedMoviesSlice.actions;

export default ratedMoviesSlice.reducer;
