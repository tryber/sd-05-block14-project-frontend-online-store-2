import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Busca from './components/Busca';
import Carrinho from './components/Carrinho';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Link to="/">Página inicial</Link>
      <Switch>
        <Route exact path="/" render={(props) => <Busca {...props} />} />
        <Route path="/shopping-cart" render={(props) => <Carrinho {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
