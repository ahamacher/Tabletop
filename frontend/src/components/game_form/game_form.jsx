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
        const gameForm = { ...this.state }
        this.props.createGame(gameForm).then((res) => {
            this.props.history.push(`/games/${res.game._id}`)
        })
    }

    render() {
        return (
            <div className="create-game-page session-form">
                <section className="create-game-form-body session-form-body">
                    <form onSubmit={this.handleSubmit} className="create-game-form session-form-inputs">
                        <h2>Create a New Game</h2>
                        <label>Name</label>
                        <input type="text" 
                        onChange={this.handleChange} value={this.state.name}/>
                        <input type="submit" value="Submit"/>
                    </form>
                </section>
            </div>
        );
    }
}

export default GameForm;