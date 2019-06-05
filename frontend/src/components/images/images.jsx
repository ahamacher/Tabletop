import React from 'react';

class Images extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {image: ""};

       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleImageFile = this.handleImageFile.bind(this);

    }



    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.image);
        formData.append("x", {y: "1"})
        
        this.props.createImage(formData);

    }

    handleImageFile(e) {
        const image = e.currentTarget.files[0];
        ;
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({
                image: image,
                imageUrl: fileReader.result
            });
        };
        if (image) {
            fileReader.readAsDataURL(image);
        }
    }

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
            <div className="game-modal-">
            
                <form onSubmit={this.handleSubmit} encType="multipart/form-data" className="upload-form">
                    <div className="upload-head">Select image to upload:</div>
                    <input type="file" onChange={this.handleImageFile} id="file" className="inputfile"/>
                    <label htmlFor="file" className="modal-button"><span>{this.state.image.name ? this.state.image.name : "Choose a file"}</span></label>
                    <input type="submit" value="Upload Image" name="submit" className="modal-button"/>
                </form>

               {/* <ul>
                   { images }
               </ul>
               <button onClick={this.fetchImages}>See All Images</button> */}
            </div>
        )
    }
}

export default Images;