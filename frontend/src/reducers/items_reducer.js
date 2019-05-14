import { RECEIVE_ITEM, RECEIVE_ITEMS } from '../actions/game_actions';

export default (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ITEMS:
            return action.items;
        case RECEIVE_ITEM:
            return Object.assign({}, state, { [action.item.id] : action.item });
        default:
            return state;
    }
}