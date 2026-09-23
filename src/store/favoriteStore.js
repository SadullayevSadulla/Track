import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoriteStore = create(
    persist(
        (set) => ({
            favorites: [],

            toggleFavorite: (id) =>
                set((state) => {
                    if (state.favorites.includes(id)) {
                        return {
                            favorites: state.favorites.filter(
                                (favoriteId) => favoriteId !== id
                            ),
                        };
                    }

                    return {
                        favorites: [...state.favorites, id],
                    };
                }),
        }),
        {
            name: "favorite-products",
            partialize: (state) => ({ favorites: state.favorites }),
        }
    )
);