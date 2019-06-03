import { combineReducers } from 'redux';

import itemModalReducer from './item_modal_reducer';

export default combineReducers({
    itemModal: itemModalReducer
});
