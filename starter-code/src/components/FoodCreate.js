import React, { Component } from 'react';

export default class FoodCreate extends Component {
    state = {
        show: false,
        name: '',
        calories: 0,
        image: ''
    }

    toggleForm() {
        let showClone = !this.state.show;

        this.setState({show: showClone});
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.createFood(this.state);

        this.setState({
            show: false,
            name: '',
            calories: 0,
            image: ''
        })
    }

    render() {
        if(!this.state.show) {
            return (
                <button className="button" onClick={() => this.toggleForm()}>Create new food</button>
            );
        }

        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <h2 className="subtitle">Create new food</h2>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Name" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Calories</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Calories" name="calories" value={this.state.calories} onChange={e => this.handleChange(e)} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Image</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Image" name="image" value={this.state.image} onChange={e => this.handleChange(e)} />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button type="submit" className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button type="reset" className="button is-danger" onClick={() => this.toggleForm()}>Cancel</button>
                    </div>
                </div>
            </form>
        )
    }
}
