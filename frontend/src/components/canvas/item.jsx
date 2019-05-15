import React from 'react';
import { DragSource } from 'react-dnd'
import { KNIGHT } from './items'

const itemSource = {
    beginDrag(props) {
      return { id: props.id }
    }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const Item = ({ pieceImageURL, connectDragSource, isDragging }) => {
  return connectDragSource (
    <div
      style={{
        fontSize: 50,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      {pieceImageURL !== undefined ? <img src={pieceImageURL} width="60" /> : null }
    </div>
  )
}

export default DragSource(KNIGHT, itemSource, collect)(Item)
