import React from 'react';
import { DragSource, DragPreviewImage } from 'react-dnd'
import { KNIGHT } from './items'

const itemSource = {
    beginDrag(props) {
      return { id: props.id }
    }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

const Item = ({ pieceImageURL, connectDragSource, connectDragPreview, isDragging }) => {
  return (
    <>
        <DragPreviewImage connect={connectDragPreview} src={pieceImageURL} width="60" />
        <div
          ref={connectDragSource}
          style={{
            cursor: 'move',
          }}>
          {pieceImageURL !== undefined ? <img src={pieceImageURL} width="60" /> : null}
        </div>
      </>
  )
}

export default DragSource(KNIGHT, itemSource, collect)(Item)
