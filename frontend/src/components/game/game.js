import React, { Component } from 'react';
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';
import GameCanvas from '../canvas/game_canvas';

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: [],
      message: ''
    }
    this.sendSocketIO = this.sendSocketIO.bind(this);
    this.messageRender = this.messageRender.bind(this);
  }

  componentDidMount(){
    const { fetchGameById } = this.props;
    const { gameId } = this.props
    fetchGameById(gameId);
    const endpoint = 'http://localhost:8000';
    const socket = socketIOClient(endpoint);
    socket.emit('join', gameId);
    socket.on("conversation", data => this.setState({ response: this.state.response.concat([data]) }))
    this.socket = socket
  }

  update(form) {
    return e => this.setState({ [form]: e.target.value });
    
  }

  sendSocketIO() {
    const { message } = this.state;
    const { gameId } = this.state;
    const data = { message, room: gameId }
    this.socket.emit('conversation', data);
    this.setState({ message: '' });
  }

  messageRender() {
    return this.state.response.map(message => (
      <li>
        {message}
      </li>
    ))
  }

  render() {
    return(
      <div>
        <h1>LOGGED INTO THE GAME PAGE</h1>
        <GameCanvas />
        <form>
          <input type="text" onChange={this.update('message')} value={this.state.message} />
          <button type="submit">submit</button>
        </form>
        <button onClick={this.sendSocketIO}>socketme</button>
        <ul>
          {this.messageRender()}
        </ul>
      </div>
    )
  }
}

export default Game;
