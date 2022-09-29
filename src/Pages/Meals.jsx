import React, { useContext, useEffect } from 'react';
import Content from '../components/Content';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import AppContext from '../context/AppContext';
import { fetchName } from '../services/fetchAPI';

function Meals() {
  const { showSearch, setContent } = useContext(AppContext);

  const fetchData = async () => {
    const data = await fetchName('', 'meals');
    setContent(data);
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line

  return (
    <div>
      <Header title="Meals" />
      {showSearch && <SearchBar title="meals" />}
      <Recipes title="meals" />
      <Content title="meals" />
      <Footer />
    </div>
  );
}

export default Meals;
