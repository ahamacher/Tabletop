import { combineReducers } from 'redux';
import items from './items_reducer'
import messagesReducer from "./messages_reducer";

export default combineReducers({
    items,
    messages: messagesReducer
});
