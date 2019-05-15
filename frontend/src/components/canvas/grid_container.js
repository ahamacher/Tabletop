import { connect } from 'react-redux'
import { fetchImageInstancesByGameId, updateImageInstance, clearImageInstances, receiveImageInstance } from  '../../actions/image_instance_actions';
import Grid from './grid';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return {
        game: state.entities.games[ownProps.match.params.gameId],
        pieces: state.entities.imageInstances,
        gameId: ownProps.match.params.gameId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchImageInstancesByGameId: (gameId) => dispatch(fetchImageInstancesByGameId(gameId)),
        updateImageInstance: (imageInstanceId, updateParams) => dispatch(updateImageInstance(imageInstanceId, updateParams)),
        clearImageInstances: () => dispatch(clearImageInstances()),
        receiveImageInstance: imageInstance => dispatch(receiveImageInstance(imageInstance))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Grid));