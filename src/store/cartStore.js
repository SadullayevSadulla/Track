import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product) =>
        set((state) => ({
          cart: state.cart.some((item) => item.id === product.id)
            ? state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: (item.quantity || 1) + 1 }
                  : item
              )
            : [...state.cart, { ...product, quantity: 1 }],
        })),

      changeQuantity: (id, amount) =>
        set((state) => ({
          cart: state.cart.flatMap((item) => {
            if (item.id !== id) return [item]

            const quantity = (item.quantity || 1) + amount
            return quantity > 0 ? [{ ...item, quantity }] : []
          }),
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