import React from 'react'
import axios from 'axios';
import config from '../config'
import swal from 'sweetalert';
import Navbarcomponent from "../components/Navbarcomponent"

var _ = require('lodash')
class Seasons extends React.Component {
  state = {
    seasons: [],
    isloading: false,
    seasonsname: "",
    categoryname: "",
    citiesname: "",
  }
  componentDidMount() {
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get('categoryid');
    var season = urlParams.get('seasonid');
    var city = urlParams.get('cityid');
    this.setState({ categoryname: category, seasonsname: season, citiesname: city });
    this.getseasons(category, season);
  }

  /*...getseasons Api Call ...*/
  getseasons(category, season) {
    this.setState({ isloading: true })
    var body = {
      category: category,
      season: season
    }
    axios({
      method: 'POST',
      url: config.apiUrl + '/images/season',

      headers: {
      },
      data: JSON.stringify(body),
    })
      .then(response => {
        if (response && response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length) {
          this.setState({ seasons: _.filter(response.data.data, Object => { return Object.userId }), isloading: false })
        }
      }).catch(error => {
        if (error) {
          this.setState({ isloading: false, error: true })
        }
      })
  }
  render() {
    var data = this.state.seasons
    return (
      <div>
        <Navbarcomponent />
        {
          !this.state.isloading ?
            <div>
              <div className="text-left" onClick={() => this.props.history.push(`/Category/?categoryid=${this.state.categoryname}&&seasonid=${this.state.seasonsname}&&cityid=${this.state.citiesname}`)}><button className="cate-but"><img src='../../img/back.png' /> {this.state.seasonsname} </button></div>
              {
                !this.state.error ?
                  data && Array.isArray(data) && data.length ?
                    data.map((category, index) => (
                      <div className="imagelayout" key={index} onClick={() => this.props.history.push(`/Cities/?categoryid=${category.category}&&seasonid=${category.season}&&cityid=${category.city}`)}>
                        <div className="imageCardWrapp">
                          <img className="imageCard" alt="card" src={`${config.imageBaseURL}${category.attachment}`} />
                          <p>{category.city}</p>
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
    )
  }
}
export default Seasons