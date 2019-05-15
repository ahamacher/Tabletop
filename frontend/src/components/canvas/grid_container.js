import { connect } from 'react-redux'
import { fetchImageInstancesByGameId, updateImageInstance } from  '../../actions/image_instance_actions';
import Grid from './grid';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return {
        game: state.entities.games[ownProps.match.params.gameId],
        pieces: state.entities.imageInstances
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchImageInstancesByGameId: (gameId) => dispatch(fetchImageInstancesByGameId(gameId)),
        updateImageInstance: (imageInstanceId, updateParams) => dispatch(updateImageInstance(imageInstanceId, updateParams))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Grid));