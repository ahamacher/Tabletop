import React from 'react';
import { DragSource, DragPreviewImage } from 'react-dnd'
import { KNIGHT } from './items'

const itemSource = {
    beginDrag({id}, monitor, component) {
      return { id, component }
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
        {/* <DragPreviewImage id='drag-preview' connect={connectDragPreview} src={pieceImageURL}/> */}
        <div
          ref={connectDragSource}
          style={{
            cursor: 'move',
          }}>
          {pieceImageURL !== undefined ? <img src={pieceImageURL} width="60"/> : null}
        </div>
      </>
  )
}

export default DragSource(KNIGHT, itemSource, collect)(Item)
