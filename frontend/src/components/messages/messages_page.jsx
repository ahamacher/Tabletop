import React from "react";
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client'
import { connect } from "react-redux";
import { 
    fetchMessagesByGameId, 
    createMessage, 
    receiveMessage } from "../../actions/messages_actions";

const mapStateToProps = (state) => ({
    messages: state.entities.messages
})

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    receiveMessage: message => dispatch(receiveMessage(message)),
    fetchMessages: () => dispatch(fetchMessagesByGameId(ownProps.gameId)),
    createMessage: (text) => dispatch(createMessage(ownProps.gameId, text))
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

    componentDidMount(){
        const endpoint = 'http://localhost:8000';
        const socket = socketIOClient(endpoint);
        const { gameId } = this.props;
        socket.emit('join', gameId);
        this.socket = socket
        socket.on("new-message", message => {
            this.props.receiveMessage(message)
        })
        
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