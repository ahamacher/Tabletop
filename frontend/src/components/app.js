import React from 'react';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import { Switch } from 'react-router-dom';

// socket imports, may move depending on if we want it to load
// upon moving to the /game page

//leaving this temporarly here
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import NavBarContainer from './nav/navbar_container';
import GamePage from './game/game_page.js';


const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <ProtectedRoute exact path="/game" component={GamePage} />
    </Switch>
  </div>
);

export default App;
