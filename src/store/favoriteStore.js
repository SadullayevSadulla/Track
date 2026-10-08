import { create } from "zustand";
import { persist } from "zustand/middleware";

const normalizeFavoriteId = (id) => String(id);

export const useFavoriteStore = create(
    persist(
        (set) => ({
            favorites: [],

            toggleFavorite: (id) =>
                set((state) => {
                    const normalizedId = normalizeFavoriteId(id);
                    const currentFavorites = (state.favorites ?? []).map(String);

                    if (currentFavorites.includes(normalizedId)) {
                        return {
                            favorites: currentFavorites.filter(
                                (favoriteId) => favoriteId !== normalizedId
                            ),
                        };
                    }

                    return {
                        favorites: [...currentFavorites, normalizedId],
                    };
                }),
        }),
        {
            name: "favorite-products",
            partialize: (state) => ({
                favorites: (state.favorites ?? []).map(String),
            }),
        }
    )
);