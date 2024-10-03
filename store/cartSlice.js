import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {selectedItemId: null} ,
  reducers: {
    setProductId: (state, action) => {
      state.selectedItemId = action.payload; // Met à jour avec l'ID ou null
    },
  },
});

export const { setProductId } = productSlice.actions;
export default productSlice.reducer;
