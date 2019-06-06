import React from "react";

class ItemResizingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layer_id: this.props.layerId,
            scalefactor: this.props.scalefactor
        }
        this.handleSlider = this.handleSlider.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSlider(e) {
        this.props.updateImageInstance({
            scalefactor: e.currentTarget.value
        })
        this.setState({
            scalefactor: e.currentTarget.value
        })
    }

    handleNumberChange(e) {
        // debugger
        this.setState({
            layer_id: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.closeItemModal();
        this.props.updateImageInstance(this.state);
    }

    render() {
        return (
            <div>
                <label htmlFor="scalefactor">scalefactor</label>
                <input 
                    type="range"
                    className="slider"
                    id="scalefactor"
                    min="1"
                    max="20"
                    value={this.state.scalefactor}
                    onChange={this.handleSlider}
                    placeholder={"Scale"}/>
                    
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="layer_id">layer ID</label>
                    <input
                        type="number"
                        id="layer_id"
                        onChange={this.handleNumberChange}
                        value={this.state.layer_id}
                        placeholder={"Layer"} />
                    <br/>
                    <input type="submit" value="Change Image Attributes"/>
                </form>
            </div>
        )
    }
}

export default ItemResizingForm;

