import React from 'react'
import { DropTarget } from 'react-dnd'
import { KNIGHT } from './items'
import { ContextMenuTrigger } from "react-contextmenu";
import Square from "./square";

function menuCollect(props) {
    return props;
}

const squareTarget = {
    drop(props, monitor) {
        const item = monitor.getItem();
        //if imageId is present then need to create a new image 
        props.moveItem(item.id, item.imageId, [props.x, props.y])
    },
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

const BoardSquare = ({x, y, connectDropTarget, children, openMessageModal }) => {
    const attributes = {
        style: {
            position: 'relative',
            width: '100%',
            height: '100%',
        }
    };

    const handleClick = (e, data, target) => {
        console.log(`this was clicked on square ${data.posX}-${data.posY}`)

        if (data.action === "Message") {
            openMessageModal()
        }
    }

    return connectDropTarget(
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '100%',
            }}>
            <ContextMenuTrigger
                id={"BOARD_SQUARE"}
                holdToDisplay={-1}
                name={`board-square-${x}-${y}`}
                onItemClick={handleClick}
                allowImageManipulation={false}
                posX={x}
                posY={y}
                collect={menuCollect}
                attributes={attributes}
            >
                <Square>
                    {children}
                </Square>
            </ContextMenuTrigger>
        </div>
    )
}

export default DropTarget(KNIGHT, squareTarget, collect)(BoardSquare)
