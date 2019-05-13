import React from 'react'
import Square from './square'
import { DropTarget } from 'react-dnd'

const Types = {
    ITEM: 'knight'
}

const squareTarget = {
    drop(props) {
        props.moveKnight([props.x, props.y])
    },
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

function BoardSquare({ x, y, connectDropTarget, isOver, children }) {

    return connectDropTarget(
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}>
            <Square>{children}</Square>
        </div>
    )
}

export default DropTarget(Types.ITEM, squareTarget, collect)(BoardSquare)
