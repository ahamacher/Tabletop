import React from 'react';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import { Switch } from 'react-router-dom';
import GameCanvas from './canvas/game_canvas';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'


// socket imports, may move depending on if we want it to load
// upon moving to the /game page

//leaving this temporarly here
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavBarContainer from './nav/navbar_container';
import MessagesPage from "./messages/messages_page";
import ImagesContainer from './images/images_container';
import GameContainer from './game/game_container';




const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute path="/messages/:groupId" component={MessagesPage} />
      <ProtectedRoute exact path="/games/:gameId" component={GameContainer} />
      <ProtectedRoute exact path="/messages" component={MessagesPage} />
      <ProtectedRoute exact path="/images" component={ImagesContainer} />
    </Switch>
  </div>
);

export default DragDropContext(HTML5Backend)(App)

