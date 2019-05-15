import { connect } from 'react-redux';
import ItemsIndex from './items_index';
import { fetchImages } from '../../actions/image_actions';


const mapStateToProps = (state) => {
    return {
        images: Object.values(state.entities.images)
    }
}   

const mapDispatchToProps = (dispatch) => {
    return {
        fetchImages: (gameId) => dispatch(fetchImages(gameId))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(ItemsIndex);