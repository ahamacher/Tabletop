import React, { Component } from 'react';
import { getImagesByGameId } from "../../utils/images_api_util";
// import { withRouter } from 'react-router-dom';
import GameCanvas from '../canvas/game_canvas';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let res = getImagesByGameId(1);

    return (
      <div>
        <h1>LOGGED INTO THE GAME PAGE</h1>
        <GameCanvas />
      </div>
      )
  }
}

export default GamePage;
