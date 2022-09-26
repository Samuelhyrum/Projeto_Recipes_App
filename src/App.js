import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import Login from './Pages/Login';
import Meals from './Pages/Meals';
import Drinks from './Pages/Drinks';

function App() {
  return (
    <AppProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
      </Switch>
    </AppProvider>
  );
}

export default App;
