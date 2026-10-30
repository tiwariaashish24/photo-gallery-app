# Photo Gallery

A React + Vite photo gallery built with Tailwind CSS and the Picsum Photos API. It fetches 30 photos, filters the already-loaded photos by author, and saves favourite photos in `localStorage` using `useReducer`.

## Requirements

- Node.js 18 or later
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). To create a production build:

```bash
npm run build
```

## Project structure

```text
src/
├── components/
│   ├── LoadingSpinner.jsx
│   └── PhotoCard.jsx
├── hooks/
│   └── useFetchPhotos.js
├── reducers/
│   └── favouritesReducer.js
├── App.jsx
├── index.css
└── main.jsx
```

## Implementation notes

- `useFetchPhotos` owns the API request and returns `{ photos, loading, error }`. It aborts the request if the component unmounts and reports non-abort failures through `error`.
- `favouritesReducer` handles the `TOGGLE_FAVOURITE` action. The reducer adds a photo if it is not saved and removes it if it is already saved. The initial state is read from `localStorage`, and an effect writes changes back to storage.
- `useCallback` keeps the search input handler function stable between renders. `useMemo` recalculates the filtered array only when the photos or search term changes.
- The gallery uses one column on mobile, two on tablet, and four on desktop.

## Five-minute recording outline

1. Show the gallery loading, search for an author, favourite a photo, refresh, and show that the heart remains selected.
2. Open `src/hooks/useFetchPhotos.js`: explain the returned values, HTTP check, error handling, and request cleanup.
3. Open `src/reducers/favouritesReducer.js`: explain `TOGGLE_FAVOURITE`, adding/removing by photo ID, and why the reducer keeps the favourite transition logic in one place.
4. Open `src/App.jsx`: explain that `useCallback` stabilizes the input handler and `useMemo` avoids filtering again when its dependencies have not changed. Removing them would not break correctness; it would remove those optimizations.
5. Explain a real challenge you encountered while implementing or testing the app. Be honest and describe the actual fix you made.
