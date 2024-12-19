import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  return (
    <div className="search-results">
      <h2>Результати пошуку для: "{query}"</h2>
      {query ? (
        <iframe
          src={`https://www.google.com/search?q=${encodeURIComponent(query)}`}
          title="Google Search Results"
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        ></iframe>
      ) : (
        <p>Введіть запит для пошуку...</p>
      )}
    </div>
  );
};

export default SearchResults;
