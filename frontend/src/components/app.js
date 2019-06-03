import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import { Switch } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'


// socket imports, may move depending on if we want it to load
// upon moving to the /game page

//leaving this temporarly here
import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavBarContainer from './nav/navbar_container';
import MessagesPage from "./messages/messages_page";
import ImagesContainer from './images/images_container';
import GameContainer from './game/game_container';
import GameFormContainer from './game_form/game_form_container';
import ImageInstancesContainer from "./images/image_instances_container";
import JoinGameContainer from "./game/join_game_container";
import ItemModal from "./canvas/item_modal";


const App = () => (
  <div id="main">
    <ItemModal />
    <NavBarContainer />
    <Switch>
      <Route exact path="/" component={MainPageContainer} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute path="/messages/:groupId" component={MessagesPage} />
      <ProtectedRoute exact path="/games/new" component={GameFormContainer} />
      <ProtectedRoute exact path="/games/join" component={JoinGameContainer} />
      <ProtectedRoute exact path="/games/:gameId" component={GameContainer} />
      <ProtectedRoute exact path="/messages" component={MessagesPage} />
      <ProtectedRoute path="/images/:gameId" component={ImagesContainer} />
      <ProtectedRoute exact path="/images" component={ImagesContainer} />
      <ProtectedRoute path="/image_instances/:gameId" component={ImageInstancesContainer} />
      <Redirect to="/" />

    </Switch>
  </div>
);

export default DragDropContext(HTML5Backend)(App)

