import React from 'react';
import { DragSource } from 'react-dnd'

const Types = {
    ITEM: 'knight'
}

const knightSource = {
    beginDrag() {
        return {}
    }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const Knight = ({ connectDragSource }) => {
  return connectDragSource (
    <div
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      ♘
    </div>
  )
}

export default DragSource(Types.ITEM, knightSource, collect)(Knight)
