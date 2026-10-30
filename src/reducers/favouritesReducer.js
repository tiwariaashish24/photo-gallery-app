export const FAVOURITES_STORAGE_KEY = 'photo-gallery-favourites'

export function loadFavourites() {
  try {
    const saved = localStorage.getItem(FAVOURITES_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const alreadyFavourite = state.some((photo) => photo.id === action.photo.id)
      return alreadyFavourite
        ? state.filter((photo) => photo.id !== action.photo.id)
        : [...state, action.photo]
    }
    default:
      return state
  }
}
