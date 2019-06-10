import React from 'react';

class GameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", image: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageFile = this.handleImageFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // const gameForm = { ...this.state };
    const formData = new FormData();
    formData.append("image", this.state.image);
    formData.append("name", this.state.name);
    this.props.createGame(formData).then((res) => {
      this.props.history.push(`/games/${res.game._id}`);
    });
  }

  handleImageFile(e) {
    const image = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        image: image,
        imageUrl: fileReader.result
      });
    };
    if (image) {
      fileReader.readAsDataURL(image);
    }
  }

  render() {
    return (
      <div className="create-game-page session-form">
        <section className="create-game-form-body session-form-body">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="create-game-form session-form-inputs">
            <h2>Create a New Game</h2>
            <label>Name</label>
            <input type="text"
              onChange={this.handleChange} value={this.state.name} />
            <input type="file"
              onChange={this.handleImageFile} id="file" className="inputfile" />
            <label htmlFor="file" className="modal-button"><span>{this.state.image.name ? this.state.image.name : "Choose a file"}</span></label>
            <input type="submit" name="submit" value="Submit" />
          </form>
        </section>
      </div>
    );
  }
}

export default GameForm;