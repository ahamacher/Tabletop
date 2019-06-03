import React from "react";
import { closeItemModal } from "../../actions/item_modal_actions";
import { updateImageInstance } from "../../actions/image_instance_actions";
import { connect } from "react-redux";
import ItemResizingForm from "./item_resizing_form";

const ItemModal = ({itemModal, updateImageInstance, closeItemModal}) => {
    if (!itemModal) {
        return null;
    }

    return (
        <div className="item-modal-background" onClick={closeItemModal}>
            <div className="item-modal-child" onClick={e => e.stopPropagation()}>
                <ItemResizingForm 
                    updateImageInstance={(updateParams) => { updateImageInstance(itemModal, updateParams)}}
                    closeItemModal={closeItemModal}/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        itemModal: state.ui.itemModal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        closeItemModal: () => dispatch(closeItemModal()),
        updateImageInstance: (imageInstanceId, updateParams) => dispatch(updateImageInstance(imageInstanceId, updateParams))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);