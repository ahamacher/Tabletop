import React from 'react';
import { Link } from 'react-router-dom';

const GamesIndexItem = ({ game, currentUser }) => (
    <Link className="game-index-item" to={`/games/${game._id}`}>
            <h2>{game.name}</h2>
            <section className='game-index-item-info'>
            {game.gameMaster === currentUser.id ? <p className="gm"><i className="fas fa-dungeon"></i>GM</p> : <p>Player</p> }
            {game.isFinished === false ? <p className="live"><i className="far fa-dot-circle"></i>Live</p> : <p className="finished">Finished</p> }
            </section>
    </Link>
    
)

export default GamesIndexItem;