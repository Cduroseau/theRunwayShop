import React, { Component } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import { API } from "aws-amplify";
import "./ImagePortal.css";
import ImageCard from '../components/ImageCard';

export default class ImagePortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      images: []
    };
  }

  async componentDidMount() {
    try {
      const images = await this.images();
      images.sort(function(a, b) {
        return parseFloat(b.createdAt) - parseFloat(a.createdAt);
      });
      this.setState({ images });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  images() {
    return API.get("images", "/images");
  }

  renderimagesList = (images) => {
    return images.map((image) => {
      return (
        <div key={image.imageId}>
          <ImageCard fileName={image.attachment} />
          <center className="content">{image.content !== undefined ? image.content : 'No content'}</center>
        </div>
      )
    })
    
  }


  renderimages() {
    return (
      <div className="images">
        <PageHeader>Image Portal</PageHeader>
        <ListGroup className="image-list-view">
          {!this.state.isLoading && this.renderimagesList(this.state.images)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="ImagePortal">
        {this.renderimages()}
      </div>
    );
  }
}