import { create } from "zustand";
import { persist } from "zustand/middleware";

export const normalizeFavoriteId = (id) => {
    if (id === null || id === undefined || id === "") return "";
    const normalizedId = String(id).trim();
    return normalizedId && normalizedId !== "null" && normalizedId !== "undefined" ? normalizedId : "";
};

export const normalizeFavoriteIds = (value = []) =>
    [...new Set(
        (Array.isArray(value) ? value : [])
            .map((item) => normalizeFavoriteId(item))
            .filter((item) => item)
    )];

export const useFavoriteStore = create(
    persist(
        (set) => ({
            favorites: [],

            toggleFavorite: (id) =>
                set((state) => {
                    const normalizedId = normalizeFavoriteId(id);
                    const currentFavorites = normalizeFavoriteIds(state.favorites);

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
            version: 1,
            migrate: (persistedState, version) => {
                if (version < 1) {
                    return {
                        ...persistedState,
                        favorites: normalizeFavoriteIds(persistedState?.favorites),
                    };
                }

                return {
                    ...persistedState,
                    favorites: normalizeFavoriteIds(persistedState?.favorites),
                };
            },
            partialize: (state) => ({
                favorites: normalizeFavoriteIds(state.favorites),
            }),
        }
    )
);