import React, { Component } from 'react'
import { Storage } from "aws-amplify";
import './image.css'
import { s3Download } from "../../libs/awsLib";

class ImageCard extends Component {

    constructor(props) {
      super(props)

      this.state = {
        imageURL: ''
      }
    }

    componentDidMount() {      
      Storage.vault.get(this.props.fileName)
      .then((url) => {
        this.setState({imageURL: url})
      }) 
      .catch((e) => console.log(e));
    }

    render() {
      if(this.state.imageURL === '') {
        return <div className="emptyImage" />
      }
      return (
        <img className="imageCard" src={this.state.imageURL} />
      )
    }
}


export default ImageCard;