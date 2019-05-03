import React from 'react'
import axios from 'axios';
import config from '../config'
import swal from 'sweetalert';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Navbarcomponent from "../components/Navbarcomponent"
import Lightbox from "react-image-lightbox";
var _ = require('lodash')
class Designers extends React.Component {
  state = {
    Designers: [],
    isloading: false,
    seasonsname: "",
    categoryname: "",
    citiesname: "",
    Designersname: "",
    photoIndex: 0,
    isOpen: false,
    images: [],
    error: false
  }
  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('categoryid');
    var season = urlParams.get('seasonid');
    var city = urlParams.get('cityid');
    var designer = urlParams.get('designerid');
    this.setState({ citiesname: city, categoryname: category, seasonsname: season, Designersname: designer });
    this.getDesigners(category, season, city, designer)
  }

  getDesigners(category, season, city, designer) {
    this.setState({ isloading: true })
    var body = {
      category,
      season,
      city,
      designer
    }
    axios({
      method: 'POST',
      url: config.apiUrl + '/images/designer',
      headers: {

      },
      data: JSON.stringify(body),
    })
      .then(response => {
        if (response && response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length) {
          this.setState({ Designers: _.filter(response.data.data, Object => { return Object.userId }), isloading: false })
        }
        var designerName = this.state.Designers.map(person => ({ name:person.designer }));
        var designerName1 = designerName.map(a => a.name);
        var named = designerName1[0];
        var result = this.state.Designers.map(person => ({ src: `${config.imageBaseURL}` + person.attachment }));
        var result1 = result.map(a => a.src);
        this.setState({ images: result1, designername:named})
      }).catch(error => {
        if (error) {
          this.setState({ isloading: false, error: true })
        }
      })
  }
  renderImages = () => {
    let photoIndex = -1;
    const { images } = this.state;
    return images.map(imageSrc => {
      photoIndex++;
      const privateKey = photoIndex;
      return (
        <MDBCol md="4" key={photoIndex} onClick={() =>
          this.setState({ photoIndex: privateKey, isOpen: true })
        }>
          <figure>
            <img src={imageSrc} alt="Gallery" className="img-fluid" 
            />
            <h1 className="imagebox">{this.state.Designersname}</h1>
          </figure>
        </MDBCol>
      );
    })
  }
  render() {
    let { Designers,} = this.state;
    const { photoIndex, isOpen, images } = this.state;
    return (
      <div>
        <Navbarcomponent />,
        {
      !this.state.isloading ?
        <div
        >
          <div className="text-left" onClick={() => this.props.history.push(`/Cities/?categoryid=${this.state.categoryname}&&seasonid=${this.state.seasonsname}&&cityid=${this.state.citiesname}`)}><button className="cate-but"><img src='../../img/back.png' /> {this.state.Designersname} </button></div>
          {
            !this.state.error ?
              Array.isArray(images) && images.length ?
                <MDBContainer className="mt-5">
                  <div className="mdb-lightbox no-margin">
                    <MDBRow>
                      {this.renderImages()}
                    </MDBRow>
                  </div>
                  {isOpen && (
                    <Lightbox
                      mainSrc={images[photoIndex]}
                      nextSrc={images[(photoIndex + 1) % images.length]}
                      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                      // imageTitle={photoIndex + 1 + "/" + images.length}
                      imageTitle={"Designed By " + `${this.state.designername}`}
                      onCloseRequest={() => this.setState({ isOpen: false })}
                      // imageCaption={"Designed By "+  `${this.state.designername}`}
                      onMovePrevRequest={() =>
                        this.setState({
                          photoIndex: (photoIndex + images.length - 1) % images.length
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          photoIndex: (photoIndex + 1) % images.length
                        })
                      }
                    />
                  )}
                </MDBContainer> : <div><img src='../../img/data-not-found.gif' /><h3>Data not Found !</h3> </div> : <div>
                    <img src='../../img/404-Air.gif' />
                    <h1>Something Went wrong on our End  or Make sure your internet conection is Active</h1></div>
          }
        </div>
        :
        <div>
          <img src='../../img/preloader_ps_fast.gif' />
        </div>
        }
      </div>
    );
  }
}
export default Designers


