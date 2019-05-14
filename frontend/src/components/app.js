import React from 'react';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import { Switch } from 'react-router-dom';
import GameCanvas from './canvas/game_canvas';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

//leaving this temporarly here
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavBarContainer from './nav/navbar_container';
import GamePage from './game/game_page.js';
import MessagesPage from "./messages/messages_page";
import ImagesContainer from './images/images_container';



const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/games/:gameId" component={GamePage} />
      <ProtectedRoute exact path="/messages" component={MessagesPage} />
      <ProtectedRoute exact path="/images" component={ImagesContainer} />
    </Switch>
  </div>
);

export default DragDropContext(HTML5Backend)(App)

