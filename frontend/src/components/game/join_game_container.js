import { connect } from 'react-redux';
import JoinGame from './join_game';
import { joinGame } from '../../actions/game_actions';

const mapStateToProps = state => {
    return {
        currentUser: state.session.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        joinGame: (gameId) => dispatch(joinGame(gameId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGame);