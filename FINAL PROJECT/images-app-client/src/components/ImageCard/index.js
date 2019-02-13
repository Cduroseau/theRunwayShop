import React, { Component } from 'react'
import { Storage } from "aws-amplify";
import './image.css'

class ImageCard extends Component {

    constructor(props) {
      super(props)

      this.state = {
        imageURL: ''
      }
    }

    componentDidMount() {      
      Storage.get(this.props.fileName)
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
        <img className="imageCard" alt="card" src={this.state.imageURL} />
      )
    }
}


export default ImageCard;