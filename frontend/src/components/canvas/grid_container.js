import { connect } from 'react-redux'
import { fetchImageInstancesByGameId, updateImageInstance, clearImageInstances, receiveImageInstance, createImageInstance } from  '../../actions/image_instance_actions';
import { fetchMessagesByGameId, createMessage, receiveMessage } from "../../actions/messages_actions";
import { openMessageModal } from "../../actions/message_modal_actions";
import { openItemModal } from "../../actions/item_modal_actions";
import Grid from './grid';
import { withRouter } from 'react-router-dom'
import { clearImages } from '../../actions/image_actions';

const mapStateToProps = (state, ownProps) => {
    return {
        game: state.entities.games[ownProps.match.params.gameId],
        pieces: state.entities.imageInstances,
        gameId: ownProps.match.params.gameId,
        images: state.entities.images,
        messages: state.entities.messages,
        messageDisplay: ownProps.messageDisplay
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchImageInstancesByGameId: (gameId) => dispatch(fetchImageInstancesByGameId(gameId)),
        updateImageInstance: (imageInstanceId, updateParams) => dispatch(updateImageInstance(imageInstanceId, updateParams)),
        clearImageInstances: () => dispatch(clearImageInstances()),
        receiveImageInstance: imageInstance => dispatch(receiveImageInstance(imageInstance)),
        createImageInstance: (imageId, imageInstanceParams) => dispatch(createImageInstance(imageId, imageInstanceParams)),
        fetchMessages: (gameId) => dispatch(fetchMessagesByGameId(gameId)),
        openItemModal: (imageInstanceId) => dispatch(openItemModal(imageInstanceId)),
        openMessageModal: (position) => dispatch(openMessageModal(position)),
        clearImages: () => dispatch(clearImages())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Grid));