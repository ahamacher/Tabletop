import React from 'react';

class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { gameId: "" }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ gameId: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.joinGame(this.state.gameId).then((res) => {
            this.props.history.push(`/games/${res.game._id}`)
        })
    }

    render() {
        return (
            <div className="create-game-page session-form">
                <section className="create-game-form-body session-form-body">
                    <form onSubmit={this.handleSubmit} className="create-game-form session-form-inputs">
                        <h2>Join a New Game</h2>
                        <label>Game ID</label>
                        <input type="text"
                            onChange={this.handleChange} value={this.state.gameId} />
                        <input type="submit" value="Submit" />
                    </form>
                </section>
            </div>
        );
    }
}

export default GameForm;