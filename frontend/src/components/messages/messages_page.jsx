import React from "react";
import { merge } from "lodash";
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';
import { connect } from "react-redux";
import { 
    fetchMessagesByGameId, 
    createMessage, 
    receiveMessage } from "../../actions/messages_actions";

const mapStateToProps = (state) => ({
    messages: state.entities.messages
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    receiveMessage: message => dispatch(receiveMessage(message)),
    fetchMessages: () => dispatch(fetchMessagesByGameId(ownProps.gameId)),
    createMessage: (messageParams) => dispatch(createMessage(ownProps.gameId, messageParams))
}};

class MessagesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text:"",
            positionX:"",
            positionY:""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }   

    componentDidMount(){
        const endpoint = (process.env.NODE_ENV === "production") ? "https://tabletop-apps.herokuapp.com" : 'http://localhost:8000';
        const socket = socketIOClient(endpoint);
        const { gameId } = this.props;
        socket.emit('join', gameId);
        this.socket = socket;
        socket.on("new-message", message => {
            this.props.receiveMessage(message);
        });
        
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
        this.setState({ 
            text: "",
            positionX: "",
            positionY: ""
        })

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
                        onChange={this.handleChange("text")}
                        placeholder="enter new message"/>

                    <input
                        type="text"
                        value={this.state.positionX}
                        onChange={this.handleChange("positionX")}
                        placeholder="positionX" />

                    <input
                        type="text"
                        value={this.state.positionY}
                        onChange={this.handleChange("positionY")}
                        placeholder="positionY" />

                    <input type="submit" value="Create message" />
                </form>
            </div>
        )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesPage);