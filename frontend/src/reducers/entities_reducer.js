import { combineReducers } from 'redux';
import items from './items_reducer';
import images from './images_reducer';


export default combineReducers({
    items,
    images
});
