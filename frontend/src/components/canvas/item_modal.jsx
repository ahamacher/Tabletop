import React from "react";
import { closeItemModal } from "../../actions/item_modal_actions";
import { updateImageInstance } from "../../actions/image_instance_actions";
import { connect } from "react-redux";
import ItemResizingForm from "./item_resizing_form";

const ItemModal = ({itemModal, itemModalId, posX, posY, updateImageInstance, closeItemModal}) => {
    if (!itemModal || (posX !== itemModal.positionX) || (posY !== itemModal.positionY)) {
        return null;
    }

    return (
        <>
            <div className="item-modal-background" onClick={closeItemModal}>
            </div>
            <div className="item-modal-child" onClick={e => e.stopPropagation()}>
                <ItemResizingForm 
                    updateImageInstance={(updateParams) => { updateImageInstance(itemModalId, updateParams)}}
                    closeItemModal={closeItemModal}
                    layerId={itemModal.layer_id}
                    scalefactor={parseInt(itemModal.scalefactor.$numberDecimal, 10)}/>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    const itemModalId = state.ui.itemModalId;
    const itemModal = itemModalId ? state.entities.imageInstances[state.ui.itemModalId] : null;
    return {
        itemModal,
        itemModalId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeItemModal: () => dispatch(closeItemModal()),
        updateImageInstance: (imageInstanceId, updateParams) => dispatch(updateImageInstance(imageInstanceId, updateParams))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);