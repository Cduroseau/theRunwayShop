import React from "react";
import {AnchorButton, Intent, ProgressBar} from "@blueprintjs/core";
import _ from "lodash";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import {Icon} from "react-icons-kit";
import {remove} from 'react-icons-kit/fa/remove';
import "./DraggableUploader.css"

export default class DraggableUploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loadedFiles: []
    };
  }

  handleSubmit = async event => {
    event.preventDefault();

    let valid = true;
  
    this.state.loadedFiles.map(async (item, key) => {
        if (item && item.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
            valid = false;
            return;
          } else {
           
            try {
                console.log("item to upload looks like: ", item)
                const attachment = item
                  ? await s3Upload(item.file)
                  : null;

                  console.log("this is S3 attchment: ", attachment )
            
                await this.createImage({
                  attachment,
                  content: this.state.content
                });
                this.props.history.push("/ImagePortal");
              } catch (e) {
                alert(e);
                this.setState({ isLoading: false });
              }

          }
    })
  
  }
  
  createImage(image) {
    return API.post("images", "/images", {
      body: image
    });
  }

  onFileLoad(e) {
    const initFile = e.currentTarget.files[0];

    console.log("file uploaded looks like: ", initFile);

    let fileReader = new FileReader();
    fileReader.onload = () => {
      console.log("IMAGE LOADED: ");
      const file = {
        file: initFile,
        data: fileReader.result,
        isUploading: false
      }
      //Add file
      this.addLoadedFile(file);
    }

    fileReader.onabort = () => {
      alert("Reading Aborted");
    }

    fileReader.onerror = () => {
      alert("Reading ERROR!");
    }
    if(initFile){
        fileReader.readAsDataURL(initFile);
    }
    // fileReader.readAsDataURL(file);
  }

  addLoadedFile(file) {
    let tempPhotos = this.state.loadedFiles;
    console.log("Adding files...")
    tempPhotos.push(file);
    this.setState({
        loadedFiles: tempPhotos
    });
  }

  removeLoadedFile(file) {
    //Remove file from the State
    this.setState((prevState) => {
      let loadedFiles = prevState.loadedFiles;
      let newLoadedFiles = _.filter(loadedFiles, (ldFile) => {
        return ldFile != file;
      });
      return {loadedFiles: newLoadedFiles};
    });
  }

  removeAllLoadedFile() {
    this.setState({loadedFiles: []});
  }

  updateLoadedFile(oldFile, newFile) {
    this.setState((prevState) => {

      const loadedFiles = [...prevState.loadedFiles];
      _.find(loadedFiles, (file, idx) => {
        if (file == oldFile) 
          loadedFiles[idx] = newFile;
        }
      );

      return {loadedFiles};
    });

    return newFile;
  }

  onUpload() {
    const {loadedFiles} = this.state;

    loadedFiles.map((file, idx) => {
      console.log("Updating...");
      //Update file (Change it's state to uploading)
      let newFile = this.updateLoadedFile(file, {
        ...file,
        isUploading: true
      });

      //Simulate a REAL WEB SERVER DOING IMAGE UPLOADING
      setTimeout(() => {
        //Get it back to it's original State
        this.updateLoadedFile(newFile, {
          ...newFile,
          isUploading: false
        });
      }, 3000);

    });
  }

  render() {
    const {loadedFiles} = this.state;

    return (
      <div
        className="inner-container"
        style={{
        display: "flex",
        flexDirection: "column"
      }}>
        <div className="sub-header">Drag and Drop Images</div>
        <div className="draggable-container">
          <input
            type="file"
            id="file-browser-input"
            name="file-browser-input"
            ref={input => this.fileInput = input}
            onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
            // onDrop={this
            // .onFileLoad
            // .bind(this)}
            onChange={this
            .onFileLoad
            .bind(this)}
            />
          <div className="files-preview-container ip-scrollbar">
            {loadedFiles.map((file, idx) => {
              return <div className="file" key={idx}>
                <img src={file.data}/>
                <div className="container">
                  {/* <span className="progress-bar">
                    {file.isUploading && <ProgressBar/>}
                  </span> */}
                  <span className="remove-btn" onClick={() => this.removeLoadedFile(file)}>
                    <Icon icon={remove} size={19}/>
                  </span>
                </div>
              </div>
            })}
          </div>
          
          <div className="file-browser-container">
            <AnchorButton
              text="Browse"
              intent={Intent.PRIMARY}
              minimal={true}
              onClick={() => this.fileInput.click()}/>
          </div>
        </div>
        <AnchorButton
          text="Upload"
          intent={Intent.SUCCESS}
          onClick={this
          .handleSubmit
          .bind(this)}/>
      </div>
    );

  }

}