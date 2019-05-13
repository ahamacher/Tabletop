import React, { Component } from 'react';
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';
import openSocket from 'socket.io-client';
// import { withRouter } from 'react-router-dom';

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
    const endpoint = 'http://localhost:8000';
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
    return (
      <div>
        <h1>LOGGED INTO THE GAME PAGE</h1>
        <form>
          <input type="text" onChange={this.update('message')} value={this.state.message}/> 
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

export default GamePage;
