import { SortByType } from '@/types/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialValues {
  sortBy: SortByType | string;
  genresFilter: string | undefined;
}

const moviesFiltersSlice = createSlice({
  name: 'moviesFiltersSlice',
  initialState: <InitialValues>{
    sortBy: 'popularity.desc',
    genresFilter: undefined,
  },
  reducers: {
    setSortBy: (state, action: PayloadAction<SortByType | string>) => {
      state.sortBy = action.payload;
    },
    setGenresFilter: (state, action: PayloadAction<string[] | undefined>) => {
      state.genresFilter = action.payload?.join(',');
    },
  },
});

export const { setSortBy, setGenresFilter } = moviesFiltersSlice.actions;

export default moviesFiltersSlice.reducer;
