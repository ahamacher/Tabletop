import { connect } from 'react-redux';
import { fetchGameById } from '../../actions/game_actions';
import Game from './game';

const mSTP = (state, ownProps) => ({
  gameId: ownProps.match.params.gameId
})

const mDTP = dispatch => ({
  fetchGameById: gameId => dispatch(fetchGameById(gameId))
})

export default connect(mSTP, mDTP)(Game)