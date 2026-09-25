import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => ({
          cart: state.cart.some((item) => item.id === product.id)
            ? state.cart
            : [...state.cart, product],
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "cart-products",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)