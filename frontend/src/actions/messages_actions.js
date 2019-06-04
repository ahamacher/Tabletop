import * as messagesApiUtil from "../utils/messages_api_util";

export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";

export const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    messages
});

export const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    message
});

export const fetchMessagesByGameId = (gameId) => (dispatch) => (
    messagesApiUtil.fetchMessagesByGameId(gameId)
        .then((res) => 
            dispatch(receiveMessages(res.data)
        ))
);

export const createMessage = (gameId, messageParams) => (dispatch) => (
    messagesApiUtil.createMessage(gameId, messageParams)
);