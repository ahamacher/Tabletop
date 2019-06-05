import React from 'react';
import { DragSource, DragPreviewImage } from 'react-dnd';
import { KNIGHT } from './items';
import { ContextMenuTrigger } from "react-contextmenu";


function menuCollect(props) {
  return props;
}

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

const Item = ({ pieceImageURL, connectDragSource, connectDragPreview, isDragging, piece, openItemModal, selectPiece, selected, openMessageModal }) => {
  const scaledPercentage = parseFloat(piece.scalefactor.$numberDecimal)*100;
  if (!selected) {
    selected = {};
    selected.id = "";
  }

  const attributes = {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
    }
  };

  const handleClick = (e, data, target) => {
    console.log(`this was clicked on item ${piece.positionX}-${piece.positionY}`)

    if (data.action === "Message") {
      openMessageModal()
    } else if (data.action === "ManipulateImage") {
      openItemModal()
    }
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
        <ContextMenuTrigger
          id={"BOARD_SQUARE"}
          holdToDisplay={-1}
          name={`item-${piece.positionX}-${piece.positionY}`}
          onItemClick={handleClick}
          allowImageManipulation={true}
          posX={piece.positionX}
          posY={piece.positionY}
          collect={menuCollect}
          attributes={attributes}
        >
          {pieceImageURL !== undefined ? <img src={pieceImageURL} width={`${scaledPercentage}` + "%"} onClick={selectPiece} className={piece.id === selected.id ? "selected" : "unselected"}/> : null}
        </ContextMenuTrigger>
        </div>
      </>
  )
};

export default DragSource(KNIGHT, itemSource, collect)(Item)
