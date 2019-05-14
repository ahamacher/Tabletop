import { connect } from 'react-redux'
import { fetchItems } from  '../../actions/item_actions';
import Grid from './grid';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return {
        pieces: state.entities.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItems: (gameId) => dispatch(fetchItems(gameId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Grid));