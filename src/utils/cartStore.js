import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) =>
    set((state) => {
      const index = state.cart.findIndex((i) => i.id === id);
      if (index === -1) return state;
      const newCart = [...state.cart];
      newCart.splice(index, 1);
      return { cart: newCart };
    }),
  clearCart: () => set({ cart: [] }),
}));