import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialValues {
  value: boolean;
}

const isOpenModalSlice = createSlice({
  name: 'isOpenModalSlice',
  initialState: <InitialValues>{
    value: false,
  },
  reducers: {
    isOpenModalValue: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { isOpenModalValue } = isOpenModalSlice.actions;

export default isOpenModalSlice.reducer;
