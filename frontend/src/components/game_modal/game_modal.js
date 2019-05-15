import React, { Component } from 'react';
import ImagesContainer from '../images/images_container';

class GameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive(){
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  }

  modalRender(){
    const { active } = this.state;
    return(
      <div className={active ? "game-modal-container" : "hidden"}>
        <ImagesContainer gameId={this.props.gameId}/>
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
