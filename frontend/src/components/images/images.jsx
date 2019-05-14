import React from 'react';

class Images extends React.Component {
    constructor(props) {
        super(props);
    }



    componentDidMount() {
        this.props.fetchImages();
    }



    render(){

        let images = Object.values(this.props.images).map((image) => {
            return (
                <li>
                    <img src={image.url} key={image.id} />
                </li>
            )
        });


        return(
            <div>
               <ul>
                   { images }
               </ul>
            </div>
        )
    }
}

export default Images;