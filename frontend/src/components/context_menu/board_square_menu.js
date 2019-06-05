import React from 'react';
import { ContextMenu, MenuItem, connectMenu } from "react-contextmenu";

const MENU_TYPE = 'BOARD_SQUARE';

const BoardSquareMenu = (props) => {
    const { id, trigger } = props;
    const handleItemClick = trigger ? trigger.onItemClick : null;
    return (
        <ContextMenu id={id}>
            {trigger ? <MenuItem onClick={handleItemClick} data={{ action: 'Message' }}>Add Message</MenuItem> : <MenuItem></MenuItem>}
            {trigger && (
                trigger.allowImageManipulation
                    ? <MenuItem onClick={handleItemClick} data={{ action: 'ManipulateImage' }}>Manipulate Image</MenuItem>
                    : <MenuItem disabled>{'Manipulate Image disabled'}</MenuItem>
            )}
        </ContextMenu>
    );
};

export default connectMenu(MENU_TYPE)(BoardSquareMenu);