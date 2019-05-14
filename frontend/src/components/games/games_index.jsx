import React from 'react';
import GameIndexItem from './games_index_item';

class GamesIndex extends React.Component {

    componentDidMount() {
        this.props.fetchAllGames();
    }

    render() {
        const games = Object.values(this.props.games).map((game) => <GameIndexItem key={game._id} currentUser={this.props.currentUser} game={game}/>)
        return (
            <div className="games-index-page">
                <ul className="games-index">
                    {games}
                </ul>
            </div>
        );
    }
}

export default GamesIndex;