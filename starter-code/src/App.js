import React, { Component } from 'react';
import logo from './logo.svg';
import 'bulma/css/bulma.css';
import './App.css';

import foods from './foods.json';

import FoodBox from './components/FoodBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="title">IronNutrition</h1>

          <div>
            <input type="text" className="input search-bar" name="search" placeholder="Search" value="" />
          </div>

          <div className="columns">
            <div className="column">
              {foods.map((food, index) => {
                return (
                  <FoodBox key={index} food={food} />
                )
              })}
            </div>

            <div className="column content">
              <h2 className="subtitle">Today's foods</h2>
              <ul>
                <li>1 Pizza = 400 cal</li>
                <li>2 Salad = 300 cal</li>
              </ul>
              <strong>Total: 700 cal</strong>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
