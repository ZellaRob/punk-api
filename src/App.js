import React, { Component } from 'react';
import RandomBeer from './components/RandomBeer';
import BeerSearch from './components/BeerSearch';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <RandomBeer />
        <BeerSearch />
        <Footer />
      </div>
    );
  }
}

export default App;
