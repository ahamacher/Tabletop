import React from 'react';
import { DragSource, DragPreviewImage } from 'react-dnd';
import { KNIGHT } from './items';

const itemSource = {
    beginDrag({id}, monitor, component) {
      return { id, component };
    }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
};

const Item = ({ pieceImageURL, connectDragSource, connectDragPreview, isDragging, piece, openItemModal, selectPiece, selected }) => {
  const scaledPercentage = parseFloat(piece.scalefactor.$numberDecimal)*100;
  if (!selected) {
    selected = {};
    selected.id = "";
  }
  return (
    <>
        {/* <DragPreviewImage id='drag-preview' connect={connectDragPreview} src={pieceImageURL}/> */}
        <div className={`layer-${piece.layer_id}`}
          ref={connectDragSource}
          // onClick={openItemModal}
            
          style={{
            cursor: 'move',
            
          }}>
        {pieceImageURL !== undefined ? <img src={pieceImageURL} width={`${scaledPercentage}` + "%"} onClick={selectPiece} className={piece.id === selected.id ? "selected" : "unselected"}/> : null}
        </div>
      </>
  )
};

export default DragSource(KNIGHT, itemSource, collect)(Item)
