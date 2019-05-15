import React from 'react';
import ItemsIndexItem from './items_index_item';

class ItemsIndex extends React.Component {

    componentDidMount() {
        this.props.fetchImages(this.props.match.params.gameId)
    }

    render() {
        const items = this.props.images.map((item) => <ItemsIndexItem key={item._id} item={item} />)
        return (
            <div className="items-div">
                <ul className="items-list">
                    { items }
                </ul>
            </div>
        );
    }
}

export default ItemsIndex;