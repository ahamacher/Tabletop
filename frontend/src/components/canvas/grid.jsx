import React from 'react';
import BoardSquare from './board_square';
import Item from './item';

class Grid extends React.Component {

    constructor(props) {
        super(props);
        // this.state = { pieces: { 0: { id: 0, x: 0, y: 0 }, 1: { id: 1, x: 0, y: 5 }, 2: { id: 2, x: 10, y: 12 } } };
        this.state = { pieces: {} };
        this.moveItem = this.moveItem.bind(this);
    }

    componentDidMount() {
        this.props.fetchImageInstancesByGameId(this.props.match.params.gameId)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.game === undefined || prevProps.game._id !== this.props.match.params.gameId) {
            this.props.fetchImageInstancesByGameId(this.props.match.params.gameId).then((res) => this.setState({pieces: this.props.pieces }));
        }
    }

    moveItem(id, pos) {
        const { pieces } = this.props;
        const piece = pieces[id];
        piece.positionX = pos[0];
        piece.positionY = pos[1];
        pieces[id] = piece;
        this.setState({ pieces: pieces }, 
        () => this.props.updateImageInstance(id, { positionX: pos[0], positionY: pos[1] }))
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
        for (let col = 0; col < 25; col++) {
            for (let row = 0; row < 25; row++ ) {
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