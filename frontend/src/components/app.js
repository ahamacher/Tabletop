import React from 'react';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import { Switch } from 'react-router-dom';
import GameCanvas from './canvas/game_canvas';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

//leaving this temporarly here
import MainPage from './main/main_page';
// import LoginFormContainer from './session/login_form_container';
// import SignupFormContainer from './session/signup_form_container';
// import NavBarContainer from './nav/navbar_container';


const App = () => (
  <div>
    {/* <NavBarContainer /> */}
    <GameCanvas />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      {/* <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} /> */}
    </Switch>
  </div>
);

export default DragDropContext(HTML5Backend)(App)

