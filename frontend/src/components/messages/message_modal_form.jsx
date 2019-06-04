import React from "react";
import { merge } from "lodash";

class MessageModalForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            positionX: props.posX,
            positionY: props.posY
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field) {
        return (
            (e) => {
                this.setState({
                    [field]: e.currentTarget.value
                });
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        let messageParams = merge({}, this.state);
        this.props.createMessage(messageParams);
        this.props.closeMessageModal();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.text}
                    onChange={this.handleChange("text")}
                    placeholder="enter new message" />

                <input type="submit" value="Create message" />
            </form>
        )
    }
};

export default MessageModalForm;