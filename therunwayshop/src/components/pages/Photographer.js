import React, { Component, Fragment } from 'react';
import { withAuth } from '@okta/okta-react';
import Dropzone from 'react-dropzone'
import axios from 'axios'


export default withAuth(
class Photographer extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    authenticated: null,
    files: []
  };

  handleDrop = (acceptedFiles, rejectedFiles) => {
    // Push all the axios request promise into a single array
    console.log("DROP IS EXECUTED")
    const uploaders = acceptedFiles.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist, xmas`);
      formData.append("upload_preset", "dhaolytme"); // Cloud name
      formData.append("api_key", "721197728675577"); // API key for Cloudinary
      formData.append("timestamp", (Date.now() / 1000) | 0);
      
      // AJAX upload request using Axios (Cloudinary URL)
      return axios.post("https://api.cloudinary.com/v1_1/dhaolytme/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        console.log(data);
      })
    });
  
    // Once all the files are uploaded 
    axios.all(uploaders).then((result) => {
      // ... perform after upload is successful operation
      console.log("results", result)
    });

    this.setState({
      files: this.state.files.concat(acceptedFiles),
    });
  }

  componentDidMount() {
    this.checkAuthentication();
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    });
  }

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  };

  // async componentDidMount() {
  //   this.checkAuthentication();
  // }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async () => {
    // this.props.auth.login('/');
    this.props.auth.login('/ImagePortal');
  };

  logout = async () => {
    // this.props.auth.logout('/');
    this.props.auth.logout('/ImagePortal');
  };


  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    if (this.state.authenticated === null) return null;

      const mainContent = this.state.authenticated ? (
        <div>
          {/* <p className="lead">
            You have entered the photographer dashboard,{' '}
            <Link to="/Photographer">click here</Link>
          </p> */}
          <button className="btn btn-light btn-lg" onClick={this.logout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p className="lead">
            If you are a invited photographer, please get your credentials from the admin
            
          </p>
          <button className="btn btn-dark btn-lg" onClick={this.login}>
            Login
          </button>
        </div>
      );
    const { currentUserEmail, currentUserName } = this.state;

    return (
      <div>
        <h1>Welcome {currentUserName}</h1>
        <p>Email: {currentUserEmail}</p>
        <p>You have reached the authorized photographer area of the portal</p>
        

        <Dropzone 
          onDrop={this.handleDrop} 
          // multiple 
          accept="image/*"
          // className={style.dropppp}
          
        >
          {
            ({getRootProps, getInputProps, isDragActive}) => {
              return (
                <div {...getRootProps()}
                className="dropzone dropzone--isActive">
                  
                  <input {...getInputProps()} />
                  {
                    isDragActive ? 
                    <p>Drop files here...</p> :
                    <p>Try dropping some files here...</p>
                  }
                </div>
              )
            }
          }
          </Dropzone>
          {this.state.files.length > 0 &&
            <Fragment>
              <h3>Previews</h3>
              {this.state.files.map((file) => (
                <img
                  alt="Preview"
                  key={file.preview}
                  src={file.preview}
                  style={previewStyle}
                />
              ))}
            </Fragment>
          }

        {mainContent} 
      </div>
    );
  }
}
)


// export default Staff;