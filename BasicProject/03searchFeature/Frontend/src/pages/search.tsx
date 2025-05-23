import React, { useEffect, useState } from "react";
import { API_KEY } from "../utills/util.tsx";
import { useNavigate } from "react-router-dom";

interface Product {
  _id: string;
  productName: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestion, setSuggestion] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Moved inside the component

  const autoComplete = async () => {
    if (!query.trim()) {
      setSuggestion([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchUrl = `${API_KEY}/search?query=${query}`;
      const result = await fetch(searchUrl);
      if (!result.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await result.json();
      setSuggestion(data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch suggestions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      autoComplete();
    }, 300); // Debounce for 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <>
      <div className="container">
        <input
          type="search"
          placeholder="What is your need?"
          value={query}
          className="searchbox"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {suggestion.length > 0 && (
          <ul  className="dropdown">
            {suggestion.map((product) => (
              <li 
                onClick={() => {
                  navigate(`/product/${product._id}`);
                }}
                key={product._id}
                style={{ cursor: 'pointer' }} // Optional: Add cursor style for better UX
              >
                {product.productName}
              </li>
            ))}
          </ul>
        )}
      </div>
   
    </>
  );
};

export default Search;