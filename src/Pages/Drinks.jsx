import React, { useContext, useEffect } from 'react';
import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AppContext from '../context/AppContext';
import { fetchName } from '../services/fetchAPI';

function Drinks() {
  const { showSearch, setContent } = useContext(AppContext);

  const fetchData = async () => {
    const data = await fetchName('', 'drinks');
    setContent(data);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line

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
