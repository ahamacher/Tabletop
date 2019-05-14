import React from 'react';

class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: " " }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ name: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        const gameForm = { ...this.state, gameMaster: this.props.currentUser._id }
        this.props.createGame(gameForm).then((res) => this.props.history.push(`/games/${res._id}`))
    }

    render() {
        return (
            <div id="create-game-page">
                <form onSubmit={this.handleSubmit} id="create-game-form">
                    <h2>Create a New Game</h2>
                    <label>Name</label>
                    <input type="text" 
                    onChange={this.handleChange} value={this.state.name}/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default GameForm;