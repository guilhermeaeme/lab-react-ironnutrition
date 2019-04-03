import React, { Component } from 'react';

import 'bulma/css/bulma.css';
import './App.css';

import foods from './foods.json';

import FoodBox from './components/FoodBox';

class App extends Component {
  state = {
    sarch: "",
    cart: [],
    total: 0
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }
  
  handleAdd(food, quantity) {
    let newCart = [...this.state.cart];
    
    let newFood = {...food};
    newFood.quantity = quantity;
    newFood.total = quantity * food.calories;

    let push = true;

    newCart.forEach(item => {
      if(item.name == newFood.name) {
        push = false;
        item.quantity += newFood.quantity;
        item.total += newFood.total;
      }
    });

    if(push) {
      newCart.push(newFood);
    }

    let total = newCart.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    
    this.setState({
      cart: newCart,
      total
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="title">IronNutrition</h1>

          <div>
            <input type="text" className="input search-bar" name="search" placeholder="Search" value={this.state.search} onChange={e => this.handleChange(e)} />
          </div>

          <div className="columns">
            <div className="column">
              {foods.map((food, index) => {
                return (
                  <FoodBox key={index} food={food} handleAdd={(food, quantity) => this.handleAdd(food, quantity)} />
                )
              })}
            </div>

            <div className="column content">
              <h2 className="subtitle">Today's foods</h2>
              <ul>
                {this.state.cart.map((food, index) => {
                  return (
                    <li key={index}>{food.quantity} {food.name} = {food.total} cal</li>
                  )
                })}
              </ul>
              <strong>Total: {this.state.total} cal</strong>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
