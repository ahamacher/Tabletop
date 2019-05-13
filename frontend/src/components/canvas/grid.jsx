import React from 'react';
import BoardSquare from './board_square';
import Item from './item';

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pieces: { 0: { id: 0, x: 8, y: 8 }, 1: { id: 1, x: 0, y: 5 }  }  };
        this.moveItem = this.moveItem.bind(this);
    }

    moveItem(id, pos) {
        const pieces = this.state.pieces;
        const pieceId = parseInt(id); 
        const piece = pieces[pieceId];
        piece.x = pos[0];
        piece.y = pos[1];
        pieces[pieceId] = piece;
        this.setState({ pieces: pieces })
    }

    renderSquare(pos) {
        return (
            <div key={pos} style={{ width: '4%', height: '4%' }}>
                <BoardSquare x={pos[0]} y={pos[1]} moveItem={this.moveItem}>
                    {this.renderPiece(pos)}
                </BoardSquare>
            </div>
        )
    }

    renderPiece(pos) {
        const piece = this.getPiece(pos);
        if (piece) {
            return <Item id={piece.id} />
        }
    }

    getPiece(pos) {
        const pieces = this.state.pieces;
        for (let p in pieces) {
            if (pieces[p].x === pos[0] && pieces[p].y === pos[1]) {
                const piece = pieces[p];
                piece.id = p;
                return piece;
            }
        }
        return null;
    }

    render() {
        const squares = [];
        for (let col = 0; col < 25; col++) {
            for (let row = 0; row < 25; row++ ) {
                squares.push(this.renderSquare([row, col]))
            }
        }
        return (
            <div
                style={{
                    width: '600px',
                    height: '600px',
                    display: 'flex',
                    flexWrap: 'wrap',
                }}>
                { squares }
            </div>
        );
    }
}

export default Grid;