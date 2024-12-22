import { createSlice } from '@reduxjs/toolkit';
import { IProduct } from '@/types/globalTypes';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ICart {
  products: (IProduct & { quantity: number })[];
  total: number;
}

const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existing) {
        existing.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
          state.total -= existing.price;
        } else {
          state.products = state.products.filter(
            (product) => product.id !== action.payload.id
          );
          state.total -= existing.price;
        }
      }
    },
    deleteFromCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (existing) {
        state.total -= existing.price * existing.quantity;

        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
