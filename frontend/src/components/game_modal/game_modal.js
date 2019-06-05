import React, { Component } from 'react';
import ImagesContainer from '../images/images_container';

class GameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      messageDisplay: "full"
    };
    this.toggleActive = this.toggleActive.bind(this);
    this.updateMessageDisplay = this.updateMessageDisplay.bind(this);
  }

  toggleActive(){
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  modalRender(){
    const { active } = this.state;
    return(
      <div className={active ? "game-modal-container" : "hidden"}>
        <div className="modal-title">Message Display</div>
        {this.messageDisplayOptions()}
        <div className="modal-title">Upload Image</div>
        <ImagesContainer gameId={this.props.gameId}/>
      </div>
    )
  }

  updateMessageDisplay (type){
    this.setState({ messageDisplay: type});
    this.props.changeMessageDisplay(type);
  }

  messageDisplayOptions(){
    const {messageDisplay} = this.state;
    return (
      <div className="message-display-options">
        <label><span>Full</span>
          <input 
            type="radio" 
            name="full" onChange={() => this.updateMessageDisplay("full")} 
            checked={messageDisplay === "full"} 
            className="message-change-radio" 
          />
        </label>
        <label><span>Small</span>
          <input 
            type="radio" 
            name="small" 
            onChange={() => this.updateMessageDisplay("small")} 
            checked={messageDisplay === "small"} 
            className="message-change-radio" 
          />
        </label>
        <label><span>None</span>
          <input 
            type="radio" 
            name="none" 
            onChange={() => this.updateMessageDisplay("none")} 
            checked={messageDisplay === "none"} 
            className="message-change-radio" 
          />
        </label>
      </div>
    )
  }

  render(){
    return(
      <div className="modal-button-container">
        <div className="modal-button-ham" onClick={this.toggleActive}>
          <i className="fas fa-bars" />
        </div>
        {this.modalRender()}
      </div>
    );
  }
}

export default GameModal;
