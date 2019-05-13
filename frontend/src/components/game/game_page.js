import React, { Component } from 'react';
import { getImagesByGameId } from "../../utils/images_api_util";
// import { withRouter } from 'react-router-dom';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    let res = getImagesByGameId(1);
    debugger
    return (
      <h1>LOGGED INTO THE GAME PAGE</h1>
    )
  }
}

export default GamePage;
