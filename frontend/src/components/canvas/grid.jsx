import React from 'react';
import BoardSquare from './board_square';
import Item from './item';
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.moveItem = this.moveItem.bind(this);
    }

    componentDidMount() {
        this.props.fetchImageInstancesByGameId(this.props.match.params.gameId)
        const endpoint = process.env.PORT || 'http://localhost:8000';
        const socket = socketIOClient(endpoint);
        const { gameId } = this.props;
        socket.emit('join', gameId);
        this.socket = socket
        socket.on("image-instance", imageInstance => {
            this.props.receiveImageInstance(imageInstance)
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.game === undefined || prevProps.game._id !== this.props.match.params.gameId) {
            this.props.fetchImageInstancesByGameId(this.props.match.params.gameId);
        }
    }

    componentWillUnmount() {
        this.props.clearImageInstances();
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
            <div key={pos} style={{ width: '10%', height: '10%' }}>
                <BoardSquare x={pos[0]} y={pos[1]} moveItem={this.moveItem}>
                    {this.renderPiece(pos)}
                </BoardSquare>
            </div>
        )
    }

    renderPiece(pos) {
        const piece = this.getPiece(pos);
        const image = piece && (this.props.images[piece.image_id] || this.props.images[piece.image_id._id]);
        if (piece && image) {
            if (image.url !== undefined) {
                return <Item id={piece.id} piece={piece} pieceImageURL={image.url}  />
            }
        }
    }

    getPiece(pos) {
        const { pieces }  = this.props;
        for (let p in pieces) {
            if (pieces[p].positionX === pos[0] && pieces[p].positionY === pos[1]) {
                const piece = pieces[p];
                piece.id = p;
                return piece;
            }
        }
        return null;
    }

    render() {
        const squares = [];
        for (let col = 0; col < 10; col++) {
            for (let row = 0; row < 10; row++ ) {
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
            </div>
        );
    }
}

export default Grid;