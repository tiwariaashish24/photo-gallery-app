import { useCallback, useMemo, useReducer, useState, useEffect } from 'react'
import useFetchPhotos from './hooks/useFetchPhotos'
import PhotoCard from './components/PhotoCard'
import LoadingSpinner from './components/LoadingSpinner'
import { favouritesReducer, loadFavourites, FAVOURITES_STORAGE_KEY } from './reducers/favouritesReducer'

export default function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchTerm, setSearchTerm] = useState('')
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, loadFavourites)

  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // The gallery still works if browser storage is unavailable.
    }
  }, [favourites])

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return photos
    return photos.filter((photo) => photo.author.toLowerCase().includes(query))
  }, [photos, searchTerm])

  const handleToggleFavourite = (photo) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', photo })
  }

  const favouriteIds = useMemo(() => new Set(favourites.map((photo) => photo.id)), [favourites])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Photo Gallery</h1>
          <p className="mt-2 text-sm text-slate-500">A collection of photos from Picsum</p>
        </header>

        <div className="mx-auto mb-8 max-w-xl">
          <label htmlFor="photo-search" className="sr-only">Search photos by author</label>
          <div className="relative">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m16 16 4 4" />
            </svg>
            <input
              id="photo-search"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by author name..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-6 text-center text-sm text-red-700" role="alert">{error}</p>
        ) : filteredPhotos.length === 0 ? (
          <p className="py-12 text-center text-sm text-slate-500">No photos found for “{searchTerm}”.</p>
        ) : (
          <section aria-label="Photo gallery" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favouriteIds.has(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  )
}
