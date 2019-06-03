import React, { Component } from 'react';
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';
import GameCanvas from '../canvas/game_canvas';
import ItemsIndexContainer from '../items_menu/items_index_container';
import MessagesPage from '../messages/messages_page';
import GameModalContainer from '../game_modal/game_modal_container';

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
    const { fetchGameById, fetchImages, fetchImageInstances } = this.props;
    const { gameId } = this.props
    fetchImages();
    fetchImageInstances();
    fetchGameById(gameId);
    const endpoint = (process.env.NODE_ENV === "production") ? "https://tabletop-apps.herokuapp.com" : 'http://localhost:8000';
    const socket = socketIOClient(endpoint);
    socket.emit('join', gameId);
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
      <div className="game-div">
        {/* <h1>LOGGED INTO GAME: {this.props.gameId}</h1> */}
        <GameModalContainer gameId={this.props.gameId}/>
        <section className="game-view">
          <GameCanvas />
          <ItemsIndexContainer />
        </section>
        <MessagesPage gameId={this.props.gameId}/>
      </div>
    )
  }
}

export default Game;
