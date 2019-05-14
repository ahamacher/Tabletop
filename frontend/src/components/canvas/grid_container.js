import { connect } from 'react-redux'
import { fetchImageInstancesByGameId } from  '../../actions/image_instance_actions';
import Grid from './grid';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return {
        pieces: state.entities.imageInstances
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchImageInstancesByGameId: (gameId) => dispatch(fetchImageInstancesByGameId(gameId)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Grid));