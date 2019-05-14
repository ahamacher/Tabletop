import { RECEIVE_ITEM } from '../actions/grid_actions';

export default (state={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ITEM:
            return Object.assign({}, state, { [action.item.id] : action.item })    
        default:
            return state;
    }
}