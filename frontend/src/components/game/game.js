import React, { Component } from 'react';
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';
import GameCanvas from '../canvas/game_canvas';
import ItemsIndexContainer from '../items_menu/items_index_container';
import MessagesPage from '../messages/messages_page';
import GameModalContainer from '../game_modal/game_modal_container';
// import MessageModal from "../canvas/message_modal";

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      response: [],
      message: '',
      messageDisplay: "full"
    };
    this.sendSocketIO = this.sendSocketIO.bind(this);
    this.messageRender = this.messageRender.bind(this);
    this.changeMessageDisplay = this.changeMessageDisplay.bind(this);
  }

  componentDidMount(){
    const { fetchGameById, fetchImages, fetchImageInstances } = this.props;
    const { gameId } = this.props
    fetchImages();
    fetchImageInstances();
    fetchGameById(gameId);
    const endpoint = (process.env.NODE_ENV !== "production") ? "http://tabletop-apps.herokuapp.com" : 'http://localhost:8000';
    const socket = socketIOClient(endpoint);
    socket.emit('join', gameId);
    this.socket = socket
  }

  componentWillUnmount() {
    this.props.clearImages();
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

  changeMessageDisplay(type) {
    this.setState({ messageDisplay: type });
  }

  render() {
    const { messageDisplay } = this.state;
    return(
      <div className="game-div">
        {/* <h1>LOGGED INTO GAME: {this.props.gameId}</h1> */}
        <section className="game-view">
          <GameCanvas messageDisplay={messageDisplay} />
          <ItemsIndexContainer />
          <GameModalContainer gameId={this.props.gameId} messageDisplay={messageDisplay} changeMessageDisplay={this.changeMessageDisplay} />
        </section>
        <MessagesPage gameId={this.props.gameId}/>
        {/* <MessageModal gameId={this.props.gameId}/> */}
      </div>
    )
  }
}

export default Game;
