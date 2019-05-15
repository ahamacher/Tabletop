import React from 'react';
import ItemsIndexItem from './items_index_item';

class ItemsIndex extends React.Component {

    render() {
        const items = this.props.images.map((item) => <ItemsIndexItem key={item._id} item={item} />)
        return (
            <div className="items-div">
                <ul className="items-list">
                    <li>ITEMS GO HERE</li>
                </ul>
            </div>
        );
    }
}

export default ItemsIndex;