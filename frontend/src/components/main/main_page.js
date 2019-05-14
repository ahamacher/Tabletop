import React from 'react';
import Splash from '../splash/splash';
import GamesIndexContainer from '../games/games_index_container';

const MainPage = ({loggedIn}) => {
  if (!loggedIn) {
    return <Splash />
  } else {
    return (
      <div>
        <GamesIndexContainer />
      </div>
    )
  }
}

export default MainPage;