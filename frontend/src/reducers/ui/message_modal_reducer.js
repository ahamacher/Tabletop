import { OPEN_MESSAGE_MODAL, CLOSE_MESSAGE_MODAL } from "../../actions/message_modal_actions";

const messageModalReducer = (state = false, action) => {
    let newState;
    switch (action.type) {
        case OPEN_MESSAGE_MODAL:
            newState = action.payload;
            return newState;
        case CLOSE_MESSAGE_MODAL:
            newState = false;
            return newState;
        default:
            return state;
    }
}

export default messageModalReducer;