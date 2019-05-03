import React from 'react'
import axios from 'axios';
import config from '../config'
import Navbarcomponent from "../components/Navbarcomponent"
import swal from 'sweetalert';
var _ = require('lodash')
class Cities extends React.Component {
  state = {
    cities: [],
    isloading: false,
    citiesname: "",
    seasonsname: "",
    categoryname: ""
  }
  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('categoryid');
    var season = urlParams.get('seasonid');
    var city = urlParams.get('cityid');
    this.setState({ citiesname: city, categoryname: category, seasonsname: season });
    this.getCities(category, season, city);
  }
/*...getCities Api Call ...*/
  getCities(category, season, city) {
    this.setState({ isloading: true })
    var body = {
      category,
      season,
      city
    }
    axios({
      method: 'POST',
      url: config.apiUrl + '/images/city',

      headers: {

      },
      data: JSON.stringify(body),
    })
      .then(response => {
        if (response && response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length) {
          this.setState({ cities: _.filter(response.data.data, Object => { return Object.userId }), isloading: false })
        }
      }).catch(error => {
        if (error) {
          this.setState({ isloading: false, error: true })
        }
      })
  }
  render() {
    var data = this.state.cities
    return (
      <div>
        < Navbarcomponent />
        {       
     !this.state.isloading ?
        <div>
          <div className="text-left" onClick={() => this.props.history.push(`/Seasons/?categoryid=${this.state.categoryname}&&seasonid=${this.state.seasonsname}&&cityid=${this.state.citiesname}`)}><button className="cate-but"><img src='../../img/back.png' /> {this.state.seasonsname} </button></div>
          {
            !this.state.error ?
              data && Array.isArray(data) && data.length ?
                data.map((city, index) => (
                  <div className="imagelayout" key={index} onClick={() => this.props.history.push(`/Designers/?categoryid=${city.category}&&seasonid=${city.season}&&cityid=${city.city}&&designerid=${city.designer}`)}>
                    <div className="imageCardWrapp">

                      <img className="imageCard" alt="card" src={`${config.imageBaseURL}${city.attachment}`} />
                      <p>{city.designer}</p>
                    </div>
                    <div className="imagebox"  >
                      <p>The RunwayShop</p>
                    </div>
                  </div>
                ))
                :
                <div><img src='../../img/data-not-found.gif' /><h3>Data not Found !</h3> </div> : <div>
                    <img src='../../img/404-Air.gif' />
                    <h1>Something Went wrong on our End  or Make sure your internet conection is Active</h1></div>
          }
        </div> : <div >
          <div>
            <img src='../../img/preloader_ps_fast.gif' />
          </div>
        </div>
        }
      </div>
    
     );
  }
}
export default Cities