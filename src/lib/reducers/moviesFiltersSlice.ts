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
  },
  reducers: {
    setSortBy: (state, action: PayloadAction<SortByType | string>) => {
      state.sortBy = action.payload;
    },
    setGenresFilter: (state, action: PayloadAction<string[] | undefined>) => {
      state.genresFilter = action.payload?.join(',');
    },
    setReleaseYearFilter: (state, action) => {
      state.releaseYearFilter = +action.payload;
    },
    setVoteAverage: (state, action) => {
      state.voteAverage.gte = action.payload.gte;
      state.voteAverage.lte = action.payload.lte;
    },
  },
});

export const {
  setSortBy,
  setGenresFilter,
  setReleaseYearFilter,
  setVoteAverage,
} = moviesFiltersSlice.actions;

export default moviesFiltersSlice.reducer;
