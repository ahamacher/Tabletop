import React from "react";
import { closeMessageModal } from "../../actions/message_modal_actions";
import { createMessage } from "../../actions/messages_actions";
import { connect } from "react-redux";
import MessageModalForm from "../messages/message_modal_form";

const MessageModal = ({ messageModal, closeMessageModal, createMessage }) => {
    if (!messageModal) {
        return null;
    }

    return (
        <div className="message-modal-background" onClick={closeMessageModal}>
            <div className="message-modal-child" onClick={e => e.stopPropagation()}>
                <MessageModalForm
                    posX={messageModal.posX}
                    posY={messageModal.posY}
                    createMessage={createMessage}
                    closeMessageModal={closeMessageModal} />
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        messageModal: state.ui.messageModal
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        closeMessageModal: () => dispatch(closeMessageModal()),
        createMessage: (messageParams) => dispatch(createMessage(ownProps.gameId, messageParams))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);