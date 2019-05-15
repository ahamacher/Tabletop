import { combineReducers } from 'redux';

import images from './images_reducer';
import messages from './messages_reducer';
import imageInstances from "./image_instances_reducer";
import games from './game_reducer';

export default combineReducers({
    images,
    messages,
    imageInstances,
    games
});
