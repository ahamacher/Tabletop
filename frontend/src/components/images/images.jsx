import React from 'react';


class Images extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { url: ''}

       
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("url", this.state.url);
        this.props.createImage(this.props.game_id, formData);

    }

    // handleImageFile(e) {
    //     const image = e.currentTarget.files[0];
    //     const fileReader = new FileReader();
    //     fileReader.onloadend = () => {
    //         this.setState({
    //             image: image,
    //             imageUrl: fileReader.result
    //         });
    //     };
    //     if (image) {
    //         fileReader.readAsDataURL(image);
    //     }
    // }

    update(field) {
        return e => this.setState({ [field]: e.target.value })
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

            
                <form onSubmit={this.handleSubmit} >
                    Select image to upload:
                    <input type="file" onChange={this.update('url')} />
                    <input type="submit" value="Upload Image" name="submit" />
                </form>

               <ul>
                   { images }
               </ul>
               <button onClick={this.fetchImages}>See All Images</button>
            </div>
        )
    }
}

export default Images;