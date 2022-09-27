import React from 'react';

function SearchBar() {
  return (
    <form>
      <input
        type="search"
        data-testid="search-input"
        placeholder="Buscar"
      />
    </form>
  );
}

export default SearchBar;
