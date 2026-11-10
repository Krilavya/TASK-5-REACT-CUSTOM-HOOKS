import React, { useMemo, useState } from "react";
import useFetch from "./hooks/useFetch.js";
import react from "react"; 

const API_URL = "https://api.escuelajs.co/api/v1/products";

function ProductCard({ product, index }) {
  const imageUrl = Array.isArray(product.images) ? product.images[0] : "";
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="product-card">
      <div className={`product-image image-tone-${index % 8}`}>
        {imageUrl && !imageFailed ? (
          <img
            src={imageUrl}
            alt={product.title || "Product"}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="image-fallback" aria-label="Image unavailable">
            <span>PHOTO</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-category">
            {product.category?.name || "Product"}
          </span>
          <span className="product-id">#{product.id}</span>
        </div>
        <h2 title={product.title}>{product.title || "Untitled product"}</h2>
        <p className="product-description">
          {product.description || "No description is available for this product."}
        </p>
        <div className="product-bottom">
          <strong>${Number(product.price || 0).toFixed(2)}</strong>
          <span className="view-label">API DATA</span>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const { data, loading, error, refetch } = useFetch(API_URL);
  const [searchTerm, setSearchTerm] = useState("");

  const products = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const query = searchTerm.trim().toLowerCase();
    if (!query) return data;
    return data.filter((product) =>
      `${product.title || ""} ${product.description || ""} ${product.category?.name || ""}`
        .toLowerCase()
        .includes(query)
    );
  }, [data, searchTerm]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Custom hooks home">
          <span className="brand-mark">H</span>
          <span>Hook<span className="brand-light">Lab</span></span>
        </a>
        <span className="task-tag">TASK 5 · REACT CUSTOM HOOKS</span>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow"><span className="live-dot" /> LIVE API DEMO</p>
          <h1>Products, fetched<br /><span>the React way.</span></h1>
          <p className="hero-copy">
            A reusable <code>useFetch</code> custom hook handles API requests,
            loading states and errors — keeping the component clean and focused.
          </p>
          <div className="hero-actions">
            <button className="refresh-button" onClick={refetch} disabled={loading}>
              <span className={loading ? "spin" : ""}>↻</span>
              {loading ? "Fetching..." : "Refresh products"}
            </button>
            <span className="endpoint">GET /api/v1/products</span>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hook-symbol">{"{ }"}</div>
          <span className="floating-chip chip-one">useState</span>
          <span className="floating-chip chip-two">useEffect</span>
          <span className="floating-chip chip-three">fetch()</span>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">API RESPONSE</p>
            <h2>Product gallery</h2>
            <p className="section-copy">Products are loaded from the public EscuelaJS API.</p>
          </div>
          <div className="result-count">
            <strong>{loading ? "—" : products.length}</strong>
            <span>PRODUCTS</span>
          </div>
        </div>

        <div className="toolbar">
          <label className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search products or categories..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              disabled={loading || Boolean(error)}
            />
          </label>
          <span className="status-label">
            <span className={`status-dot ${error ? "status-error" : loading ? "status-loading" : ""}`} />
            {error ? "API ERROR" : loading ? "LOADING" : "CONNECTED"}
          </span>
        </div>

        {loading && (
          <div className="state-panel" role="status" aria-live="polite">
            <div className="loader" />
            <h3>Fetching products...</h3>
            <p>useFetch is requesting data from the API.</p>
            <div className="skeleton-grid">
              {[1, 2, 3, 4].map((item) => <div className="skeleton-card" key={item} />)}
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="state-panel error-panel" role="alert">
            <div className="state-icon">!</div>
            <h3>Could not load products</h3>
            <p>{error}</p>
            <p className="state-hint">Check your internet connection, then try again.</p>
            <button className="refresh-button" onClick={refetch}>Try again</button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="state-panel">
            <div className="state-icon">⌕</div>
            <h3>No products found</h3>
            <p>Try another search term.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <span>HookLab <span className="brand-light">/ Task 5</span></span>
        <span>Built with React · useFetch custom hook</span>
      </footer>
    </main>
  );
}