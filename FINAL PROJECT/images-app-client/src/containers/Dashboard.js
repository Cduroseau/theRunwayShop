import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Dashboard.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import DraggableUploader from "../components/DraggableUploader"

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  // componentDidMount() {
  //   if (!this.props.isAuthenticated) {
  //     this.props.history.push("/");
  //   }
  // }


  // validateForm() {
  //   return this.state.content.length > 0;
  // }

  // handleChange = event => {
  //   this.setState({
  //     [event.target.id]: event.target.value
  //   });
  // }

  // handleFileChange = event => {
  //   this.file = event.target.files[0];
  // }

  // handleSubmit = async event => {
  //   event.preventDefault();
  
  //   if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
  //     alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
  //     return;
  //   }
  
  //   this.setState({ isLoading: true });
  
  //   try {
  //     const attachment = this.file
        // await s3Upload(this.file)
  //       : null;
  
  //     await this.createImage({
  //       attachment,
  //       content: this.state.content
  //     });
  //     this.props.history.push("/ImagePortal");
  //   } catch (e) {
  //     alert(e);
  //     this.setState({ isLoading: false });
  //   }
  // }
  
  // createImage(image) {
  //   return API.post("images", "/images", {
  //     body: image
  //   });
  // }

  render() {
    return (
      <div className="Dashboard">
        {/* <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup> */
          /* <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="UpLoad"
            loadingText="Creating…"
          /> 
        </form> */}
        < DraggableUploader history={this.props.history} />
      </div>
    );
  }
}