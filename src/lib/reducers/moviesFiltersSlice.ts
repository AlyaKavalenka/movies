import { SortByType } from '@/types/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialValues {
  sortBy: SortByType | string;
  genresFilter: string | undefined;
  releaseYearFilter: number | null;
}

const moviesFiltersSlice = createSlice({
  name: 'moviesFiltersSlice',
  initialState: <InitialValues>{
    sortBy: 'popularity.desc',
    genresFilter: undefined,
    releaseYearFilter: null,
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
  },
});

export const { setSortBy, setGenresFilter, setReleaseYearFilter } =
  moviesFiltersSlice.actions;

export default moviesFiltersSlice.reducer;
