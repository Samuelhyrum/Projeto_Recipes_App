import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);

  const contextInfo = {
    showSearch,
    setShowSearch,
  };

  return (
    <AppContext.Provider value={ contextInfo }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
