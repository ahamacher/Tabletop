import React from "react";
import { closeItemModal } from "../../actions/item_modal_actions";
import { updateImageInstance } from "../../actions/image_instance_actions";
import { connect } from "react-redux";
import ItemResizingForm from "./item_resizing_form";

const ItemModal = ({itemModal, posX, posY, itemPosX, itemPosY, updateImageInstance, closeItemModal}) => {
    if (!itemModal || (posX !== itemPosX) || (posY !== itemPosY)) {
        return null;
    }

    return (
        <>
            <div className="item-modal-background" onClick={closeItemModal}>
            </div>
            <div className="item-modal-child" onClick={e => e.stopPropagation()}>
                <ItemResizingForm 
                    updateImageInstance={(updateParams) => { updateImageInstance(itemModal, updateParams)}}
                    closeItemModal={closeItemModal}/>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    const itemModal = state.ui.itemModal;
    let itemPosX;
    let itemPosY;
    if (itemModal) {
        itemPosX = state.entities.imageInstances[itemModal].positionX;
        itemPosY = state.entities.imageInstances[itemModal].positionY;
    }
    return {
        itemModal,
        itemPosX,
        itemPosY
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeItemModal: () => dispatch(closeItemModal()),
        updateImageInstance: (imageInstanceId, updateParams) => dispatch(updateImageInstance(imageInstanceId, updateParams))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);