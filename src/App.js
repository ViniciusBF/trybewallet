import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/carteira" exact component={ Wallet } />
    </Switch>
  );
}

export default App;
