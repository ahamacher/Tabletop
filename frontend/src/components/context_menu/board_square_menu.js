import React from 'react';
import { ContextMenu, MenuItem, connectMenu } from "react-contextmenu";

const MENU_TYPE = 'BOARD_SQUARE';

const BoardSquareMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;
    return (
        <ContextMenu id={id}>
            {trigger ? <MenuItem onClick={handleItemClick} data={{ action: 'Message' }}>Add Message</MenuItem> : <MenuItem></MenuItem>}
            {/* {trigger && (
                trigger.allowRemoval
                    ? <MenuItem onClick={handleItemClick} data={{ action: 'Removed' }}>{`Remove 1 ${trigger.name}`}</MenuItem>
                    : <MenuItem disabled>{'Removal disabled'}</MenuItem>
            )} */}
        </ContextMenu>
    );
};

export default connectMenu(MENU_TYPE)(BoardSquareMenu);