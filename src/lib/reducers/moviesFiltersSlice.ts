import { SortByType } from '@/types/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialValues {
  sortBy: SortByType | string;
}

const moviesFiltersSlice = createSlice({
  name: 'moviesFiltersSlice',
  initialState: <InitialValues>{
    sortBy: 'popularity.desc',
  },
  reducers: {
    setSortBy: (state, action: PayloadAction<SortByType | string>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = moviesFiltersSlice.actions;

export default moviesFiltersSlice.reducer;
