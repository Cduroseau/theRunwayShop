import React, { Component } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import { API } from "aws-amplify";
import "./ImagePortal.css";
import ImageCard from '../components/ImageCard';

export default class Home extends Component {
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

  renderNotesList = (images) => {
    return images.map((image) => {
      return (
        <div key={image.imageId}>
          <ImageCard fileName={image.attachment} />
          <center>{image.content}</center>
        </div>
      )
    })
    
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  renderNotes() {
    return (
      <div className="images">
        <PageHeader>Image Portal</PageHeader>
        <ListGroup className="image-list-view">
          {!this.state.isLoading && this.renderNotesList(this.state.images)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="ImagePortal">
        {this.renderNotes()}
      </div>
    );
  }
}