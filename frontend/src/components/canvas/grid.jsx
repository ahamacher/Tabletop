import React from 'react';
import BoardSquare from './board_square';
import Item from './item';
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';
import m_icon from '../../M_icon.svg';
import BoardSquareMenu from "../context_menu/board_square_menu";
import MessageModal from "../canvas/message_modal";
import ItemModal from "./item_modal";

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.moveItem = this.moveItem.bind(this);
        this.state = {
            selected: null,
        };
        this.select = this.select.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.keybinds = this.keybinds.bind(this);
        this.clearSelected = this.clearSelected.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        this.props.fetchImageInstancesByGameId(this.props.match.params.gameId);
        this.props.fetchMessages(this.props.match.params.gameId);
        const endpoint = (process.env.NODE_ENV === "production") ? "https://tabletop-apps.herokuapp.com" : 'http://localhost:8000';
        const socket = socketIOClient(endpoint);
        const { gameId } = this.props;
        socket.emit('join', gameId);
        this.socket = socket;
        socket.on("image-instance", imageInstance => {
            this.props.receiveImageInstance(imageInstance);
        });
        this.keybinds();
        this.clearSelected();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.game === undefined || prevProps.game._id !== this.props.match.params.gameId) {
            this.props.fetchImageInstancesByGameId(this.props.match.params.gameId);
        }
        // this.updateSelected();
    }

    componentWillUnmount() {
        this.props.clearImageInstances();
    }

    clearSelected() {
        document.addEventListener('mouseup', this.handleMouseUp, true);
    }

    handleMouseUp(e) {
        if (e.target != this.state.selected) {
            this.setState({ selected: null });
        }
    }

    keybinds(){
        let posX;
        let posY;
        let pos;
        let newSelected;
        document.addEventListener('keydown', (e) => {
            // e.preventDefault();
            switch (e.key) {
                case "ArrowUp":
                    // move up
                    e.preventDefault();
                    if (this.state.selected) { 
                        newSelected = this.state.selected;
                        posX = this.state.selected.positionX;
                        posY = this.state.selected.positionY;
                        if (posY - 1 < 0) {
                            posY = 0;
                        } else {
                            newSelected.positionY -= 1;
                            posY -= 1;
                        }
                        pos = [posX, posY];
                        this.moveItem(this.state.selected.id, null, pos);
                        this.setState({ selected: newSelected });
                    }
                break;
                case "ArrowLeft":
                    // move left
                    e.preventDefault();
                    if (this.state.selected) {
                        newSelected = this.state.selected;
                        posX = this.state.selected.positionX;
                        posY = this.state.selected.positionY;
                        if (posX - 1 < 0) {
                            posX = 0;
                        } else {
                            newSelected.positionX -= 1;
                            posX -= 1;
                        }
                        pos = [posX, posY];
                        this.moveItem(this.state.selected.id, null, pos);
                        this.setState({ selected: newSelected });
                    }
                break;
                case "ArrowRight":
                    // move right
                    e.preventDefault();
                    if (this.state.selected) {
                        newSelected = this.state.selected;
                        posX = this.state.selected.positionX;
                        posY = this.state.selected.positionY;
                        if (posX + 1 > 19) {
                            posX = 19;
                        } else {
                            newSelected.positionX += 1;
                            posX += 1;
                        }
                        pos = [posX, posY];
                        this.moveItem(this.state.selected.id, null, pos);
                        this.setState({ selected: newSelected });
                    }
                break;
                case "ArrowDown":
                    // move down
                    e.preventDefault();
                    if (this.state.selected) {
                        newSelected = this.state.selected;
                        posX = this.state.selected.positionX;
                        posY = this.state.selected.positionY;
                        if (posY + 1 > 19) {
                            posY = 19;
                        } else {
                            newSelected.positionY += 1;
                            posY += 1;
                        }
                        pos = [posX, posY];
                        this.moveItem(this.state.selected.id, null, pos);
                        this.setState({ selected: newSelected });
                    }
                break;
                default:
                    break;
            }
        }, false);
    }

    moveItem(id, imageId, pos) {
        if (id) {
            this.props.updateImageInstance(id, { positionX: pos[0], positionY: pos[1] })
        } else if (imageId) {
            this.props.createImageInstance(imageId, { positionX: pos[0], positionY: pos[1] })
        }
    }

    renderSquare(pos) {
        return (
            <div key={pos} style={{ width: '5%', height: '5%' }}>
                <BoardSquare x={pos[0]} y={pos[1]} moveItem={this.moveItem} openMessageModal={() => this.props.openMessageModal({posX: pos[0], posY: pos[1]})}>
                    {<>
                        {this.renderMessage(pos)}
                        {this.renderPieces(pos)}
                    </>}
                    <MessageModal posX={pos[0]} posY={pos[1]} gameId={this.props.gameId} />
                    <ItemModal posX={pos[0]} posY={pos[1]}/>
                </BoardSquare>
            </div>
        )
    }

    renderMessage(pos){
        const message = this.getMessage(pos);
        const { messageDisplay } = this.props;
        

        if (message) {
            switch (messageDisplay) {
                case "full":
                    return (
                        <div id={message.id} className="grid-message">
                        {message.text}
                        </div>
                    )
                case "small":
                    return (
                        <div className="message-icon">
                            <img src={m_icon} alt="" />
                            <div id={message.id} className="grid-message-icon">
                                {message.text}
                            </div>
                        </div>
                    )
                case "none":
                    return (
                        <div id={message.id} className="hidden">
                            {message.text}
                        </div>
                    )
                default:
                    break;
            }
            
            return (

                <div id={message.id} className="grid-message">
                    {message.text}
                </div>
            );
        }
    }

    getMessage(pos) {
        const { messages } = this.props;
        for (let m in messages) {
            if (messages[m].positionX === pos[0] && messages[m].positionY === pos[1]) {
                const message = messages[m];
                message.id = m;
                return message;
            }
        }
    }

    select(pieceId) {
        const { pieces } = this.props;
        let piece;
        for (let p in pieces) {
            if (p === pieceId) {
                piece = pieces[p];
            }
        }
        this.setState({
            selected: piece,
        })
    }

    updateSelected(){
        if (this.state.selected){
            let pieceId = this.state.selected.id;
            const { pieces } = this.props;
            let piece;
            for (let p in pieces) {
                if (p === pieceId) {
                    piece = pieces[p];
                }
            }
            this.setState({
                selected: piece,
            })
        }
    }


    renderPieces(pos) {
        const { selected } = this.state;
        if ( this.getPieces(pos) !== null) {
            
            let matching = []
            this.getPieces(pos).forEach(piece => {
                let image = piece && (this.props.images[piece.image_id] || this.props.images[piece.image_id._id]);
                if (piece && image) {
                    if (image.url !== undefined) {
                        matching.push(
                        <Item key={piece.id}
                            id={piece.id}
                            piece={piece} 
                            pieceImageURL={image.url} 
                            openItemModal={() => this.props.openItemModal(piece.id)} 
                            selectPiece={() => this.select(piece.id)}
                            selected={selected}
                            openMessageModal={this.props.openMessageModal}
                        />
                        )
                    }
                }
            })
            
            return matching;
        } 
    
    }

    // renderPiece(pos) {
    //     const piece = this.getPiece(pos);
    //     const image = piece && (this.props.images[piece.image_id] || this.props.images[piece.image_id._id]);
    //     if (piece && image) {
    //         if (image.url !== undefined) {
    //             return <Item id={piece.id} piece={piece} pieceImageURL={image.url} openItemModal={() => this.props.openItemModal(piece.id)}/>
    //         }
    //     }
    // }

    getPieces(pos) {
       const { pieces }  = this.props;
        let matching = []
        for (let p in pieces) {
            
            if (pieces[p].positionX === pos[0] && pieces[p].positionY === pos[1]) {
                let piece = pieces[p];
                piece.id = p;
                matching.push(piece)
            } 
        }
        if (matching.length > 0) {
            return matching;
        }
        return null;
    }

    render() {
        const squares = [];
        for (let col = 0; col < 20; col++) {
            for (let row = 0; row < 20; row++ ) {
                squares.push(this.renderSquare([row, col]))
            }
        }
        return (
            <div
                style={{
                    position: 'absolute',
                    height: '90%',
                    width: '90%',
                    top: '50px',
                    bottom: '0',
                    right: '0',
                    left: '50px',
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                { squares }
                <BoardSquareMenu />
            </div>
        );
    }
}

export default Grid;