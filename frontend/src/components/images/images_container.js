import { connect } from 'react-redux';
import Images from './images';
import {fetchImages, createImage } from '../../actions/image_actions';

const mapStateToProps = (state, ownProps) => ({
    gameId: ownProps.gameId,
    images: state.entities.images 
});


const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchImages: () => dispatch(fetchImages(ownProps.match.params.gameId)),
        createImage: (image) => dispatch(createImage(ownProps.match.params.gameId, image))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);