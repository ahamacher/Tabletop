import { combineReducers } from 'redux';

import itemModalReducer from './item_modal_reducer';
import messageModalReducer from "./message_modal_reducer";

export default combineReducers({
    itemModalId: itemModalReducer,
    messageModal: messageModalReducer
});
