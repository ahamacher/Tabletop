import React from 'react';
import BoardSquare from './board_square';
import Knight from './knight';

class Grid extends React.Component {

    constructor(props) {
        super(props);
        this.handleSquareClick = this.handleSquareClick.bind(this);
        this.state = this.props;
    }

    handleSquareClick(pos) {
        return (e) => this.moveKnight(pos)
    }

    moveKnight(pos) {
        this.setState({ knightPos: pos })
    }

    renderSquare([x, y], knightPos) {
        return (
            <div key={[x,y]} style={{ width: '4%', height: '4%' }}>
                <BoardSquare x={x} y={y} moveKnight={() => this.moveKnight([x,y])}>
                    {this.renderPiece(x, y, knightPos)}
                </BoardSquare>
            </div>
        )
    }

    renderPiece(x, y, [knightX, knightY]) {
        if (x === knightX && y === knightY) {
            return <Knight />
        }
    }

    render() {
        const squares = [];
        for (let col = 0; col < 25; col++) {
            for (let row = 0; row < 25; row++ ) {
                squares.push(this.renderSquare([row, col], this.state.knightPos))
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