import { Movie } from '@/types/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialValues {
  value: boolean;
  clickedMovie: Movie | null;
}

const isOpenModalSlice = createSlice({
  name: 'isOpenModalSlice',
  initialState: <InitialValues>{
    value: false,
    clickedMovie: null,
  },
  reducers: {
    isOpenModalValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    setClickedMovie: (state, action) => {
      state.clickedMovie = action.payload;
    },
  },
});

export const { isOpenModalValue, setClickedMovie } = isOpenModalSlice.actions;

export default isOpenModalSlice.reducer;
