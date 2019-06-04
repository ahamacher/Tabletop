import React from "react";

class ItemResizingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layer_id: "",
            scalefactor: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
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
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.scalefactor}
                    placeholder={"Scale"}/>
                    
                <br/>
               
                <input
                    type="number"
                    onChange={this.handleNumberChange}
                    value={this.state.layer_id}
                    placeholder={"Layer"} />
                <br/>
                <input type="submit" value="Change Image Attributes"/>
            </form>
        )
    }
}

export default ItemResizingForm;

