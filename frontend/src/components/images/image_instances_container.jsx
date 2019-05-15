import { fetchImageInstancesByGameId, createImageInstance, updateImageInstance, receiveImageInstance } from "../../actions/image_instance_actions";
import { fetchImages } from "../../actions/image_actions"; 
import { connect } from "react-redux";
import React from "react";
import 'whatwg-fetch';
import socketIOClient from 'socket.io-client';

// #TODO only grab imageInstances and images from this room
const mapStateToProps = (state, ownProps) => {
    return ({
        imageInstances: state.entities.imageInstances,
        images: state.entities.images
    })
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchImageInstances: () => dispatch(fetchImageInstancesByGameId(ownProps.match.params.gameId)),
    createImageInstance: (imageId, imageInstanceParams) => dispatch(createImageInstance(imageId, imageInstanceParams)),
    updateImageInstance: (imageInstanceId, updateParams) => dispatch(updateImageInstance(imageInstanceId, updateParams)),
    fetchImages: () => dispatch(fetchImages(ownProps.match.params.gameId)),
    receiveImageInstance: imageInstance => dispatch(receiveImageInstance(imageInstance))
})

class ImageInstances extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageId: "",
            imageInstanceId: "",
            positionX: "",
            positionY:""
        }
        this.handleFetchImageInstances = this.handleFetchImageInstances.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleFetchImages = this.handleFetchImages.bind(this);
    }

    componentDidMount(){
        const endpoint = (process.env.NODE_ENV === "production") ? "http://tabletop-apps.herokuapp.com" : 'http://localhost:8000';
        const socket = socketIOClient(endpoint);
        const { gameId } = this.props;
        socket.emit('join', gameId);
        this.socket = socket
        socket.on("image-instance", imageInstance => {
            this.props.receiveImageInstance(imageInstance)
        })
    }

    handleFetchImageInstances(e) {
        e.preventDefault();
        this.props.fetchImageInstances();
    }

    handleFetchImages(e) {
        e.preventDefault();
        this.props.fetchImages();
    }

    handleCreate(e) {
        e.preventDefault();
        this.props.createImageInstance(this.state.imageId, {
            positionX: this.state.positionX,
            positionY: this.state.positionY
        })
    }

    handleUpdate(e) {
        e.preventDefault();
        const updateParams = {
            positionX: this.state.positionX,
            positionY: this.state.positionY
        }
        this.props.updateImageInstance(this.state.imageInstanceId, updateParams);
        this.setState({
            positionX: "",
            positionY: ""
        })
    }

    handleChange(field) {
        return (e) => (
            this.setState({
                [field]: e.currentTarget.value
            })
        )
    }

    render() {

        const images = Object.values(this.props.images).map((image) => (
            <li key={image._id}>id: {image._id} url: {image.url}</li>
        ))

        const imageInstances = Object.values(this.props.imageInstances).map((imageInstance) => (
            <li key={imageInstance._id}>PosX: {imageInstance.positionX} PosY: {imageInstance.positionY} id: {imageInstance._id}</li>
        ))
        return (

            <div>
                <ul>
                    <li>IMAGES</li>
                    {images}
                </ul>

                <ul>
                    <li>IMAGE INSTANCES</li>
                    {imageInstances}
                </ul>
                <form onSubmit={this.handleCreate}>
                    <input 
                        type="text"
                        value={this.state.imageId}
                        onChange={this.handleChange("imageId")}
                        placeholder="image ID"/>

                    <input
                        type="text"
                        value={this.state.positionX}
                        onChange={this.handleChange("positionX")}
                        placeholder="positionX" />

                    <input
                        type="text"
                        value={this.state.positionY}
                        onChange={this.handleChange("positionY")}
                        placeholder="positionY" />
                        
                    <input type="submit" value="create image instance from image"/>
                </form>

                <br/>
                <form onSubmit={this.handleUpdate}>

                    <input 
                        type="text"
                        value={this.state.imageInstanceId}
                        onChange={this.handleChange("imageInstanceId")}
                        placeholder="image instance ID"/>

                    <input 
                        type="text"
                        value={this.state.positionX}
                        onChange={this.handleChange("positionX")}
                        placeholder="positionX"/>
                    
                    <input
                        type="text"
                        value={this.state.positionY}
                        onChange={this.handleChange("positionY")}
                        placeholder="positionY" />
                    
                    <input type="submit" value="update image instance"/>
                
                </form>
                <br/>
                <button onClick={this.handleFetchImageInstances}>Fetch Image Instances</button>
                <button onClick={this.handleFetchImages}>Fetch Images</button>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageInstances);