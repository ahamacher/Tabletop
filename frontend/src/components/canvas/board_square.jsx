import React from 'react'
import Square from './square'
import { DropTarget } from 'react-dnd'
import { KNIGHT } from './items'

const squareTarget = {
    drop(props, monitor) {
        const item = monitor.getItem();
        props.moveItem(item.id, [props.x, props.y])
    },
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

const BoardSquare = ({connectDropTarget, children }) => {
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

export default DropTarget(KNIGHT, squareTarget, collect)(BoardSquare)
