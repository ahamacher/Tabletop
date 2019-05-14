import React from "react";
import { connect } from "react-redux";
import { fetchMessagesByGameId, createMessage } from "../../actions/messages_actions";

const mapStateToProps = (state) => ({
    messages: state.entities.messages
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    fetchMessages: () => dispatch(fetchMessagesByGameId(ownProps.match.params.groupId)),
    createMessage: (text) => dispatch(createMessage(ownProps.match.params.groupId, text))
}}

class MessagesPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text:""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }   

    handleChange(e) {
        this.setState({
            text: e.currentTarget.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createMessage(this.state.text);
        this.setState({ text: ""})
    }

    render() {
        const messagesList = Object.values(this.props.messages).map((message) => (
            <li key={message._id}>{message.text}</li>
        ))
        return (
            <div>
                <ul>
                    {messagesList}
                </ul>
                <button onClick={this.props.fetchMessages}>View Messages</button>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="enter new message"/>
                    <input type="submit" value="Create message"/>
                </form>
            </div>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);