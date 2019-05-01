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
 
  }

  render() {
    return (
      <div>
      {/* <Navbarcomponent/>, */}
      <div className="Dashboard">
        < DraggableUploader history={this.props.history} />
      </div>
        </div>
    );
  }
}



