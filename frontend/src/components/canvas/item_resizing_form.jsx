import React from "react";

class ItemResizingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scalefactor: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            scalefactor: e.currentTarget.value
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
                    value={this.state.scalefactor}/>
                <br/>
                <input type="submit" value="Rescale This Image"/>
            </form>
        )
    }
}

export default ItemResizingForm;

