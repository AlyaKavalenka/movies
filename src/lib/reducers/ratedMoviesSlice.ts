import { Genre, Movie } from '@/types/interfaces';
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

function getFromLocalStorage() {
  if (typeof window !== 'undefined') {
    const movies = localStorage.getItem('ratedMovies');
    return movies ? JSON.parse(movies) : undefined;
  }
  return undefined;
}

function saveInLocalStorage(movies: Movie[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('ratedMovies', JSON.stringify(movies));
  }
}

const ratedMoviesSlice = createSlice({
  name: 'ratedMoviesSlice',
  initialState: <InitialValues>{
    movies: getFromLocalStorage() || [],
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

      saveInLocalStorage(state.movies);
    },
    removeRatedMovie: (state, action) => {
      const foundIndex = state.movies.findIndex(
        (movie) => movie.id === action.payload.id,
      );

      if (foundIndex !== -1) {
        state.movies.splice(foundIndex, 1);

        saveInLocalStorage(state.movies);
      }
    },
  },
});

export const { addRatedMovie, removeRatedMovie } = ratedMoviesSlice.actions;

export default ratedMoviesSlice.reducer;
