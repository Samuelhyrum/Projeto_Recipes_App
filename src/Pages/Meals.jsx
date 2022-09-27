import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AppContext from '../context/AppContext';

function Meals() {
  const { showSearch } = useContext(AppContext);
  return (
    <div>
      <Header title="Meals" />
      {showSearch && <SearchBar title="meals" />}
      <Footer />
    </div>
  );
}

export default Meals;
