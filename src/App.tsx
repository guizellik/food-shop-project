import React from 'react';
import './App.css';
import BeerList from './components/beer/Beer'
import Food from './components/food/Food'

function App() {

  return (
    <div className="App">
      <Food />
      <BeerList />
    </div>
  );
}


export default App;