import React, { useContext } from 'react';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AppContext from '../context/AppContext';

function Drinks() {
  const { showSearch } = useContext(AppContext);
  return (
    <div>
      <Header title="Drinks" />
      {showSearch && <SearchBar title="drinks" />}
      <Content title="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
