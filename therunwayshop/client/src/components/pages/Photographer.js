import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import Dropzone from 'react-dropzone'
import Cloudinary from './cloudinary'
import appConfig from '../../config/app'
import PhotographerForm from '../layout/PhotographerForm'

export default withAuth(
class Photographer extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: '',
    authenticated: null
  };

  handleDrop = async (acceptedFiles, rejectedFiles) => {
    // Push all the axios request promise into a single array
    console.log("DROP IS EXECUTED")
    const file = acceptedFiles.find(f => f)
    const cloudinary = new Cloudinary(appConfig.CLOUDINARY)
    const res = await cloudinary.upload(file, 'Menswear/Year/City/Designer', 'xmas').then((url) => {
      console.log("this is the url: ", url);
      //axios post("")
    })
    if (res.ok) {
      alert("success")
    } else {
      console.log('Error', 'Something went wrong with image uploading...')
    }
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

        <Dropzone 
          onDrop={this.handleDrop} 
          multiple={false}
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
          
          < PhotographerForm />

        {mainContent} 
      </div>
    );
  }
}
)


// export default Staff;