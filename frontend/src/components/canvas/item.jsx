import React from 'react';
import { DragSource } from 'react-dnd'
import { KNIGHT } from './items'


const itemSource = {
    beginDrag(props) {
      return { id: props.id }
    }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

const Item = ({ connectDragSource }) => {
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

export default DragSource(KNIGHT, itemSource, collect)(Item)
