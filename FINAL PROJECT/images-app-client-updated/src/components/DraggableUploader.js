import React from "react";
import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core";
import _ from "lodash";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import { Icon } from "react-icons-kit";
import { remove } from 'react-icons-kit/fa/remove';
import "./DraggableUploader.css"
import Select from 'react-select';
import swal from 'sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import Lightbox from "react-images";
import { postimages } from '../api-gateway'
import Navbarcomponent from "./Navbarcomponent"
const photos = [
  {
    caption: "",
    src: "",
    srcSet: ""
  }
];

/*...CategoriesList...*/
const CategoriesList = [
  { value: 'Menswear', label: 'Menswear' },
  { value: 'Womenswear', label: 'Womenswear' },
  { value: 'Streetwear', label: 'Streetwear' },
  { value: 'Resort', label: 'Resort & Cruise' },
  { value: 'Bridal', label: 'Bridal' },
  { value: 'Emerging Designers', label: 'Emerging Designers' }
];

/*...SeasonsList...*/
const SeasonsList = [
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

/*...CitiesList...*/
const CitiesList = [
  { value: 'New York', label: 'New York' },
  { value: 'LA', label: 'LA' },
  { value: 'Miami', label: 'Miami' },
  { value: 'Paris', label: 'Paris' },
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
      enteredDesigner: "",
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
      isButtonvisible: false,
      isInputvalid: false
    }
  }


  /*...handleClick to open light box model...*/
  handleClick = () => {
    this.setState({ lightboxIsOpen: true });
  };


  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }

  /*..light  box  previous images...*/
  gotoPrevLightboxImage = () => {
    this.setState((state, props) => {
      if (state.currentImage <= photos.length--) {
        return { currentImage: photos.length };
      }
      return { currentImage: state.currentImage-- };
    });
  };



  /*... light box  Next  images...*/
  gotoNextLightboxImage = () => {
    this.setState((state, props) => {
      if (state.currentImage >= 0) {
        return { currentImage: photos.length++ };
      }
      return { currentImage: state.currentImage++ };
    });
  };
  /*...  Close light box  Next ...*/
  closeLightbox = () => {
    this.setState({ lightboxIsOpen: false });
  };
  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }


  /*...  handleChangeCategoriesList  ...*/
  handleChangeCategoriesList = (category) => {
    this.setState({ category: category.value });
  }

  /*...  handleChangeSeasonsList  ...*/
  handleChangeSeasonsList = (season) => {
    this.setState({ season: season.value });
  }

  /*...  handleChangeCitiesList  ...*/
  handleChangeCitiesList = (city) => {
    this.setState({ city: city.value });
  }

  /*...  handleDesigner  ...*/
  handleDesigner = (e) => {
    this.setState({ designer: e.target.value })
    var checkstring = e.target.value
    if (checkstring != "") {
      if (/[^A-Za-z0-9]/g.test(checkstring)) {
        this.setState({
          designer: checkstring, isInputvalid: true
        });
      } else {
        this.setState({
          designer: checkstring, isInputvalid: false
        });
      }
    }
  }

  /*...  remove Preview  Images  ...*/
  removeLoadedFile1(file) {
    var attachment = this.state.attachment;
    attachment.splice(file, 1);
    this.setState({ attachment })
  }

  /*...  publish  Images  ...*/
  async  publish(e) {
    e.preventDefault()
    let awsCredentialsValid = JSON.parse(localStorage.getItem("awsCredentials"));
    if (awsCredentialsValid == null) {
      swal({
        title: "Session Expired Please login !",
        icon: "warning",
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            this.props.history.push("/login");
          }
        });
    }
    else {
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
      this.setState({ show: true })
      await postimages(body, (response) => {
        if (response.status == 0) {
          this.setState({ isLoading2: false, isAdded2: false })
          swal({
            title: "Designer " + `${this.state.designer}` + "    already exits! ",
            text: "PLEASE ENTER ANOTHER NAME!",
            icon: "warning",
            dangerMode: true
          })
        }
        if (response.status == 1) {
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
      })
        .catch(error => {
          this.setState({ isLoading2: false, isAdded2: false, })
          if (error) {
            swal({
              title: "something went wrong on our End or Make sure your Internet connection is Active!",
              icon: "warning",
              dangerMode: true
            })
          }
        })
    }
  }
  /*... To handle formData  ...*/
  Submit = (e) => {
    e.preventDefault()
    if (this.validator.allValid()) {
      this.setState({ isAdded1: true, isLoading1: true, isAdded: false });
      this.state.content = Math.random().toString();
      let { attachment, season, designer, category, city, userId, content, } = this.state;

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
      swal({
        title: 'You are successfully added form',
        icon: "success",
        success: true,
      })
      return body
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  /*... Creates Unique Random ImageId ...*/
  makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  /*...Images upload to Aws...*/
  handleSubmit = async event => {
    event.preventDefault();
    let awsCredentialsValid = JSON.parse(localStorage.getItem("awsCredentials"));
    if (awsCredentialsValid == null) {
      swal({
        title: "Session Expired Please login !",
        icon: "warning",
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            this.props.history.push("/login");
          }
        });
    }
    else {
      this.setState({ isAdded: true, isLoading: true });
      let valid = true;
      var Data_arr = [];
      this.state.loadedFiles.map(async (item, key) => {
        var data = {};
        try {
          const attachment = item
            ? await s3Upload(item.file).then((item) => {
              data.imageId = this.makeid(10);
              data.attachment = item;
              Data_arr.push(data)
            })
            : null;
          if (this.state.isAdded == true) {
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
          this.setState({ isLoading: false, isAdded: false })
          if (e) {
            swal({
              title: "something went wrong on our End or Make sure your Internet connection is Active!",
              icon: "warning",
              dangerMode: true
            })
          }
        }
      })
    }
  }
  createImage(image) {
    return API.post("images", "/images", {
      body: image
    })
  }

  /*...Images  Loaded...*/
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
  /*...Maintain  Loaded files to state..*/
  addLoadedFile(file) {
    let tempPhotos = this.state.loadedFiles;
    var data = []
    tempPhotos.push(file);
    this.setState({
      loadedFiles: tempPhotos,
    })

  }


  /*...To Remove images in  Dropdown..*/
  removeLoadedFile(file) {
    this.setState((prevState) => {
      let loadedFiles = prevState.loadedFiles;
      let newLoadedFiles = _.filter(loadedFiles, (ldFile) => {
        return ldFile != file;
      });
      return { loadedFiles: newLoadedFiles };
    });
  }

  /*...To Remove All Images..*/
  removeAllLoadedFile() {
    this.setState({ loadedFiles: [] });
  }

  /*...To updateLoadedFile ..*/
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

  /*...onUpload function ..*/
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
    let { attachment, season, designer, category, city, userId, content, loadedFiles } = this.state;
    var result = attachment.map(person => ({ src: `${config.imageBaseURL}` + person.attachment, srcSet: `${config.imageBaseURL}` + person.attachment, caption: `${"Designed By "}` + designer }));
    return (
      <div>
        <Navbarcomponent />
        {
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
                  <button disabled={this.state.sessionEroor} className={this.state.isAdded ? this.state.isLoading ? "adding" : "added" : "add"} onClick={this
                    .handleSubmit.bind(this)} ><i className='far fa-save' /> {this.state.isAdded ? this.state.isLoading ? " Images Loading..." : " Images ADDED" : "Add Images"}</button>
                  : <div><button type="button" className="btn btn-primary" disabled={true}>ADD Images</button></div>
                }
              </div>

              <div className="left">
                <form >
                  <fieldset disabled={!this.state.formvisible}  >
                    <p>CATEGERIES</p>
                    <Select
                      name="category"
                      value={category.value}
                      onChange={this.handleChangeCategoriesList}
                      options={CategoriesList}
                    />
                    <p className="text-danger font-weight-bold">{this.validator.message('category', this.state.category, 'required')}</p>
                    <p>SEASONS</p>
                    <Select
                      name="season"
                      value={season.value}
                      onChange={this.handleChangeSeasonsList}
                      options={SeasonsList}
                    />
                    <p className="text-danger font-weight-bold">{this.validator.message('season', this.state.season, 'required')}</p>
                    <p>CITIES</p>
                    <Select
                      name="city"
                      value={city.value}
                      onChange={this.handleChangeCitiesList}
                      options={CitiesList}
                      disabled={true}
                    />

                    <p className="text-danger font-weight-bold">{this.validator.message('city', this.state.city, 'required')}</p>
                    <div className="form-group input_active ">
                      <p>Designers</p>
                      <input type="Big Ted" className="form-control2 " placeholder="Enter Designer Name" name="designer" value={designer} id="usr" onChange={this.handleDesigner} />
                    </div>
                    {
                      this.state.isInputvalid ?

                        <p className="text-danger font-weight-bold" >Please Enter only alphanumeric characters</p> : null
                    }
                    <p className="text-danger font-weight-bold"> {this.validator.message('designer', designer, 'required')}</p>
                    <button disabled={!this.state.formvisible || result.length <= 0 || this.state.isInputvalid} onClick={this.Submit} type="button" className="btn btn-primary"> ADD Form</button>
                  </fieldset >
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
                showImageCount={true}
              />
              <div className="inner-container uploded-file" >
                {
                  this.state.show ?
                    <ul className="files-preview ip-scrollbar col-12 row mx-0">
                      {attachment && attachment.map((file, idx) => {
                        return <li className="file col-md-3" key={idx}>
                          <img className="" alt="card" onClick={this.handleClick} src={`${config.imageBaseURL}${file.attachment}`} />
                          <button onClick={() => this.removeLoadedFile1(idx)} type="button" className="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </li>
                      })}
                    </ul> : undefined}
              </div>
              {
                this.state.isAdded1 && this.state.attachment[0] || this.error ?
                  <button disabled={this.state.isLoading} className={this.state.isAdded1 ? this.state.isLoading2 ? "adding" : "added" : "add"} onClick={this.publish.bind(this)}><i className='far fa-save' />{this.state.isAdded2 ? this.state.isLoading2 ? "Publishing.." : "Published" : "Publish"}</button> : undefined
              }
            </div>
          </div>
        }
      </div>

    );
  }
}

