import { SortByType } from '@/types/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialValues {
  sortBy: SortByType | string;
  genresFilter: string | undefined;
  releaseYearFilter: number | null;
  voteAverage: {
    lte: number | undefined;
    gte: number | undefined;
  };
  page: number;
}

const moviesFiltersSlice = createSlice({
  name: 'moviesFiltersSlice',
  initialState: <InitialValues>{
    sortBy: 'popularity.desc',
    genresFilter: undefined,
    releaseYearFilter: null,
    voteAverage: {
      gte: undefined,
      lte: undefined,
    },
    page: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortByType | string>) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    setGenresFilter: (state, action: PayloadAction<string[] | undefined>) => {
      state.genresFilter = action.payload?.join(',');
      state.page = 1;
    },
    setReleaseYearFilter: (state, action) => {
      state.releaseYearFilter = +action.payload;
      state.page = 1;
    },
    setVoteAverage: (state, action) => {
      state.voteAverage.gte = action.payload.gte;
      state.voteAverage.lte = action.payload.lte;
      state.page = 1;
    },
  },
});

export const {
  setSortBy,
  setGenresFilter,
  setReleaseYearFilter,
  setVoteAverage,
  setPage,
} = moviesFiltersSlice.actions;

export default moviesFiltersSlice.reducer;
