<<<<<<< HEAD
# Task 5 – React Custom Hooks

A React application demonstrating a reusable `useFetch` custom hook.

## Assignment requirements covered

- Custom hook is named `useFetch`.
- Accepts a URL parameter.
- Fetches API data with the browser `fetch` API.
- Returns `data`, `loading`, `error`, and `refetch`.
- Uses `useState`, `useEffect`, and `useCallback`.
- Handles HTTP errors, invalid responses, network errors, and request cancellation.
- React component consumes the hook and displays API data.
- Includes loading, error, empty, search, and retry states.
- Responsive CSS styling.

## API used

`https://api.escuelajs.co/api/v1/products`

## Run locally

1. Install Node.js (LTS).
2. Extract the ZIP.
3. Open the extracted folder in VS Code.
4. Open Terminal → New Terminal.
5. Run:

```bash
npm install
npm run dev
```

6. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Create production build

```bash
npm run build
npm run preview
```

The production-ready website is generated in the `dist` folder.

## Project structure

```text
Task-5-React-Custom-Hooks/
├── index.html
├── package.json
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    └── hooks/
        └── useFetch.js
```

## Notes

- An internet connection is required to retrieve products from the public API.
- This is a frontend learning assignment; it does not require a backend.
- If the API is temporarily unavailable, the page shows an error state and a retry button.
=======
