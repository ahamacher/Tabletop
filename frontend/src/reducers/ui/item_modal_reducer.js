import { OPEN_ITEM_MODAL, CLOSE_ITEM_MODAL } from "../../actions/item_modal_actions";

const itemModalReducer = (state = false, action) => {
    let newState;
    switch(action.type) {
        case OPEN_ITEM_MODAL:
            newState = action.payload;
            return newState;
        case CLOSE_ITEM_MODAL:
            newState = false;
            return newState;
        default:
            return state;
    }
}

export default itemModalReducer;