import React from "react";
import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core";
import _ from "lodash";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import { Icon } from "react-icons-kit";
import { remove } from 'react-icons-kit/fa/remove';
import "./DraggableUploader.css"
import { FormControl, FormGroup, ControlLabel, DropdownButton, MenuItem } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import Select from 'react-select';
import axios from 'axios';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import Modal from 'react-awesome-modal';
import Lightbox from "react-images";

const photos = [
  {
    caption: "",
    src: "",
    srcSet: ""
  }
];

const options1 = [
  { value: 'Menswear', label: 'Menswear' },
  { value: 'Womenswear', label: 'Womenswear' },
  { value: 'Streetwear', label: 'Streetwear' },
  { value: 'Resort&Cruise', label: 'Resort&Cruise' },
  { value: 'Bridal', label: 'Bridal' },
  { value: 'Emerging Designers ', label: 'Emerging Designers ' }
];

const options2 = [
  { value: 'AW20', label: 'AW20' },
  { value: 'SS20', label: 'SS20' },
  { value: 'AW19', label: 'AW19' },
  { value: 'SS19', label: 'SS19' },
  { value: 'AW18', label: 'AW18' },
  { value: 'SS19', label: 'SS19' },
  { value: 'SS18', label: 'SS18' },
  { value: 'AW17', label: 'AW17' },
  { value: 'SS17', label: 'SS17' }
];

const options3 = [
  { value: ' New York', label: ' New York' },
  { value: 'LA', label: 'LA' },
  { value: 'Miami', label: 'Miami' },
  { value: 'Paris,', label: 'Paris' },
  { value: 'Others', label: 'Others' },
];

export default class DraggableUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadbuttonVisible: false,
      loadedFiles: [],
      attachment: [
        {
          imageId: "",
          attachment: ""
        }
      ],
      season: "",
      designer: "",
      category: "",
      city: "",
      userId: localStorage.getItem('username'),
      content: "",
      otherCityFieldActivate: false,
      isLoading: false,
      isLoading1: false,
      isAdded: false,
      isAdded1: false,
      lightboxIsOpen: false,
      currentImage: 0,
      show: false,
      isAdded2: false,
      isLoading2: false,
      formvisible: false,
      isButtonvisible: false
    }
  }

  handleClick = () => {
    this.setState({ lightboxIsOpen: true });
  };

  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }
  gotoPrevLightboxImage = () => {
    this.setState((state, props) => {
      if (state.currentImage <= photos.length--) {
        return { currentImage: photos.length };
      }
      return { currentImage: state.currentImage-- };
    });
  };

  gotoNextLightboxImage = () => {
    this.setState((state, props) => {
      if (state.currentImage >= 0) {
        return { currentImage: photos.length++ };
      }
      return { currentImage: state.currentImage++ };
    });
  };




  closeLightbox = () => {
    this.setState({ lightboxIsOpen: false });
  };



  componentWillMount() {
    this.validator = new SimpleReactValidator();

  }

  handleChange1 = (category) => {
    this.setState({ category: category.value });
  }
  handleChange2 = (season) => {
    this.setState({ season: season.value });
  }
  handleChange3 = (city) => {
    if (city.value == "Others") {
      this.setState({ otherCityFieldActivate: true });
    }
    else {
      this.setState({ otherCityFieldActivate: false });
      this.setState({ city: city.value });
    }
  }
  handleChange4 = (e) => {
    this.setState({ designer: e.target.value });
  }

  removeLoadedFile1(file) {
    var attachment = this.state.attachment;
    attachment.splice(file, 1);
    this.setState({ attachment })
  }

  publish = (e) => {
    e.preventDefault()
    this.setState({ isAdded2: true, isLoading2: true });
    this.state.content = Math.random().toString();
    let { attachment, season, designer, category, city, userId, content } = this.state;
    var body = {
      attachment: attachment,
      season: season,
      designer: designer,
      category: category,
      city: city,
      userId: userId,
      content: content
    }
    console.log("data awww", body);
    this.setState({ show: true })
    axios({
      method: 'POST',
      url: config.apiUrl + '/images',
      headers: {
        // 'Content-Type':  'application/json',
        // "Authorization":  token
      },
      data: JSON.stringify(body),
    })
      .then(response => {
        const data = response.data
        if (data.status == 1) {
          swal({
            title: 'You are successfully Published',
            icon: "success",
            success: true,
          })
            .then(willDelete => {
              if (willDelete) {
                this.props.history.push('/ImagePortal')
              }
            });

        }
        this.setState({
          uploadbuttonVisible: true,
          isLoading2: false,
          visible: false,
          isAdded2: false,
        })

      }
      ).catch(function (error) {
        console.log(error);
        alert(error)
      })
  }


  Submit = (e) => {
    e.preventDefault()
    if (this.validator.allValid()) {
      this.setState({ isAdded1: true, isLoading1: true, isAdded: false });
      this.state.content = Math.random().toString();
      let { attachment, season, designer, category, city, userId, content } = this.state;
      var body = {
        attachment: attachment,
        season: season,
        designer: designer,
        category: category,
        city: city,
        userId: userId,
        content: content
      }
      this.setState({ show: true, formvisible: true, isAdded1: true, isLoading1: true })
      return body
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isAdded: true, isLoading: true });
    let valid = true;
    var Data_arr = [];
    this.state.loadedFiles.map(async (item, key) => {
      var data = {};
      if (item && item.size > config.MAX_ATTACHMENT_SIZE) {
        alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
        valid = false;
        return;
      } else {
        try {
          const attachment = item
            ? await s3Upload(item.file).then((item) => {
              data.imageId = this.makeid(10);
              data.attachment = item;
              Data_arr.push(data)
            })
            : null;

            if (this.state.isAdded==true) {
              swal({
                title: 'You are successfully added images',
                icon: "success",
                success: true,
              })
           }
          this.setState({
            attachment: Data_arr,
            uploadbuttonVisible: true,
            isLoading: false,
          })

          this.setState(
            {
              isAdded: false,
              visible: true,
              formvisible: true,
              isLoading: false,
            },

          );

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
    })
  }

  onFileLoad(e) {
    const initFile = e.currentTarget.files;
    Object.keys(initFile).map((key) => {
      const file = initFile[key];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const fileData = {
          file: file,
          data: fileReader.result,
          isUploading: false
        }
        this.addLoadedFile(fileData);
      }

      this.setState({ isButtonvisible: true })

      fileReader.onabort = () => {

        alert("Reading Aborted");
      }

      fileReader.onerror = () => {
        alert("Reading ERROR!");
      }
      if (initFile) {
        fileReader.readAsDataURL(file);
      }
    })

  }

  addLoadedFile(file) {
    let tempPhotos = this.state.loadedFiles;
    var data = []
    tempPhotos.push(file);
    this.setState({
      loadedFiles: tempPhotos,
    });
  }
  removeLoadedFile(file) {

    this.setState((prevState) => {
      let loadedFiles = prevState.loadedFiles;
      let newLoadedFiles = _.filter(loadedFiles, (ldFile) => {
        return ldFile != file;
      });
      return { loadedFiles: newLoadedFiles };
    });
  }

  removeAllLoadedFile() {
    this.setState({ loadedFiles: [] });
  }

  updateLoadedFile(oldFile, newFile) {
    this.setState((prevState) => {

      const loadedFiles = [...prevState.loadedFiles];
      _.find(loadedFiles, (file, idx) => {
        if (file == oldFile)
          loadedFiles[idx] = newFile;
      }
      );

      return { loadedFiles };
    });

    return newFile;
  }

  onUpload() {
    const { loadedFiles } = this.state;
    loadedFiles.map((file, idx) => {
      let newFile = this.updateLoadedFile(file, {
        ...file,
        isUploading: true
      });

      setTimeout(() => {
        this.updateLoadedFile(newFile, {
          ...newFile,
          isUploading: false
        });
      }, 3000);
    });
  }
  render() {
    console.log(this.state);

    let { attachment, season, designer, category, city, userId, content } = this.state;
    var result = attachment.map(person => ({ src: `${config.imageBaseURL}` + person.attachment, srcSet: `${config.imageBaseURL}` + person.attachment, caption: `${"Designed By "}` + designer }));
    console.log("result", result)
    return (

      <div
        className="inner-container drag-and-drop"
        style={{
          display: "flex",
          flexDirection: "column"
        }}>
        <div className="main-box">
          <div className="right">
            <p>Drag and Drop Images</p>
            <div className="draggable-container">
              <input
                type="file"
                multiple
                accept="image/*"
                id="file-browser-input"
                name="file-browser-input"
                ref={input => this.fileInput = input}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}

                onChange={this
                  .onFileLoad
                  .bind(this)}
              />


              <div className="files-preview-container ip-scrollbar">
                {this.state.loadedFiles.map((file, idx) => {
                  return <div className="file" key={idx}>
                    <img src={file.data} />
                    <div className="container">
                      <span className="remove-btn" onClick={() => this.removeLoadedFile(file)}>
                        <Icon icon={remove} size={190} />
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
                  onClick={() => this.fileInput.click()} />
              </div>
            </div>

            {this.state.isButtonvisible ?
              <button className={this.state.isAdded ? this.state.isLoading ? "adding" : "added" : "add"} product-action onClick={this
                .handleSubmit.bind(this)} ><i className='far fa-save' /> {this.state.isAdded ? this.state.isLoading ? " Images Loading..." : " Images ADDED" : "Add Images"}</button>
              : <div><button type="button" class="btn btn-primary" disabled={true}>ADD Images</button></div>
            }
          </div>


          <div className="left">
            <form >
              <p>CATEGERIES</p>
              <Select
                name="category"
                value={category.value}
                onChange={this.handleChange1}
                options={options1}
              />
              {this.validator.message('category', this.state.category, 'required')}
              <p>SEASONS</p>
              <Select
                name="season"
                value={season.value}
                onChange={this.handleChange2}
                options={options2}
              />
              {this.validator.message('season', this.state.season, 'required')}

              <p>CITIES</p>
              <Select
                name="city"
                value={city.value}
                onChange={this.handleChange3}
                options={options3}
              />
              {this.validator.message('city', this.state.city, 'required')}

              {
                this.state.otherCityFieldActivate ?
                  <div className="input_active">
                    <input type="text" name="firstname" onChange={(e) => { this.setState({ city: e.target.value }) }} placeholder="Please type other city" className="css-vj8t7z" />
                  </div>
                  : undefined
              }
              <div class="form-group">
                <p>Designers</p>
                <input type="text" class="form-control" name="designer" value={designer} id="usr" onChange={this.handleChange4} />
              </div>
              {this.validator.message('designer', designer, 'required')}
              <button disabled={!this.state.formvisible || result.length <= 0} onClick={this.Submit} type="button" class="btn btn-primary"> ADD Form</button>
            </form>
          </div>
        </div>
        <div>

          <Lightbox
            caption={result}
            images={result}
            srcset={result}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevLightboxImage}
            onClickNext={this.gotoNextLightboxImage}
            onClose={this.closeLightbox}
            showThumbnails={true}
            showImageCount={true}
          />

          <div className="inner-container uploded-file" >
            {
              this.state.show ?
                <ul className="files-preview ip-scrollbar col-12 row mx-0">

                  {attachment && attachment.map((file, idx) => {


                    return <li className="file col-md-3" key={idx}>
                      <img className="" alt="card" onClick={this.handleClick} src={`${config.imageBaseURL}${file.attachment}`} />

                      <button onClick={() => this.removeLoadedFile1(file.imageId)} type="button" class="close" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>

                    </li>



                  })}

                </ul> : undefined}


          </div>

          {
            this.state.isAdded1 && this.state.attachment[0] ?
              <button className={this.state.isAdded1 ? this.state.isLoading2 ? "adding" : "added" : "add"} onClick={this.publish}><i className='far fa-save' />{this.state.isAdded2 ? this.state.isLoading2 ? "Publishing.." : "Published" : "Publish"}</button> : undefined
          }

        </div>

      </div>
    );
  }
}

