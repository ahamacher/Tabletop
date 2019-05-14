import { RECEIVE_ITEM, RECEIVE_ITEMS } from '../actions/item_actions';

export default (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ITEMS:
            const newState = {};
            for (let i = 0; i < action.items.length; i++ ) {
                newState[action.items[i]._id] = action.items[i]
            }
            return newState;
        case RECEIVE_ITEM:
            return Object.assign({}, state, { [action.item.id] : action.item });
        default:
            return state;
    }
}