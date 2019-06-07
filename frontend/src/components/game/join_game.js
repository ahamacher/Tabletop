import React from 'react';
import { Link } from 'react-router-dom';

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
                            onChange={this.handleChange} value={this.state.gameId} placeholder="Ask your GameMaster for a game id"/>
                        <input type="submit" value="Submit" />
                    </form>
                    <div className="create-game-subtext">Don't have a game id? Click <Link to={'/games/new'}>here</Link> to make one.</div>
                </section>
            </div>
        );
    }
}

export default GameForm;