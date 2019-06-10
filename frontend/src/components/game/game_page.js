import React, { Component } from 'react';
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';
import openSocket from 'socket.io-client';
import { getImagesByGameId } from "../../utils/images_api_util";
// import { withRouter } from 'react-router-dom';
import GameCanvas from '../canvas/game_canvas';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      response: [],
      message: ''
    }
    this.sendSocketIO = this.sendSocketIO.bind(this);
    this.messageRender = this.messageRender.bind(this);
  }

  componentDidMount() {
    const endpoint = (process.env.NODE_ENV === "production") ? "https://tabletop-apps.herokuapp.com": 'http://localhost:8000';
    const socket = socketIOClient(endpoint);
    socket.on("conversation", data => this.setState({ response: this.state.response.concat([data]) }))
    this.socket = socket
  }

  update(form) {
    return e => this.setState({ [form]: e.target.value });
  }

  sendSocketIO() {
    const { message } = this.state;
    this.socket.emit('conversation', message);
    this.setState({ message: '' });
  }

  messageRender(){
    return this.state.response.map(message => (
      <li>
        {message}
      </li>
    ))
  }

  render() {
    let res = getImagesByGameId(1);

    return (
      <div>
        <h1>LOGGED INTO THE GAME PAGE</h1>
        <GameCanvas />
        <ItemsIndexContainer />
        <form>
          <input type="text" onChange={this.update('message')} value={this.state.message}/> 
          <button type="submit">submit</button>
        </form>
        <button onClick={this.sendSocketIO}>socketme</button>
        {/* <ul>
          {this.messageRender()}
        </ul> */}
      </div>
    )
  }
}

export default GamePage;
