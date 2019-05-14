import { connect } from 'react-redux';
import Images from './images';
import {fetchImages, createImage } from '../../actions/image_actions';

const mapStateToProps = (state) => ({
    images: state.entities.images 
});


const mapDispatchToProps = (dispatch, ownProps) => {
    
    return ({
        fetchImages: () => dispatch(fetchImages(ownProps.match.params.groupId)),
        createImage: (image) => dispatch(createImage(ownProps.match.params.groupId, image))
    })
};

export default connect(mapStateToProps, mapDispatchToProps)(Images);