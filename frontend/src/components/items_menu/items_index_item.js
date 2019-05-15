import React from 'react';
import { DragSource } from 'react-dnd'
import { KNIGHT } from '../canvas/items'

const itemSource = {
    beginDrag(props) {
        return { imageId: props.item._id }
    }
}

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

const ItemsIndexItem = ({ item, connectDragSource, isDragging }) => {
    return connectDragSource(
        <div
            style={{
                fontSize: 50,
                fontWeight: 'bold',
                cursor: 'move',
            }}
        >
            <li><img src={item.url} width="100"></img></li>
        </div>
    )
}

export default DragSource(KNIGHT, itemSource, collect)(ItemsIndexItem)
