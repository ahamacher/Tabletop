import React from 'react';
import Splash from '../splash/splash';

const MainPage = ({loggedIn}) => {
  if (!loggedIn) {
    debugger
    return <Splash />
  } else {
    debugger
    return <h1>Authenticated Main Page</h1>
  }
}

export default MainPage;