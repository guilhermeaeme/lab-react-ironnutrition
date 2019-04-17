import React, { Component } from 'react';

import 'bulma/css/bulma.css';
import './App.css';

import foods from './foods.json';

import FoodBox from './components/FoodBox';
import FoodCreate from './components/FoodCreate';

class App extends Component {
  state = {
    search: "",
    allFoods: foods,
    filteredFoods: foods,
    cart: [],
    total: 0
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({[name]: value});

    if(name === "search") {
      this.handleFilter(value);
    }
  }

  handleFilter(query) {
    let newFoods = [...this.state.allFoods];

    if(query != "") {
      newFoods = newFoods.filter(item => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      })
    }

    this.setState({
      filteredFoods: newFoods
    });
  }
  
  handleAdd(food, quantity) {
    let newCart = [...this.state.cart];
    
    let newFood = {...food};
    newFood.quantity = Number(quantity);
    newFood.total = Number(quantity) * Number(food.calories);

    let push = true;

    newCart.forEach(item => {
      if(item.name == newFood.name) {
        push = false;
        item.quantity += Number(newFood.quantity);
        item.total += Number(newFood.total);
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

  handleDelete(index) {
    let newCart = [...this.state.cart];

    newCart.splice(index, 1);

    let total = newCart.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    
    this.setState({
      cart: newCart,
      total
    });
  }

  handleCreateFood(food) {
    let newFoods = [...foods];

    newFoods.unshift({
      name: food.name,
      calories: food.calories,
      image: food.image
    });

    this.setState({
      allFoods: newFoods
    }, () => this.handleFilter(this.state.search));
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
              {this.state.filteredFoods.map((food, index) => {
                return (
                  <FoodBox key={food.name} food={food} handleAdd={(food, quantity) => this.handleAdd(food, quantity)} />
                )
              })}
            </div>

            <hr/>

            <div className="column content">
              <h2 className="subtitle">Today's foods</h2>
              <nav className="panel">
                {this.state.cart.map((food, index) => {
                  return (
                    <div className="panel-block" key={index}>
                      <div className="control">
                        <span>{food.quantity} {food.name} = {food.total} cal</span>
                        <button className="button is-small is-danger is-pulled-right" onClick={() => this.handleDelete(index)}>-</button>&nbsp;
                      </div>
                    </div>
                  )
                })}
                <div className="panel-block">
                  <strong>Total: {this.state.total} cal</strong>
                </div>
              </nav>

              <FoodCreate createFood={(food) => this.handleCreateFood(food)} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
