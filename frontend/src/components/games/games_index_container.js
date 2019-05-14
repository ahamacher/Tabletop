import { connect } from 'react-redux';
import GamesIndex from './games_index';
import { fetchAllGames } from '../../actions/game_actions';

const mapStateToProps = state => {
    return {
        currentUser: state.session.user,
        games: Object.values(state.entities.games)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllGames: () => dispatch(fetchAllGames())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesIndex);