import React, { Component } from 'react';

export default class FoodBox extends Component {
    state = {
        quantity: 1
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    handleClick() {
        this.props.handleAdd(this.props.food, this.state.quantity);
    }

    render() {
        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={this.props.food.image} alt={this.props.food.image} />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                            <strong>{this.props.food.name}</strong> <br />
                            <small>{this.props.food.calories} cal</small>
                            </p>
                        </div>
                    </div>
                    <div className="media-right">
                        <div className="field has-addons">
                            <div className="control">
                            <input
                                className="input"
                                type="number"
                                name="quantity"
                                value={this.state.quantity}
                                onChange={e => this.handleChange(e)}
                            />
                            </div>
                            <div className="control">
                                <button className="button is-info" onClick={() => this.handleClick()}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}
