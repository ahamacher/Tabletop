import { connect } from 'react-redux';
import { fetchGameById } from '../../actions/game_actions';
import Game from './game';
import { fetchImageInstancesByGameId } from '../../actions/image_instance_actions';
import { fetchImages, clearImages } from "../../actions/image_actions";


const mSTP = (state, ownProps) => ({
  gameId: ownProps.match.params.gameId
})

const mDTP = (dispatch, ownProps) => {
  const gameId = ownProps.match.params.gameId;
  return {
    fetchGameById: gameId => dispatch(fetchGameById(gameId)),
    fetchImageInstances: () => dispatch(fetchImageInstancesByGameId(gameId)),
    fetchImages: ()=> dispatch(fetchImages(gameId)),
    clearImages: () => dispatch(clearImages())
  }
}

export default connect(mSTP, mDTP)(Game)